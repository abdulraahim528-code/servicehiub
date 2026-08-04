import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { Booking } from "@/types/booking";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [rows] = await pool.query<Booking[]>(
      "SELECT * FROM bookings WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: rows[0],
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
import { ResultSetHeader } from "mysql2";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          message: "Status is required",
        },
        { status: 400 }
      );
    }

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE bookings
       SET status = ?
       WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking updated successfully",
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
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM bookings WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
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