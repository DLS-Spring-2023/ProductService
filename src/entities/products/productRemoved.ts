import { IProduct } from "./product";

export interface IProductRemoved {
  id: number;
  product_id: IProduct['id'];
  removed_at: Date;
}