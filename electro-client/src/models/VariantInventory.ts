import BaseResponse from 'models/BaseResponse';
import { CollectionWrapper } from 'types';
import { VariantPropertyItem } from 'models/Variant';
import { DocketVariantEliminatedResponse } from 'models/DocketVariantEliminatedResponse';

export interface VariantInventoryResponse {
  variant: VariantResponse;
  transactions: DocketVariantEliminatedResponse[];
  inventory: number;
  waitingForDelivery: number;
  canBeSold: number;
  areComing: number;
}

interface VariantResponse extends BaseResponse {
  product: ProductResponse;
  sku: string;
  cost: number;
  price: number;
  properties: CollectionWrapper<VariantPropertyItem> | null;
  status: number;
}

interface ProductResponse extends BaseResponse {
  name: string;
  code: string;
  slug: string;
}
