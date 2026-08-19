import { RowDataPacket } from "mysql2";

export interface ProviderServiceRow extends RowDataPacket {
  id: number;   // service id
  name: string; // service name
}