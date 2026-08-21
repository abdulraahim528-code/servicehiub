import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { Booking, BookingStatus } from "@/types/booking";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface ProviderIdRow extends RowDataPacket {
  id: number;
}

// Which status changes are allowed, and who's allowed to make them.
// Only the assigned provider drives this workflow: Pending -> Accepted/Rejected,
// then Accepted -> Completed.
const ALLOWED_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  Pending: ["Accepted", "Rejected"],
  Accepted: ["Completed"],
  Rejected: [],
  Completed: [],
};

// ─── GET /api/bookings/:id ─── booking detail (only the customer or provider on it can view)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload || typeof payload.id !== "number") {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const [rows] = await pool.query<Booking[]>("SELECT * FROM bookings WHERE id = ?", [id]);
    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }
    const booking = rows[0];

    const isOwningCustomer = payload.role === "customer" && booking.customer_id === payload.id;
    let isOwningProvider = false;
    if (payload.role === "provider") {
      const [providerRows] = await pool.query<ProviderIdRow[]>(
        "SELECT id FROM providers WHERE user_id = ?",
        [payload.id]
      );
      isOwningProvider = providerRows.length > 0 && providerRows[0].id === booking.provider_id;
    }

    if (!isOwningCustomer && !isOwningProvider) {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// ─── PATCH /api/bookings/:id ─── provider accepts/rejects a pending booking, or marks an accepted one Completed
// body: { status: "Accepted" | "Rejected" | "Completed" }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload || typeof payload.id !== "number") {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }
    if (payload.role !== "provider") {
      return NextResponse.json(
        { success: false, message: "Only the assigned provider can update a booking's status" },
        { status: 403 }
      );
    }

    const { status } = await req.json();
    if (!status) {
      return NextResponse.json({ success: false, message: "status is required" }, { status: 400 });
    }

    const [bookingRows] = await pool.query<Booking[]>("SELECT * FROM bookings WHERE id = ?", [id]);
    if (bookingRows.length === 0) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }
    const booking = bookingRows[0];

    const [providerRows] = await pool.query<ProviderIdRow[]>(
      "SELECT id FROM providers WHERE user_id = ?",
      [payload.id]
    );
    if (providerRows.length === 0 || providerRows[0].id !== booking.provider_id) {
      return NextResponse.json(
        { success: false, message: "This booking isn't assigned to you" },
        { status: 403 }
      );
    }

    const allowedNext = ALLOWED_TRANSITIONS[booking.status] ?? [];
    if (!allowedNext.includes(status)) {
      return NextResponse.json(
        { success: false, message: `Can't move a ${booking.status} booking to ${status}` },
        { status: 400 }
      );
    }

    await pool.query<ResultSetHeader>("UPDATE bookings SET status = ? WHERE id = ?", [status, id]);

    return NextResponse.json({ success: true, message: `Booking marked ${status}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
