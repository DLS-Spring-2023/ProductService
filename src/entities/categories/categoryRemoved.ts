import { ICategory } from "./category";

export interface ICategoryRemoved {
  id: number;
  category_id: ICategory['id'];
  removed_at: Date;
} 