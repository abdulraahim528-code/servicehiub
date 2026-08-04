import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { Service } from "../../../types/service";
export async function GET() {
  try {
    const [services] = await pool.query<Service[]>(
      "SELECT * FROM services"
    );

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      worker_id,
      title,
      description,
      category,
      price,
      city,
      image,
    } = await req.json();

    if (
      !worker_id ||
      !title ||
      !description ||
      !category ||
      !price ||
      !city
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO services
      (worker_id,title,description,category,price,city,image)
      VALUES (?,?,?,?,?,?,?)`,
      [
        worker_id,
        title,
        description,
        category,
        price,
        city,
        image,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}