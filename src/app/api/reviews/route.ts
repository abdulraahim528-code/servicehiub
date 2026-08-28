import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { Booking } from "@/types/booking";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface ExistingReviewRow extends RowDataPacket {
  id: number;
}

interface PublicReviewRow extends RowDataPacket {
  id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  customer_name: string;
  provider_name: string;
  service_name: string | null;
}

// ─── GET /api/reviews ─── public feed of real customer reviews, used for
// the homepage testimonials section. Only reviews that include written
// feedback are returned so the cards always have something to display.
export async function GET(req: NextRequest) {
  try {
    const limitParam = Number(req.nextUrl.searchParams.get("limit"));
    const limit = Number.isInteger(limitParam) && limitParam > 0 ? Math.min(limitParam, 100) : 50;

    const [rows] = await pool.query<PublicReviewRow[]>(
      `SELECT r.id, r.rating, r.comment, r.created_at,
              cu.full_name AS customer_name,
              pu.full_name AS provider_name,
              MIN(s.name) AS service_name
       FROM reviews r
       JOIN users cu ON cu.id = r.customer_id
       JOIN providers p ON p.id = r.provider_id
       JOIN users pu ON pu.id = p.user_id
       LEFT JOIN provider_services ps ON ps.provider_id = p.id
       LEFT JOIN services s ON s.id = ps.service_id
       WHERE r.comment IS NOT NULL AND TRIM(r.comment) <> ''
       GROUP BY r.id, r.rating, r.comment, r.created_at, cu.full_name, pu.full_name
       ORDER BY r.rating DESC, r.created_at DESC
       LIMIT ?`,
      [limit]
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

// ─── POST /api/reviews ─── customer rates a provider for a Completed booking
// body: { bookingId, rating (1-5), comment? }
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload || typeof payload.id !== "number") {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }
    if (payload.role !== "customer") {
      return NextResponse.json(
        { success: false, message: "Only customers can leave a review" },
        { status: 403 }
      );
    }

    const { bookingId, rating, comment } = await req.json();

    if (!bookingId || !rating) {
      return NextResponse.json(
        { success: false, message: "bookingId and rating are required" },
        { status: 400 }
      );
    }
    const numericRating = Number(rating);
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { success: false, message: "rating must be a whole number from 1 to 5" },
        { status: 400 }
      );
    }

    const [bookingRows] = await pool.query<Booking[]>(
      "SELECT * FROM bookings WHERE id = ?",
      [bookingId]
    );
    if (bookingRows.length === 0) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }
    const booking = bookingRows[0];

    if (booking.customer_id !== payload.id) {
      return NextResponse.json(
        { success: false, message: "This isn't your booking" },
        { status: 403 }
      );
    }
    if (booking.status !== "Completed") {
      return NextResponse.json(
        { success: false, message: "You can only rate a provider after the job is marked Completed" },
        { status: 400 }
      );
    }

    const [existing] = await pool.query<ExistingReviewRow[]>(
      "SELECT id FROM reviews WHERE booking_id = ?",
      [bookingId]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: "You've already reviewed this booking" },
        { status: 409 }
      );
    }

    await pool.query<ResultSetHeader>(
      `INSERT INTO reviews (booking_id, customer_id, provider_id, rating, comment)
       VALUES (?, ?, ?, ?, ?)`,
      [bookingId, payload.id, booking.provider_id, numericRating, comment || null]
    );

    // Recompute the provider's aggregate rating + review count from all their reviews
    await pool.query<ResultSetHeader>(
      `UPDATE providers p
       SET rating = (SELECT ROUND(AVG(rating), 1) FROM reviews WHERE provider_id = p.id),
           reviews_count = (SELECT COUNT(*) FROM reviews WHERE provider_id = p.id)
       WHERE p.id = ?`,
      [booking.provider_id]
    );

    return NextResponse.json({ success: true, message: "Review submitted" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}