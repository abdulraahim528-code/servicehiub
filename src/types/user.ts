import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  password_hash: string;
  role: "customer" | "provider";
  created_at: string;
}