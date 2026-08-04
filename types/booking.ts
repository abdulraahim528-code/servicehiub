import { RowDataPacket } from "mysql2";

export interface Booking extends RowDataPacket {
  id: number;
  customer_id: number;
  service_id: number;
  booking_date: Date;
  status: "Pending" | "Accepted" | "Completed" | "Cancelled";
  created_at: Date;
}