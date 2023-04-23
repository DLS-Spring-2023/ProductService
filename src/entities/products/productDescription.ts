import { RowDataPacket } from "mysql2";

import { IProduct } from "./product";

export interface IProductDescription extends RowDataPacket {
  description_id?: number;
  name: string;
  price: number;
  description: string;
  tags: string[];
  updated_at?: Date;
  product_id?: IProduct['id'];
  photo_url?: string;
}