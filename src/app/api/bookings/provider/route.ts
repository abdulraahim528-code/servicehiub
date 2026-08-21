import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RowDataPacket } from "mysql2";

interface ProviderBookingRow extends RowDataPacket {
  id: number;
  customer_id: number;
  service_id: number;
  booking_date: string;
  house_details: string | null;
  status: "Pending" | "Accepted" | "Rejected" | "Completed";
  created_at: string;
  customer_name: string;
  customer_phone: string | null;
  service_name: string;
}

// ─── GET /api/bookings/provider ─── all bookings made against the logged-in provider
// (used by the provider dashboard to show incoming requests to accept/reject)
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

    if (payload.role !== "provider") {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 });
    }

    const [rows] = await pool.query<ProviderBookingRow[]>(
      `SELECT b.id, b.customer_id, b.service_id, b.booking_date, b.house_details, b.status, b.created_at,
              cu.full_name AS customer_name, cu.phone AS customer_phone,
              s.name AS service_name
       FROM bookings b
       JOIN providers p ON p.id = b.provider_id
       JOIN users cu ON cu.id = b.customer_id
       JOIN services s ON s.id = b.service_id
       WHERE p.user_id = ?
       ORDER BY FIELD(b.status, 'Pending', 'Accepted', 'Completed', 'Rejected'), b.created_at DESC`,
      [payload.id]
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
