import { Router } from 'express';

import { findProductsByTags } from '../db/queries/products/findProductsByTags';
import { getAllProducts } from '../db/queries/products/getAllProducts';
import { postProduct } from '../db/queries/products/postProduct';
import { removeProduct } from '../db/queries/products/removeProduct';
import { updateLatestProductDescription } from '../db/queries/products/updateProductDescription';
import { getLatestProductDescriptionById } from '../db/queries/products/getProductDescriptionById';

import { IProductDescription } from '../entities/products/productDescription';
import { IProductStock } from '../entities/products/productStock';

export const productsRouter = Router();

productsRouter.post('/products', async (req, res) => {
  const productDescription: IProductDescription = req.body.productDescription;
  const productStock: IProductStock = req.body.productStock;

  if (!isNaN(productDescription.price)) {
    if (productDescription && productStock && productDescription.price) {
      const result = await postProduct(productDescription, productStock);
      res.send(result);
    } else {
      res.status(400).send('Bad request');
    }
  } else {
    res.status(400).send('Invalid price');
  }

});

productsRouter.post('/products/:id', async (req, res) => {
  const id = Number(req.params.id);
  const updatedProductDescription: IProductDescription = req.body.productDescription;

  if (!isNaN(id)) {
    const result = updateLatestProductDescription(id, updatedProductDescription)
    
    res.send(result);
  } else {
    res.status(400).send('Invalid ID');
  }
});

productsRouter.get('/products', async (req, res) => {
  const result = await getAllProducts();

  res.send(result);
});

productsRouter.get('/products/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!isNaN(id)) {
    const result = await getLatestProductDescriptionById(id);
    
    res.send(result);
  } else {
    res.status(400).send('Invalid ID');
  }
});

productsRouter.get('/products/tags/:tags', async (req, res) => {
  const result = await findProductsByTags(req.params.tags);

  res.send(result);
});

productsRouter.delete('/products/:id', async (req, res) => {
  const id = Number(req.params.id); 

  if (!isNaN(id)) {
    const removedProduct = await removeProduct(id);
    if (removedProduct.length === 0) {
      res.status(400).send('Product with id ' + id + ' is already removed');
      return;
    }
    res.send('Product with id ' + id + ' was removed');
  } else {
    res.status(400).send('Invalid ID');
  }
});
