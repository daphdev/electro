import BaseResponse from 'models/BaseResponse';
import { BrandResponse } from 'models/Brand';
import { SupplierResponse } from 'models/Supplier';
import { DocketVariantExtendedResponse } from 'models/DocketVariantExtended';

export interface ProductInventoryResponse {
  product: ProductResponse;
  transactions: DocketVariantExtendedResponse[];
  inventory: number;
  waitingForDelivery: number;
  canBeSold: number;
  areComing: number;
}

interface ProductResponse extends BaseResponse {
  name: string;
  code: string;
  slug: string;
  brand: BrandResponse | null;
  supplier: SupplierResponse | null;
}
