import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RowDataPacket } from "mysql2";

interface MineRow extends RowDataPacket {
  id: number;
}

// ─── GET /api/platform-reviews/mine ─── has the logged-in user already
// left a review of ServiceHub itself? Used to decide whether to show the
// "Rate ServiceHub" prompt on login / logout.
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: true, hasReviewed: false });
    }
    const payload = await verifyToken(token);
    if (!payload || typeof payload.id !== "number") {
      return NextResponse.json({ success: true, hasReviewed: false });
    }

    const [rows] = await pool.query<MineRow[]>(
      "SELECT id FROM platform_reviews WHERE user_id = ? LIMIT 1",
      [payload.id]
    );

    return NextResponse.json({ success: true, hasReviewed: rows.length > 0 });
  } catch (error) {
    console.error("GET /api/platform-reviews/mine error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}