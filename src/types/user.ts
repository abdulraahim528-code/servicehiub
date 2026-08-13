import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "customer" | "worker" | "admin";
  created_at: Date;
}