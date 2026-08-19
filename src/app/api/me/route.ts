import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken, hashPassword, verifyPassword } from "@/lib/auth";
import { User } from "@/types/user";
import { ResultSetHeader } from "mysql2";

// ─── GET /api/me ─── returns the logged-in user's info
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

    const [rows] = await pool.query<User[]>(
      "SELECT id, full_name, email, phone, role FROM users WHERE id = ?",
      [payload.id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const user = rows[0];
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// ─── PATCH /api/me ─── updates name, phone, and/or password
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

    const { name, phone, currentPassword, newPassword } = await req.json();

    const [rows] = await pool.query<User[]>(
      "SELECT * FROM users WHERE id = ?",
      [payload.id]
    );
    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    const user = rows[0];

    // If changing password, verify the current one first
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ success: false, message: "Current password is required" }, { status: 400 });
      }
      const match = await verifyPassword(currentPassword, user.password_hash);
      if (!match) {
        return NextResponse.json({ success: false, message: "Current password is incorrect" }, { status: 400 });
      }
      if (newPassword.length < 6) {
        return NextResponse.json({ success: false, message: "New password must be at least 6 characters" }, { status: 400 });
      }
      const hashed = await hashPassword(newPassword);
      await pool.query<ResultSetHeader>(
        "UPDATE users SET password_hash = ? WHERE id = ?",
        [hashed, payload.id]
      );
    }

    // Update name and phone
    if (name || phone) {
      await pool.query<ResultSetHeader>(
        "UPDATE users SET full_name = COALESCE(?, full_name), phone = COALESCE(?, phone) WHERE id = ?",
        [name || null, phone || null, payload.id]
      );
    }

    return NextResponse.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
