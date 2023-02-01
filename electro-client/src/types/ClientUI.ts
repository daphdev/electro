import { Icon } from 'tabler-icons-react';
import { CollectionWrapper } from 'types/CollectionWrapper';
import { VariantPropertyItem } from 'models/Variant';
import { AddressRequest } from 'models/Address';
import { ImageResponse } from 'models/Image';
import { SpecificationItem } from 'models/Product';

// CATEGORY

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

// USER & SETTING

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

// PRODUCT

export interface ClientProductResponse {
  productId: number;
  productName: string;
  productSlug: string;
  productShortDescription: string | null;
  productDescription: string | null;
  productImages: ImageResponse[];
  productCategory: ClientCategoryResponse;
  productBrand: ClientBrandResponse;
  productSpecifications: CollectionWrapper<SpecificationItem> | null;
  productVariants: ClientVariantResponse[];
}

interface ClientBrandResponse {
  brandId: number;
  brandName: string;
}

interface ClientVariantResponse {
  variantId: number;
  variantPrice: number;
  variantProperties: CollectionWrapper<VariantPropertyItem> | null;
}

// WISH

export interface ClientWishResponse {
  wishId: number;
  wishCreatedAt: string;
  wishProduct: ClientListedProductResponse;
}

export interface ClientWishRequest {
  userId: number;
  productId: number;
}

// PREORDER

export interface ClientPreorderResponse {
  preorderId: number;
  preorderCreatedAt: string;
  preorderUpdatedAt: string;
  preorderProduct: ClientListedProductResponse;
  preorderStatus: number;
}

export interface ClientPreorderRequest {
  userId: number;
  productId: number;
  status: number;
}

// REVIEW

export interface ClientReviewResponse {
  reviewId: number;
  reviewCreatedAt: string;
  reviewUpdatedAt: string;
  reviewProduct: ClientListedProductResponse;
  reviewRatingScore: number;
  reviewContent: string;
  reviewStatus: number;
}

export interface ClientReviewRequest {
  userId: number;
  productId: number;
  ratingScore: number;
  content: string;
  status: number;
}
