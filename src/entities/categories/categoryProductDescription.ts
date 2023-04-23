import { IProductDescription } from "../products/productDescription";
import { ICategory } from "./category";

export interface ICategoryProductDescription {
  id: number;
  category_id: ICategory['id'];
  product_description_id: IProductDescription['id']
}
