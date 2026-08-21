import { RowDataPacket } from "mysql2";

export interface Review extends RowDataPacket {
  id: number;
  booking_id: number;
  customer_id: number;
  provider_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
}
