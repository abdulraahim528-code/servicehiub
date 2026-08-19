import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface ProviderIdRow extends RowDataPacket {
  id: number;
}

interface ProviderServiceRow extends RowDataPacket {
  id: number;
  name: string;
}

async function getAuthenticatedProviderId(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return { error: NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 }) };
  }

  const payload = await verifyToken(token);
  if (!payload || typeof payload.id !== "number") {
    return { error: NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 }) };
  }
  if (payload.role !== "provider") {
    return { error: NextResponse.json({ success: false, message: "Access denied" }, { status: 403 }) };
  }

  const [rows] = await pool.query<ProviderIdRow[]>(
    "SELECT id FROM providers WHERE user_id = ?",
    [payload.id]
  );
  if (rows.length === 0) {
    return { error: NextResponse.json({ success: false, message: "Provider profile not found" }, { status: 404 }) };
  }

  return { providerId: rows[0].id };
}

// ─── GET /api/providers/services ─── list the logged-in provider's current services
export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthenticatedProviderId(req);
    if ("error" in auth) return auth.error;

    const [services] = await pool.query<ProviderServiceRow[]>(
      `SELECT s.id, s.name
       FROM provider_services ps
       JOIN services s ON s.id = ps.service_id
       WHERE ps.provider_id = ?
       ORDER BY s.name`,
      [auth.providerId]
    );

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// ─── POST /api/providers/services ─── add a service to the logged-in provider ─ body: { serviceId }
export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthenticatedProviderId(req);
    if ("error" in auth) return auth.error;

    const { serviceId } = await req.json();
    if (!serviceId) {
      return NextResponse.json({ success: false, message: "serviceId is required" }, { status: 400 });
    }

    const [existing] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM provider_services WHERE provider_id = ? AND service_id = ?",
      [auth.providerId, serviceId]
    );
    if (existing.length > 0) {
      return NextResponse.json({ success: false, message: "You already offer this service" }, { status: 409 });
    }

    await pool.query<ResultSetHeader>(
      "INSERT INTO provider_services (provider_id, service_id) VALUES (?, ?)",
      [auth.providerId, serviceId]
    );

    return NextResponse.json({ success: true, message: "Service added" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}