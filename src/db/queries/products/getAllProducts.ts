import { query } from "../../connection/database";

import { IProduct } from "../../../entities/products/product";

export async function getAllProducts() {
  const result = await query<IProduct[]>('SELECT * FROM products');
  
  return result;
}