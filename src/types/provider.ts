import { RowDataPacket } from "mysql2";

export interface ProviderRow extends RowDataPacket {
  id: number;
  full_name: string;
  city: string;
  years_experience: number;
  rating: number;
  reviews_count: number;
  verified: number;
  profile_picture: string | null;
  service_ids: string;   // comma-separated, e.g. "1,7"
  service_names: string; // comma-separated, e.g. "Electrician, Home Tutor"
}