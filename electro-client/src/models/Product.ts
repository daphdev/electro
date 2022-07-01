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
  shortDescription: string | null;
  description: string | null;
  thumbnail: string | null;
  images: CollectionWrapper<ImageItem> | null;
  status: number;
  category: Category_ProductResponse | null;
  brand: BrandResponse | null;
  supplier: SupplierResponse | null;
  unit: UnitResponse | null;
  tags: TagResponse[];
  specifications: CollectionWrapper<SpecificationItem> | null;
  properties: CollectionWrapper<ProductPropertyItem> | null;
  variants: VariantResponse[];
  weight: number | null;
  guarantee: GuaranteeResponse | null;
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
  name: string;
  code: string;
  value: string;
}

export interface ProductPropertyItem {
  id: number;
  name: string;
  code: string;
  value: string[];
}

interface Category_ProductResponse extends BaseResponse {
  name: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  status: number;
}

export interface ProductRequest {
  name: string;
  code: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  thumbnail: string | null;
  images: CollectionWrapper<ImageItem> | null;
  status: number;
  categoryId: number | null;
  brandId: number | null;
  supplierId: number | null;
  unitId: number | null;
  tags: Tag_ProductRequest[];
  specifications: CollectionWrapper<SpecificationItem> | null;
  properties: CollectionWrapper<ProductPropertyItem> | null;
  variants: VariantRequest[];
  weight: number | null;
  guaranteeId: number | null;
}

export interface Tag_ProductRequest {
  id?: number;
  name?: string;
  slug?: string;
  status?: number;
}
