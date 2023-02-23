import BaseResponse from 'models/BaseResponse';

export interface PaymentMethodResponse extends BaseResponse {
  name: string;
  code: PaymentMethodType;
  status: number;
}

export interface PaymentMethodRequest {
  status: number;
}

export enum PaymentMethodType {
  CASH = 'CASH',
  PAYPAL = 'PAYPAL'
}
