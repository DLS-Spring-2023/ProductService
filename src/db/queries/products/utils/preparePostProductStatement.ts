import dayjs, { type Dayjs } from 'dayjs';

import { IProductDescription } from '../../../../entities/products/productDescription';
import { IProductStock } from '../../../../entities/products/productStock';

export const preparePostProductValues = (
  product: IProductDescription,
  stock: IProductStock
) => {
  const timeStamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
  return [
    // products table
    timeStamp,

    // product_description table
    product.name,
    product.description,
    product.photo_url ? product.photo_url : null,
    product.tags.join(','),
    product.price,
    timeStamp,

    // product_stock table
    stock.quantity,
    timeStamp,
  ];
};

export const postProductSqlStatement = `
INSERT INTO products (updated_at) VALUES (?);
SET @product_id = LAST_INSERT_ID();
INSERT INTO product_description (product_id, name, description, photo_url, tags, price, updated_at) VALUES (@product_id, ?, ?, ?, ?, ?, ?);
INSERT INTO product_stock (product_id, quantity, updated_at) VALUES (@product_id, ?, ?);
`;
