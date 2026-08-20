import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const payload: any = await verifyToken(token);
    if (!payload) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

    const [rows] = await pool.query(
      "SELECT id, full_name, email, phone, role, created_at FROM users WHERE id = ?",
      [payload.id]
    );

    if ((rows as any).length === 0) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({ user: (rows as any)[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const payload: any = await verifyToken(token);
    if (!payload) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

    const body = await req.json();
    const { full_name, phone } = body;

    if (!full_name) return NextResponse.json({ message: "Name is required" }, { status: 400 });

    await pool.query("UPDATE users SET full_name = ?, phone = ? WHERE id = ?", [full_name, phone || null, payload.id]);

    const [rows] = await pool.query("SELECT id, full_name, email, phone, role, created_at FROM users WHERE id = ?", [payload.id]);

    return NextResponse.json({ user: (rows as any)[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
