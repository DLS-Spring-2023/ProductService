import { IItemDeduct } from "./itemDeduct";

export interface IProductDeductRequest {
  requestId: string;
  deductItems: IItemDeduct[]
}