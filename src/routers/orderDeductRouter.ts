import { Router } from 'express';
import { IProductDeductRequest } from '../entities/products/productDeductRequest';
import { deductProductStock } from '../db/queries/products/deductProductStock';

export const orderDeductRouter = Router();

orderDeductRouter.post('/products/deduct/update-stock', async (req, res) => {
  const productDeductRequest: IProductDeductRequest = req.body;
  console.log('productDeductRequest', productDeductRequest)
  if (productDeductRequest) {
    deductProductStock(productDeductRequest).then((result) => {
      res.send({ response: result, status: 'OK' });
    }).catch((error) => {
      res.status(400).send({ response: error.message, status: 'FAILED' });
    });
  } else {
    res.status(400).send({ response: 'UNKNOWN', status: 'INVALID REQUEST' });
  }
});