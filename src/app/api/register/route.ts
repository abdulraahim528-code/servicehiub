import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { User } from "@/types/user";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const [existingUsers] = await pool.query<User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    await pool.query(
      "INSERT INTO users (full_name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, 'customer')",
      [name, email, phone, hashedPassword]
    );

    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}