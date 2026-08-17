import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { ProviderRow } from "@/types/provider";

export async function GET() {
  try {
    const [rows] = await pool.query<ProviderRow[]>(`
      SELECT p.id, u.full_name, p.city, p.years_experience, p.rating,
             p.reviews_count, p.verified, p.profile_picture, s.name AS service_name
      FROM providers p
      JOIN users u ON u.id = p.user_id
      JOIN services s ON s.id = p.service_id
      ORDER BY p.rating DESC
    `);

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}