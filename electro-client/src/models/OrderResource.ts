import BaseResponse from 'models/BaseResponse';
import { CustomerResourceResponse } from 'models/CustomerResource';

export interface OrderResourceResponse extends BaseResponse {
  code: string;
  name: string;
  color: string;
  customerResource: CustomerResourceResponse | null;
  status: number;
}

export interface OrderResourceRequest {
  code: string;
  name: string;
  color: string;
  customerResourceId: number | null;
  status: number;
}
