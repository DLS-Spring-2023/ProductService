import { IProduct } from "./product";

export interface IProductStock {
  id?: number;
  product_id?: IProduct['id'];
  quantity: number;
  updated_at?: Date;
}