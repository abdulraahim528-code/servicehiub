import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RowDataPacket } from "mysql2";

interface MyBookingRow extends RowDataPacket {
  id: number;
  provider_id: number;
  service_id: number;
  booking_date: string;
  house_details: string | null;
  status: "Pending" | "Accepted" | "Rejected" | "Completed";
  created_at: string;
  provider_name: string;
  provider_picture: string | null;
  service_name: string;
  review_id: number | null;
  review_rating: number | null;
}

// ─── GET /api/bookings/mine ─── the logged-in customer's own bookings
export async function GET(req: NextRequest) {
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
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 });
    }

    const [rows] = await pool.query<MyBookingRow[]>(
      `SELECT b.id, b.provider_id, b.service_id, b.booking_date, b.house_details, b.status, b.created_at,
              pu.full_name AS provider_name, p.profile_picture AS provider_picture,
              s.name AS service_name,
              r.id AS review_id, r.rating AS review_rating
       FROM bookings b
       JOIN providers p ON p.id = b.provider_id
       JOIN users pu ON pu.id = p.user_id
       JOIN services s ON s.id = b.service_id
       LEFT JOIN reviews r ON r.booking_id = b.id
       WHERE b.customer_id = ?
       ORDER BY b.created_at DESC`,
      [payload.id]
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
