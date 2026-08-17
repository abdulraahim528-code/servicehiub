import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { Service } from "@/types/service";

export async function GET() {
  try {
    const [services] = await pool.query<Service[]>("SELECT * FROM services");

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}