import { Router } from 'express';

import { findProductsByTags } from '../db/queries/products/findProductsByTags';
import { getAllProducts } from '../db/queries/products/getAllProducts';
import { postProduct } from '../db/queries/products/postProduct';
import { getProductDescriptionById } from '../db/queries/products/getProductDescriptionById';

import { IProductDescription } from '../entities/products/productDescription';
import { IProductStock } from '../entities/products/productStock';

export const productsRouter = Router();

productsRouter.post('/products', async (req, res) => {
  const product: IProductDescription = req.body.product
  const stock: IProductStock = req.body.stock;

  if (product && stock) {
    const result = await postProduct(product, stock);
    res.send(result);
  } else {
    res.status(400).send('Bad request');
  }
});

productsRouter.get('/products', async (req, res) => {
  const result = await getAllProducts();

  res.send(result);
});

productsRouter.get('/products/:id', async (req, res) => {
  const id = Number(req.params.id);
  
  if (!isNaN(id)) {
    const result = await getProductDescriptionById(id);

    res.send(result);
  } else {
    res.status(400).send('Invalid ID');
  }
});

productsRouter.get('/products/tags/:tags', async (req, res) => {
  const result = await findProductsByTags(req.params.tags);
  
  res.send(result);
});


productsRouter.delete('/products', (req, res) => {
  res.send('Hello World!');
})