import { IProduct } from "./product";

export interface IProductDescription {
  id?: number;
  name: string;
  price: number;
  description: string;
  tags: string[];
  updated_at?: Date;
  product_id?: IProduct['id'];
  photo_url?: string;
}