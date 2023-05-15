import { IProductDeduct } from "./productDeduct";

export interface IProductDeductRequest {
  requestId: string;
  deductProducts: IProductDeduct[]
}