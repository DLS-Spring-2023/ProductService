import { IProductDescription } from "../../entities/products/productDescription";

import { query } from "../connection/database";

export const findProductsByTags = (tags: string): Promise<IProductDescription[]> => {
  // TODO: Think about limitation for tags, leaving default as 5 for now
  const tagArray = tags.split(',').slice(0, 5);

  // WHERE clause for each tag, each tag is followed by OR to allow for multiple matches
  const clauses = tagArray.map(tag => `tags LIKE '%${tag}%'`).join(' OR ');

  const result = query<IProductDescription[]>(`SELECT * FROM product_description WHERE ${clauses}`);
  
  return result;
}
