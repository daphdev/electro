import BaseResponse from 'models/BaseResponse';
import { DocketReasonResponse } from 'models/DocketReason';
import { WarehouseResponse } from 'models/Warehouse';
import { DocketVariantRequest, DocketVariantResponse } from 'models/DocketVariant';

export interface DocketResponse extends BaseResponse {
  type: number;
  code: string;
  reason: DocketReasonResponse;
  warehouse: WarehouseResponse;
  docketVariants: DocketVariantResponse[];
  purchaseOrder: PurchaseOrderResponse | null;
  order: OrderResponse | null;
  note: string | null;
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

export interface DocketRequest {
  type: number;
  code: string;
  reasonId: number;
  warehouseId: number;
  docketVariants: DocketVariantRequest[];
  purchaseOrderId: number | null;
  orderId: number | null;
  note: string | null;
  status: number;
}
