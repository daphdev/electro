import BaseResponse from 'models/BaseResponse';
import { ImageItem, CollectionWrapper } from 'models/Product';

export interface VariantResponse extends BaseResponse {
  sku: string;
  cost: number;
  price: number;
  properties: CollectionWrapper<VariantPropertyItem>;
  images: CollectionWrapper<ImageItem>;
  status: number;
}

export interface VariantPropertyItem {
  id: number;
  code: string;
  name: string;
  value: string;
}

export interface VariantRequest {
  sku: string;
  cost: number;
  price: number;
  properties: CollectionWrapper<VariantPropertyItem>;
  images: CollectionWrapper<ImageItem>;
  status: number;
}
