import { IProduct } from '../../entities/products/product';

import { query } from '../connection/database';

export async function getAllProducts() {
  const result = await query<IProduct[]>('SELECT * FROM products');
  
  return result;
}