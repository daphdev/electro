import BaseResponse from 'models/BaseResponse';
import { CollectionWrapper } from 'types';
import { VariantPropertyItem } from 'models/Variant';

export interface OrderVariantResponse {
  variant: VariantResponse;
  price: number;
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

export interface OrderVariantRequest {
  variantId: number;
  price: number;
  quantity: number;
  amount: number;
}

export interface OrderVariantKeyRequest {
  orderId: number;
  variantId: number;
}
