import {
  pushMessageToServiceBus,
  ProductsIndexingMessageBody,
  ProductsIndexingMessage,
} from 'dls-messagelibrary';

export const pushUpdatedProductStockToQue = async (
  id: string,
  newStock: number
): Promise<void> => {
  const productsIndexingMessageBody: ProductsIndexingMessage = {
    body: new ProductsIndexingMessageBody('update', id, {
      productStock: {
        quantity: newStock,
      }
    }),
  };

  try {
    await pushMessageToServiceBus(
      process.env.MESSAGE_BUS,
      'products-indexing',
      productsIndexingMessageBody
    );
  } catch (error) {
    console.error(error);
    throw new Error('Failed to push message to service bus');
  }
};
