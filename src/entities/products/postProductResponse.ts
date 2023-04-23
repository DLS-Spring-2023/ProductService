import { IProductDescription } from './productDescription';
import { IProductStock } from './productStock';

export interface IPostProductResponse {
  productDescription: IProductDescription,
  productStock: IProductStock,
  productId: number,
}