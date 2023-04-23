import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';

config();

import { productsRouter } from './src/routers/productsRouter';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(productsRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}🍔`);
});