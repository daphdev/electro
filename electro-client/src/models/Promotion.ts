import BaseResponse from 'models/BaseResponse';
import { ProductResponse } from 'models/Product';

export interface PromotionResponse extends BaseResponse {
  name: string;
  startDate: string;
  endDate: string;
  percent: number;
  status: number;
  products: ProductResponse[];
}

export interface PromotionRequest {
  name: string;
  startDate: string;
  endDate: string;
  percent: number;
  status: number;
  productIds: number[];
  categoryIds: number[];
}

export interface PromotionCheckingResponse {
  promotionable: boolean;
}
