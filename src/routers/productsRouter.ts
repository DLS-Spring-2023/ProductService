import { Router } from 'express';

import { postProduct } from '../db/queries/postProduct';

import { IProductDescription } from '../entities/products/productDescription';
import { IProductStock } from '../entities/products/productStock';
import { getAllProducts } from '../db/queries/getAllProducts';
import { getProductDescriptionById } from '../db/queries/getProductDescriptionById';
import { findProductsByTag } from '../db/queries/findProductsByTag';

export const productsRouter = Router();

productsRouter.post('/products', async (req, res) => {
  const product: IProductDescription = req.body.product;
  const stock: IProductStock = req.body.stock;

  const result = await postProduct(product, stock);

  res.send(result);
});

productsRouter.get('/products', async (req, res) => {
  const result = await getAllProducts();

  res.send(result);
});

productsRouter.get('/products/:id', async (req, res) => {
  const result = await getProductDescriptionById(Number(req.params.id));

  res.send(result);
});

productsRouter.get('/products/:tags', async (req, res) => {
  const result = await findProductsByTag(req.params.tags);
  
  res.send(result);
});


productsRouter.delete('/products', (req, res) => {
  res.send('Hello World!');
})