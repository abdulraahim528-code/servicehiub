import { RowDataPacket } from "mysql2";

export type BookingStatus = "Pending" | "Accepted" | "Rejected" | "Completed";

export interface Booking extends RowDataPacket {
  id: number;
  customer_id: number;
  provider_id: number;
  service_id: number;
  booking_date: string; // "YYYY-MM-DD"
  house_details: string | null;
  status: BookingStatus;
  created_at: string;
}
