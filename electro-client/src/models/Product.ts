import BaseResponse from 'models/BaseResponse';
import { BrandResponse } from 'models/Brand';
import { SupplierResponse } from 'models/Supplier';
import { UnitResponse } from 'models/Unit';
import { TagResponse } from 'models/Tag';
import { GuaranteeResponse } from 'models/Guarantee';
import { VariantRequest, VariantResponse } from 'models/Variant';

export interface ProductResponse extends BaseResponse {
  name: string;
  code: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  images: CollectionWrapper<ImageItem>;
  status: number;
  category: Category_ProductResponse;
  brand: BrandResponse;
  supplier: SupplierResponse;
  unit: UnitResponse;
  tags: TagResponse[];
  specifications: CollectionWrapper<SpecificationItem>;
  properties: CollectionWrapper<ProductPropertyItem>;
  variants: VariantResponse[];
  weight: number;
  guarantee: GuaranteeResponse;
}

export interface CollectionWrapper<T> {
  content: T[];
  totalElements: number;
}

export interface ImageItem {
  url: string;
  isThumbnail?: boolean;
}

export interface SpecificationItem {
  id: number;
  code: string;
  name: string;
  value: string;
}

export interface ProductPropertyItem {
  id: number;
  code: string;
  name: string;
  value: string[];
}

interface Category_ProductResponse extends BaseResponse {
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  status: number;
}

export interface ProductRequest {
  name: string;
  code: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  images: CollectionWrapper<ImageItem>;
  status: number;
  categoryId: number;
  brandId: number;
  supplierId: number;
  unitId: number;
  tags: Tag_ProductRequest[];
  specifications: CollectionWrapper<SpecificationItem>;
  properties: CollectionWrapper<ProductPropertyItem>;
  variants: VariantRequest[];
  weight: number;
  guaranteeId: number;
}

interface Tag_ProductRequest {
  id?: number;
  name?: string;
  slug?: string;
  status?: number;
}
