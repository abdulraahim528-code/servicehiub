import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface PlatformReviewRow extends RowDataPacket {
  id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  reviewer_name: string;
  reviewer_role: "customer" | "provider";
}

interface CountRow extends RowDataPacket {
  count: number;
}

// ─── GET /api/platform-reviews ─── public feed of reviews ABOUT SERVICEHUB
// ITSELF, left by any logged-in user — customer or provider. Used on the
// homepage testimonials section.
export async function GET(req: NextRequest) {
  try {
    const limitParam = Number(req.nextUrl.searchParams.get("limit"));
    const limit = Number.isInteger(limitParam) && limitParam > 0 ? Math.min(limitParam, 100) : 50;

    const [rows] = await pool.query<PlatformReviewRow[]>(
      `SELECT pr.id, pr.rating, pr.comment, pr.created_at,
              u.full_name AS reviewer_name,
              u.role AS reviewer_role
       FROM platform_reviews pr
       JOIN users u ON u.id = pr.user_id
       WHERE pr.comment IS NOT NULL AND TRIM(pr.comment) <> ''
       ORDER BY pr.rating DESC, pr.created_at DESC
       LIMIT ?`,
      [limit]
    );

    const [countRows] = await pool.query<CountRow[]>(
      "SELECT COUNT(*) AS count FROM platform_reviews"
    );

    return NextResponse.json({
      success: true,
      data: rows,
      total: countRows[0]?.count ?? 0,
    });
  } catch (error) {
    console.error("GET /api/platform-reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

// ─── POST /api/platform-reviews ─── logged-in user (customer OR provider)
// rates ServiceHub itself. body: { rating (1-5), comment? }
// One review per user — submitting again updates their existing review.
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload || typeof payload.id !== "number") {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const { rating, comment } = await req.json();
    const numericRating = Number(rating);
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { success: false, message: "rating must be a whole number from 1 to 5" },
        { status: 400 }
      );
    }

    await pool.query<ResultSetHeader>(
      `INSERT INTO platform_reviews (user_id, rating, comment)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE rating = VALUES(rating), comment = VALUES(comment)`,
      [payload.id, numericRating, comment || null]
    );

    return NextResponse.json(
      { success: true, message: "Thanks for your feedback!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/platform-reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}