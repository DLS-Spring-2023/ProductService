export interface IProductDescription {
  id: number;
  product_id: number;
  name: string;
  price: number;
  description: string;
  photo_url: string;
  tags: string[];
  updated_at: Date;
}