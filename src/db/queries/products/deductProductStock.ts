import { IProductDeductRequest } from '../../../entities/products/productDeductRequest';
import { pool } from '../../connection/database';
import { pushUpdatedProductStockToQue } from './utils/pushUpdatedProductStockToQue';

//TODO: predefine errors, make code more readable and compact, maybe split things up
export const deductProductStock = async (
  productDeductRequest: IProductDeductRequest
) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const requestId = productDeductRequest.requestId;
    let newStock: number;

    //: For every product in the request
    for (const productDeduct of productDeductRequest.deductItems) {
      const { productId, deductAmount } = productDeduct;

      //: Get the latest stock from history
      const [getLatestStock] = await conn.query(
        'SELECT * FROM product_stock_history WHERE product_id = ? ORDER BY updated_at DESC LIMIT 1',
        [productId]
      );
      
      //: If the product has a history, get the latest stock
      if (getLatestStock[0]) {
        if (getLatestStock[0].new_stock < deductAmount) {
          throw new Error(`Product stock for product id ${productId} is not enough.`);
        }

        //: Deduct the amount from the latest stock
        const newQuantity = getLatestStock[0].new_stock - deductAmount;
        newStock = Number(newQuantity);

        //: Insert the new stock into history
        await conn.query(
          'INSERT INTO product_stock_history (product_id, new_stock, request_id, updated_at) VALUES (?, ?, ?, ?)',
          [productId, newQuantity, requestId, new Date()]
        );
        console.log(`Product with productId ${productId} stock deducted by ${deductAmount}`);
      }
      
      //: If no history exists for the product, get the initial stock
      else {
        const [productStock] = await conn.query(
          'SELECT * FROM product_stock WHERE product_id = ?',
          [productId]
        );

        if (productStock[0].quantity < deductAmount) {
          throw new Error(`Product stock for product id ${productId} is not enough.`);
        }

        const newQuantity = Number(productStock[0].quantity) - deductAmount;
        newStock = Number(newQuantity);

        await conn.query(
          'INSERT INTO product_stock_history (product_id, new_stock, request_id) VALUES (?, ?, ?)',
          [productId, newQuantity, requestId]
        );
        console.log(`Product with productId ${productId} stock deducted by ${deductAmount}`);
      }
      
      try {
        pushUpdatedProductStockToQue(productDeduct.productId.toString(), newStock)
      } catch (error) {
        console.log('Failed to send update stock to service bus')
      }
    }

    //TODO: Send logging to bus / use queue to update stock
    await conn.commit();
    console.log('Stock deduction completed successfully.');
    return `Order was completed for request-id ${requestId}.`
  } catch (err) {
    await conn.rollback();
    //TODO: send logging to log bus
    console.error('An error occurred. Transaction rolled back.', err);
    throw err;
  } finally {
    conn.release();
  }
};
