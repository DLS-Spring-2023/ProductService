import dayjs, { type Dayjs } from 'dayjs';

import { query } from "../../connection/database";
import { IProductRemoved } from '../../../entities/products/productRemoved';

export const removeProduct = async (id: number): Promise<IProductRemoved[]> => {
  const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');

  const result = await query<IProductRemoved[]>('INSERT INTO product_removed (product_id, removed_at) VALUES (?, ?)', [id, timestamp]);

  return result
}