
import { query } from '../connection/database';

import { IProductDescription } from "../../entities/products/productDescription";
import { IProductStock } from '../../entities/products/productStock';

import { preparePostProductValues, postProductSqlStatement } from './utils/preparePostProductStatement';

export const postProduct = async (product: IProductDescription, stock: IProductStock) => {
  try {

  const values = preparePostProductValues(product, stock);

  const result = await query(postProductSqlStatement, values);

  return {...product, ...stock, id: result[0].insertId};

  } catch (error) {
    console.error(error);
    throw new Error('Failed to post product');
  }
};


