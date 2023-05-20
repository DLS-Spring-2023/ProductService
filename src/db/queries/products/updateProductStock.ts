import dayjs, { type Dayjs } from 'dayjs';

import { query } from '../../connection/database';

import { IProductDescription } from '../../../entities/products/productDescription';
import { IProductStock } from '../../../entities/products/productStock';

export const updateProductStock = async (
  id: number,
  productStock: IProductStock,
): Promise<any> => {
  const timeStamp = dayjs().format('YYYY-MM-DD HH:mm:ss');

  try {
    const foundProduct = await query(
      'SELECT * FROM product_stock_history WHERE product_id = ?',
      [id]
    );
    
    if (!foundProduct[0]) {
      const updatedProductStock = {
        ...foundProduct[0],
        new_stock: productStock.quantity,
      }
      console.log(updatedProductStock)
    }
    


    
  } catch (error) {}
};
