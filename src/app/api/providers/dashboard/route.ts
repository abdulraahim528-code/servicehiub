import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

interface ProviderDashboardRow extends RowDataPacket {
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

// ─── GET /api/providers/dashboard ─── returns this provider's own data + services
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

    const [rows] = await pool.query<ProviderDashboardRow[]>(
      `SELECT p.id AS provider_id, p.user_id, u.full_name, u.email, u.phone,
              p.city, p.years_experience, p.rating, p.reviews_count,
              p.verified, p.profile_picture
       FROM providers p
       JOIN users u ON u.id = p.user_id
       WHERE p.user_id = ?`,
      [payload.id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "Provider profile not found" }, { status: 404 });
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
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// ─── PATCH /api/providers/dashboard ─── updates city, experience, name, phone, picture
// (services are managed separately via /api/providers/services — unchanged from before)
export async function PATCH(req: NextRequest) {
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

    const formData = await req.formData();
    const name = formData.get("name") as string | null;
    const phone = formData.get("phone") as string | null;
    const city = formData.get("city") as string | null;
    const yearsRaw = formData.get("years_experience") as string | null;
    const years = yearsRaw ? parseInt(yearsRaw, 10) : null;
    const file = formData.get("file") as File | null;

    let imagePath: string | null = null;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const fileName = `${Date.now()}-${file.name}`;
      await writeFile(path.join(uploadDir, fileName), buffer);
      imagePath = `/uploads/${fileName}`;
    }

    if (name || phone) {
      await pool.query<ResultSetHeader>(
        "UPDATE users SET full_name = COALESCE(?, full_name), phone = COALESCE(?, phone) WHERE id = ?",
        [name || null, phone || null, payload.id]
      );
    }

    const providerUpdates: string[] = [];
    const providerValues: (string | number | null)[] = [];

    if (city) { providerUpdates.push("city = ?"); providerValues.push(city); }
    if (years !== null && !isNaN(years)) { providerUpdates.push("years_experience = ?"); providerValues.push(years); }
    if (imagePath) { providerUpdates.push("profile_picture = ?"); providerValues.push(imagePath); }

    if (providerUpdates.length > 0) {
      providerValues.push(payload.id);
      await pool.query<ResultSetHeader>(
        `UPDATE providers SET ${providerUpdates.join(", ")} WHERE user_id = ?`,
        providerValues
      );
    }

    return NextResponse.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}