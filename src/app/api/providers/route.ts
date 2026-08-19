import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { ProviderRow } from "@/types/provider";

export async function GET() {
  try {
    const [rows] = await pool.query<ProviderRow[]>(`
      SELECT p.id, u.full_name, p.city, p.years_experience, p.rating,
             p.reviews_count, p.verified, p.profile_picture,
             GROUP_CONCAT(DISTINCT s.id ORDER BY s.name SEPARATOR ',') AS service_ids,
             GROUP_CONCAT(DISTINCT s.name ORDER BY s.name SEPARATOR ', ') AS service_names
      FROM providers p
      JOIN users u ON u.id = p.user_id
      JOIN provider_services ps ON ps.provider_id = p.id
      JOIN services s ON s.id = ps.service_id
      GROUP BY p.id, u.full_name, p.city, p.years_experience, p.rating,
               p.reviews_count, p.verified, p.profile_picture
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