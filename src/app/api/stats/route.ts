import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface CountRow extends RowDataPacket {
  count: number;
}

async function getCount(query: string, params: unknown[] = []): Promise<number> {
  const [rows] = await pool.query<CountRow[]>(query, params);
  return rows[0]?.count ?? 0;
}

// ─── GET /api/stats ─── live counts used across the homepage / about page
// (Happy Customers, Verified Providers, Service Categories, Cities Served, Reviews)
export async function GET() {
  try {
    const [customers, providers, categories, cities, reviews] = await Promise.all([
      getCount("SELECT COUNT(*) AS count FROM users WHERE role = ?", ["customer"]),
      getCount("SELECT COUNT(*) AS count FROM providers"),
      getCount("SELECT COUNT(*) AS count FROM services"),
      getCount("SELECT COUNT(DISTINCT city) AS count FROM providers"),
      getCount("SELECT COUNT(*) AS count FROM reviews"),
    ]);

    return NextResponse.json({
      success: true,
      data: { customers, providers, categories, cities, reviews },
    });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}