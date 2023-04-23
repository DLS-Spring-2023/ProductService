import { query } from "../connection/database";

export const findProductsByTag = (tags: string) => {
  const result = query(`SELECT * FROM product_description WHERE FIND_IN_SET('${tags}', tags) > 0`);
  
  return result;
}