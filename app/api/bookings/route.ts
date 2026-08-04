import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { Booking } from "@/types/booking";

export async function GET() {
  try {
    const [bookings] = await pool.query<Booking[]>(
      "SELECT * FROM bookings"
    );

    return NextResponse.json({
      success: true,
      data: bookings,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      customer_id,
      service_id,
      booking_date,
      status,
    } = await req.json();

    if (
      !customer_id ||
      !service_id ||
      !booking_date ||
      !status
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO bookings
      (customer_id, service_id, booking_date, status)
      VALUES (?, ?, ?, ?)`,
      [
        customer_id,
        service_id,
        booking_date,
        status,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully",
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}