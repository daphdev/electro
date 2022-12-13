import BaseResponse from 'models/BaseResponse';
import { OrderResourceResponse } from 'models/OrderResource';
import { OrderCancellationReasonResponse } from 'models/OrderCancellationReason';
import { UserResponse } from 'models/User';
import { OrderVariantRequest, OrderVariantResponse } from 'models/OrderVariant';

export interface OrderResponse extends BaseResponse {
  code: string;
  status: number;
  orderResource: OrderResourceResponse;
  orderCancellationReason: OrderCancellationReasonResponse | null;
  note: string | null;
  customer: CustomerResponse;
  orderVariants: OrderVariantResponse[];
  totalAmount: number;
  tax: number;
  shippingCost: number;
  totalPay: number;
}

interface CustomerResponse extends BaseResponse {
  user: UserResponse;
}

export interface OrderRequest {
  code: string;
  status: number;
  orderResourceId: number;
  orderCancellationReasonId: number | null;
  note: string | null;
  customerId: number;
  orderVariants: OrderVariantRequest[];
  totalAmount: number;
  tax: number;
  shippingCost: number;
  totalPay: number;
}
