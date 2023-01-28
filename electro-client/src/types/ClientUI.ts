import { Icon } from 'tabler-icons-react';
import { CollectionWrapper } from 'types/CollectionWrapper';
import { VariantPropertyItem } from 'models/Variant';
import { AddressRequest } from 'models/Address';

export interface ClientCategoryResponse {
  categoryName: string;
  categorySlug: string;
  categoryChildren: ClientCategoryResponse[];
  categoryParent?: ClientCategoryResponse;
}

export interface CategorySlugIconMap {
  [categorySlug: string]: Icon;
}

export interface ClientListedProductResponse {
  productId: number;
  productName: string;
  productSlug: string;
  productThumbnail: string | null;
  productPriceRange: number[];
  productVariants: ClientListedVariantResponse[];
  productSaleable: boolean;
}

interface ClientListedVariantResponse {
  variantId: number;
  variantPrice: number;
  variantProperties: CollectionWrapper<VariantPropertyItem> | null;
}

export interface ClientFilterResponse {
  filterPriceQuartiles: [number, number];
  filterBrands: ClientBrandResponse[];
}

interface ClientBrandResponse {
  brandId: number;
  brandName: string;
}

export interface ClientPersonalSettingUserRequest {
  username: string;
  fullname: string;
  gender: string;
  address: AddressRequest;
}

export interface ClientPhoneSettingUserRequest {
  phone: string;
}

export interface ClientEmailSettingUserRequest {
  email: string;
}

export interface ClientPasswordSettingUserRequest {
  oldPassword: string;
  newPassword: string;
}
