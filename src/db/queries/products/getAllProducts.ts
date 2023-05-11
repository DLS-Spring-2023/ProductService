import { query } from '../../connection/database';

import { IProduct } from '../../../entities/products/product';

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    const result = await query<IProduct[]>('SELECT * FROM product_description');

    return result;
  } catch (error) {
    console.log(error);
  }
};
