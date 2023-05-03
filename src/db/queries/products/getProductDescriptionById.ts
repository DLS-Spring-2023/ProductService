import { query } from '../../connection/database';

import { IProductDescription } from '../../../entities/products/productDescription';

export const getLatestProductDescriptionById = async (
  id: number
): Promise<IProductDescription> => {
  try {
    const result = await query<IProductDescription[]>(
      'SELECT * FROM product_description WHERE product_id = ?',
      [id]
    );

    return result[result.length - 1];
  } catch (error) {
    console.log(error);
  }
};
