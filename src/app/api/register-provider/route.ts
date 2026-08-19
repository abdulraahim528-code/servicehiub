import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { User } from "@/types/user";
import { ResultSetHeader } from "mysql2";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const conn = await pool.getConnection();

  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const serviceIds = formData.getAll("serviceIds").map(String).filter(Boolean);
    const city = formData.get("city") as string;
    const years = formData.get("years") as string;
    const file = formData.get("file") as File | null;

    if (!fullName || !email || !phone || !password || serviceIds.length === 0 || !city || !years) {
      return NextResponse.json(
        { message: "All fields are required, and at least one service must be selected" },
        { status: 400 }
      );
    }

    const [existingUsers] = await conn.query<User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Save profile picture locally (if provided)
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

    const hashedPassword = await hashPassword(password);

    await conn.beginTransaction();

    const [result] = await conn.query<ResultSetHeader>(
      "INSERT INTO users (full_name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, 'provider')",
      [fullName, email, phone, hashedPassword]
    );
    const userId = result.insertId;

    const [providerResult] = await conn.query<ResultSetHeader>(
      "INSERT INTO providers (user_id, city, years_experience, profile_picture) VALUES (?, ?, ?, ?)",
      [userId, city, years, imagePath]
    );
    const providerId = providerResult.insertId;

    // One row per selected service (deduplicated in case of a repeated checkbox value)
    const uniqueServiceIds = Array.from(new Set(serviceIds));
    const values = uniqueServiceIds.map((id) => [providerId, id]);
    await conn.query(
      "INSERT INTO provider_services (provider_id, service_id) VALUES ?",
      [values]
    );

    await conn.commit();

    return NextResponse.json(
      { success: true, message: "Provider registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    await conn.rollback();
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  } finally {
    conn.release();
  }
}