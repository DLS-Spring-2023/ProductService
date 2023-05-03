import { query } from '../../connection/database';

import { IPostProductResponse } from '../../../entities/products/postProductResponse';
import { IProductDescription } from '../../../entities/products/productDescription';
import { IProductStock } from '../../../entities/products/productStock';

import {
  preparePostProductValues,
  postProductSqlStatement,
} from './utils/preparePostProductStatement';
import { pushProductToQue } from './utils/pushProductToQue';

export const postProduct = async (
  productDescription: IProductDescription,
  productStock: IProductStock
): Promise<IPostProductResponse> => {
  try {
    const values = preparePostProductValues(productDescription, productStock);

    const result = await query(postProductSqlStatement, values);

    const postProductResponse: IPostProductResponse = {
      productDescription,
      productStock,
      productId: result[0].insertId,
    };

    await pushProductToQue(
      postProductResponse.productId,
      productDescription,
      productStock
    );

    return postProductResponse;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to post product');
  }
};
