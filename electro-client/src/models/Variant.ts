import BaseResponse from 'models/BaseResponse';
import { CollectionWrapper, ImageItem } from 'models/Product';

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
  name: string;
  code: string;
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
