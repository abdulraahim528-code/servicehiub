import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const payload: any = await verifyToken(token);
    if (!payload) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

    const [rows] = await pool.query(
      `SELECT b.id, b.customer_id, b.service_id, b.booking_date, b.status, b.house_details, b.created_at,
              s.title AS service_title, s.price AS service_price
       FROM bookings b
       LEFT JOIN services s ON b.service_id = s.id
       WHERE b.customer_id = ?
       ORDER BY b.booking_date DESC`,
      [payload.id]
    );

    return NextResponse.json({ bookings: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
