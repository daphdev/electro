import BaseResponse from 'models/BaseResponse';
import { DocketReasonResponse } from 'models/DocketReason';
import { WarehouseResponse } from 'models/Warehouse';

export interface DocketVariantEliminatedResponse {
  docket: DocketResponse;
  quantity: number;
}

interface DocketResponse extends BaseResponse {
  type: number;
  code: string;
  reason: DocketReasonResponse;
  warehouse: WarehouseResponse;
  purchaseOrder: PurchaseOrderResponse | null;
  order: OrderResponse | null;
  status: number;
}

interface PurchaseOrderResponse extends BaseResponse {
  code: string;
  status: number;
}

interface OrderResponse extends BaseResponse {
  code: string;
  status: number;
}
