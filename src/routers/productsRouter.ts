import { Router } from 'express';

import { postProduct } from '../db/queries/postProduct';

import { IProductDescription } from '../entities/products/productDescription';
import { IProductStock } from '../entities/products/productStock';

export const productsRouter = Router();

productsRouter.post('/products', async (req, res) => {
  const result = await postProduct({} as IProductDescription, {} as IProductStock);
  res.send(result);
});

productsRouter.delete('/products', (req, res) => {
  res.send('Hello World!');
})