import { Router } from 'express';

export const productsRouter = Router();

productsRouter.post('/products', async (req, res) => {
  res.send('Hello World!');
});

productsRouter.delete('/products', (req, res) => {
  res.send('Hello World!');
})