import { RowDataPacket } from "mysql2";

export interface Booking extends RowDataPacket {
  id: number;
  customer_id: number;
  service_id: number;
  booking_date: Date;
  status: "Pending" | "Accepted" | "Completed" | "Cancelled";
  house_details?: string;
  created_at: Date;
}