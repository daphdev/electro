import BaseResponse from 'models/BaseResponse';
import { WarehouseResponse } from 'models/Warehouse';
import { CountVariantRequest, CountVariantResponse } from 'models/CountVariant';

export interface CountResponse extends BaseResponse {
  code: string;
  warehouse: WarehouseResponse;
  countVariants: CountVariantResponse[];
  note: string | null;
  status: number;
}

export interface CountRequest {
  code: string;
  warehouseId: number;
  countVariants: CountVariantRequest[];
  note: string | null;
  status: number;
}
