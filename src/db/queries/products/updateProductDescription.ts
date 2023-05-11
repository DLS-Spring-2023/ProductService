import dayjs, { type Dayjs } from 'dayjs';

import { query } from '../../connection/database';
import { IProductDescription } from '../../../entities/products/productDescription';

export const updateLatestProductDescription = async (
  id: number,
  productDescription: IProductDescription
): Promise<IProductDescription> => {
  const timeStamp = dayjs().format('YYYY-MM-DD HH:mm:ss');

  try {
    const foundProduct = await query<IProductDescription[]>(
      'SELECT * FROM product_description WHERE product_id = ?',
      [id]
    );
    
    const updatedProductDescription: IProductDescription = {
      ...foundProduct[0],
      ...productDescription,
    }

    await query('INSERT INTO product_description (product_id, name, description, photo_url, tags, price, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?);', [
      id,
      updatedProductDescription.name,
      updatedProductDescription.description,
      updatedProductDescription.photo_url ? updatedProductDescription.photo_url : null,
      updatedProductDescription.tags.join(','),
      updatedProductDescription.price,
      timeStamp,
    ])

    return updatedProductDescription;
  } catch (error) {}
};
