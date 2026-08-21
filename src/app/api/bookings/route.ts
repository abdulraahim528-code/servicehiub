import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface ProviderServiceCheckRow extends RowDataPacket {
  provider_id: number;
}

// ─── POST /api/bookings ─── logged-in customer books a provider for a service
// body: { provider_id, service_id, booking_date ("YYYY-MM-DD"), house_details? }
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
        { success: false, message: "Only customers can create a booking" },
        { status: 403 }
      );
    }

    const { provider_id, service_id, booking_date, house_details } = await req.json();

    if (!provider_id || !service_id || !booking_date) {
      return NextResponse.json(
        { success: false, message: "provider_id, service_id and booking_date are required" },
        { status: 400 }
      );
    }

    // Don't allow booking dates in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosenDate = new Date(booking_date);
    if (isNaN(chosenDate.getTime()) || chosenDate < today) {
      return NextResponse.json(
        { success: false, message: "Please choose today or a future date" },
        { status: 400 }
      );
    }

    // Confirm this provider actually offers the requested service
    const [rows] = await pool.query<ProviderServiceCheckRow[]>(
      `SELECT provider_id FROM provider_services WHERE provider_id = ? AND service_id = ?`,
      [provider_id, service_id]
    );
    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "This provider doesn't offer that service" },
        { status: 400 }
      );
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO bookings (customer_id, provider_id, service_id, booking_date, house_details, status)
       VALUES (?, ?, ?, ?, ?, 'Pending')`,
      [payload.id, provider_id, service_id, booking_date, house_details || null]
    );

    return NextResponse.json(
      { success: true, message: "Booking request sent", data: { id: result.insertId } },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
