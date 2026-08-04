import { RowDataPacket } from "mysql2";

export interface Service extends RowDataPacket {
  id: number;
  worker_id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  city: string;
  image: string;
  created_at: Date;
}