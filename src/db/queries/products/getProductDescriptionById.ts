import { query } from "../../connection/database";

import { IProductDescription } from "../../../entities/products/productDescription";

export async function getProductDescriptionById(id: number): Promise<IProductDescription[]> {
  const result = await query<IProductDescription[]>('SELECT * FROM product_description WHERE product_id = ?', [id]);

  return result;
}