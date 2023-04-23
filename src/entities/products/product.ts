import { RowDataPacket } from "mysql2";

export interface IProduct extends RowDataPacket {
  id: number;
  created_at: Date;
}