import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import { createHandler } from 'graphql-http/lib/use/express';

import { schema } from './src/graphql/schema'

config();
import { productsRouter } from './src/routers/productsRouter';
import { authenticateJWT } from './src/auth/verify-token-middleware';
import { orderDeductRouter } from './src/routers/orderDeductRouter';

const app = express();

app.use('/graphql', createHandler({schema}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(orderDeductRouter)

app.use(authenticateJWT)

app.use(productsRouter)

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('??');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}🍔`);
});