import BaseResponse from 'models/BaseResponse';
import { OrderResourceResponse } from 'models/OrderResource';
import { OrderCancellationReasonResponse } from 'models/OrderCancellationReason';
import { UserResponse } from 'models/User';
import { OrderVariantRequest, OrderVariantResponse } from 'models/OrderVariant';
import { PaymentMethodType } from 'models/PaymentMethod';

export interface OrderResponse extends BaseResponse {
  code: string;
  status: number;
  toName: string;
  toPhone: string;
  toAddress: string;
  toWardName: string;
  toDistrictName: string;
  toProvinceName: string;
  orderResource: OrderResourceResponse;
  orderCancellationReason: OrderCancellationReasonResponse | null;
  note: string | null;
  user: UserResponse;
  orderVariants: OrderVariantResponse[];
  totalAmount: number;
  tax: number;
  shippingCost: number;
  totalPay: number;
  paymentMethodType: PaymentMethodType;
  paymentStatus: number;
}

export interface OrderRequest {
  code: string;
  status: number;
  toName: string;
  toPhone: string;
  toAddress: string;
  toWardName: string;
  toDistrictName: string;
  toProvinceName: string;
  orderResourceId: number;
  orderCancellationReasonId: number | null;
  note: string | null;
  userId: number;
  orderVariants: OrderVariantRequest[];
  totalAmount: number;
  tax: number;
  shippingCost: number;
  totalPay: number;
  paymentMethodType: PaymentMethodType;
  paymentStatus: number;
}
