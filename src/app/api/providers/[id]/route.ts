import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface ProviderDetailRow extends RowDataPacket {
  provider_id: number;
  user_id: number;
  full_name: string;
  email: string;
  phone: string | null;
  city: string;
  years_experience: number;
  rating: number;
  reviews_count: number;
  verified: number;
  profile_picture: string | null;
}

interface ProviderServiceRow extends RowDataPacket {
  id: number;
  name: string;
}

// ─── GET /api/providers/:id ─── public single-provider profile (customer "View Profile")
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "Invalid provider id" },
        { status: 400 }
      );
    }

    const [rows] = await pool.query<ProviderDetailRow[]>(
      `SELECT p.id AS provider_id, p.user_id, u.full_name, u.email, u.phone,
              p.city, p.years_experience, p.rating, p.reviews_count,
              p.verified, p.profile_picture
       FROM providers p
       JOIN users u ON u.id = p.user_id
       WHERE p.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Provider not found" },
        { status: 404 }
      );
    }

    const provider = rows[0];

    const [services] = await pool.query<ProviderServiceRow[]>(
      `SELECT s.id, s.name
       FROM provider_services ps
       JOIN services s ON s.id = ps.service_id
       WHERE ps.provider_id = ?
       ORDER BY s.name`,
      [provider.provider_id]
    );

    return NextResponse.json({ success: true, data: { ...provider, services } });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
