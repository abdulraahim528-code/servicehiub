import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface ProviderIdRow extends RowDataPacket {
  id: number;
}
interface CountRow extends RowDataPacket {
  total: number;
}

// ─── DELETE /api/providers/services/[id] ─── remove one of the logged-in provider's services
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: serviceId } = await params;

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

    const [providerRows] = await pool.query<ProviderIdRow[]>(
      "SELECT id FROM providers WHERE user_id = ?",
      [payload.id]
    );
    if (providerRows.length === 0) {
      return NextResponse.json({ success: false, message: "Provider profile not found" }, { status: 404 });
    }
    const providerId = providerRows[0].id;

    const [countRows] = await pool.query<CountRow[]>(
      "SELECT COUNT(*) AS total FROM provider_services WHERE provider_id = ?",
      [providerId]
    );
    if (countRows[0].total <= 1) {
      return NextResponse.json(
        { success: false, message: "You must offer at least one service. Add another before removing this one." },
        { status: 400 }
      );
    }

    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM provider_services WHERE provider_id = ? AND service_id = ?",
      [providerId, serviceId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, message: "Service not found for this provider" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Service removed" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}