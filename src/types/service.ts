import { RowDataPacket } from "mysql2";

export interface Service extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
}