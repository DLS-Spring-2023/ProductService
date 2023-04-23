import { RowDataPacket } from "mysql2";

import { IProduct } from "./product";

export interface IProductRemoved extends RowDataPacket {
  id: number;
  product_id: IProduct['id'];
  removed_at: Date;
}