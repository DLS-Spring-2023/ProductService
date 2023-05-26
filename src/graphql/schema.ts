import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

import { getLatestProductDescriptionById } from '../db/queries/products/getProductDescriptionById';

const ProductDescriptionType = new GraphQLObjectType({
  name: 'ProductDescription',
  fields: {
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    description: { type: GraphQLString },
    photo_url: { type: GraphQLString },
  },
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      getProduct: {
        type: ProductDescriptionType,
        args: {
          product_id: { type: GraphQLInt},
        },
        resolve: (parent, args) => {
          const productId = args.product_id;
          const productDescription = getLatestProductDescriptionById(productId);
          return productDescription;
        }
      },
    }, 
  }),
});