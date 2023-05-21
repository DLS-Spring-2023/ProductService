import { query } from '../../connection/database';
import { IProduct } from '../../../entities/products/product';

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    const result = await query<IProduct[]>(`
      SELECT *
      FROM product_description pd
      WHERE pd.updated_at = (
        SELECT MAX(updated_at)
        FROM product_description
        WHERE product_id = pd.product_id
      )
      AND pd.product_id NOT IN (SELECT product_id FROM product_removed)
    `);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
