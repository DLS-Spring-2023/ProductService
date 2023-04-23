import { IProductDescription } from '../../entities/products/productDescription';

import { query } from '../connection/database';

export async function getProductDescriptionById(id: number): Promise<IProductDescription[]> {
  const result = await query<IProductDescription[]>('SELECT * FROM product_description WHERE product_id = ?', [id]);

  return result;
}