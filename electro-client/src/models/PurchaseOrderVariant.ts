import BaseResponse from 'models/BaseResponse';
import { CollectionWrapper } from 'types';
import { VariantPropertyItem } from 'models/Variant';

export interface PurchaseOrderVariantResponse {
  variant: VariantResponse;
  cost: number;
  quantity: number;
  amount: number;
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

export interface PurchaseOrderVariantRequest {
  variantId: number;
  cost: number;
  quantity: number;
  amount: number;
}

export interface PurchaseOrderVariantKeyRequest {
  purchaseOrderId: number;
  variantId: number;
}
