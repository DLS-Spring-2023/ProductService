import { RowDataPacket } from "mysql2";

import { IProduct } from "./product";

export interface IProductStock extends RowDataPacket {
  id?: number;
  product_id?: IProduct['id'];
  quantity: number;
  updated_at?: Date;
}