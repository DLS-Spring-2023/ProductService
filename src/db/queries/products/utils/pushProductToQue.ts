import { pushMessageToServiceBus, ProductsIndexingMessageBody, ProductsIndexingMessage } from "dls-messagelibrary";

import { IProductDescription } from "../../../../entities/products/productDescription";
import { IProductStock } from "../../../../entities/products/productStock";

export const pushProductToQue = async (id: number, productDescription: IProductDescription, productStock: IProductStock): Promise<void> => {

  const productsIndexingMessageBody: ProductsIndexingMessage = {
    body: new ProductsIndexingMessageBody('create', id.toString(), { productDescription, productStock }),
  }  

  try {
    await pushMessageToServiceBus(process.env.MESSAGE_BUS, 'products-indexing', productsIndexingMessageBody)
  } catch (error) {
    console.error(error);
    throw new Error('Failed to push message to service bus');
  }
}