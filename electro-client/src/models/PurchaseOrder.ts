import BaseResponse from 'models/BaseResponse';
import { SupplierResponse } from 'models/Supplier';
import { DestinationResponse } from 'models/Destination';
import { PurchaseOrderVariantRequest, PurchaseOrderVariantResponse } from 'models/PurchaseOrderVariant';

export interface PurchaseOrderResponse extends BaseResponse {
  code: string;
  supplier: SupplierResponse;
  purchaseOrderVariants: PurchaseOrderVariantResponse[];
  destination: DestinationResponse;
  totalAmount: number;
  note: string | null;
  status: number;
  dockets: DocketResponse[];
}

interface DocketResponse extends BaseResponse {
  type: number;
  code: string;
  warehouse: WarehouseResponse;
  status: number;
}

interface WarehouseResponse extends BaseResponse {
  code: string;
  name: string;
  status: number;
}

export interface PurchaseOrderRequest {
  code: string;
  supplierId: number;
  purchaseOrderVariants: PurchaseOrderVariantRequest[];
  destinationId: number;
  totalAmount: number;
  note: string | null;
  status: number;
}
