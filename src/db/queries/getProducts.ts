import { query } from '../connection/database';

export async function getProducts() {
  const result = await query('SELECT * FROM products');
  return result;
}