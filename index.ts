import express from 'express';
import { config } from 'dotenv';
config();

import { getProducts } from './src/db/getProducts';
import { productsRouter } from './src/routers/productsRouter';

const app = express();

app.get('/', async (req, res) => {
    const products = await getProducts();
    console.log(products);
    res.send(products);
});

app.use(productsRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}🍔`);
});