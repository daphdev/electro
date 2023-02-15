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
  productCategory: ClientCategoryResponse | null;
  productBrand: ClientProductResponse_ClientBrandResponse | null;
  productSpecifications: CollectionWrapper<SpecificationItem> | null;
  productVariants: ClientProductResponse_ClientVariantResponse[];
  productSaleable: boolean;
  productAverageRatingScore: number;
  productCountReviews: number;
  productRelatedProducts: ClientListedProductResponse[];
}

interface ClientProductResponse_ClientBrandResponse {
  brandId: number;
  brandName: string;
}

interface ClientProductResponse_ClientVariantResponse {
  variantId: number;
  variantPrice: number;
  variantProperties: CollectionWrapper<VariantPropertyItem> | null;
  variantInventory: number;
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

export interface ClientSimpleReviewResponse {
  reviewId: number;
  reviewCreatedAt: string;
  reviewUpdatedAt: string;
  reviewUser: ClientSimpleReviewResponse_UserResponse;
  reviewRatingScore: number;
  reviewContent: string;
  reviewReply: string | null;
  reviewStatus: number;
}

interface ClientSimpleReviewResponse_UserResponse {
  userId: number;
  userUsername: string;
  userFullname: string;
}

export interface ClientReviewResponse {
  reviewId: number;
  reviewCreatedAt: string;
  reviewUpdatedAt: string;
  reviewProduct: ClientListedProductResponse;
  reviewRatingScore: number;
  reviewContent: string;
  reviewReply: string | null;
  reviewStatus: number;
}

export interface ClientReviewRequest {
  userId: number;
  productId: number;
  ratingScore: number;
  content: string;
  status: number;
}

// CART

export interface ClientCartResponse {
  cartId: number;
  cartItems: ClientCartVariantResponse[];
}

export interface ClientCartVariantResponse {
  cartItemVariant: ClientCartVariantResponse_ClientVariantResponse;
  cartItemQuantity: number;
}

interface ClientCartVariantResponse_ClientVariantResponse {
  variantId: number;
  variantProduct: ClientCartVariantResponse_ClientVariantResponse_ClientProductResponse;
  variantPrice: number;
  variantProperties: CollectionWrapper<VariantPropertyItem> | null;
  variantInventory: number;
}

interface ClientCartVariantResponse_ClientVariantResponse_ClientProductResponse {
  productId: number;
  productName: string;
  productSlug: string;
  productThumbnail: string | null;
}

export interface ClientCartRequest {
  cartId: number | null;
  userId: number;
  cartItems: ClientCartVariantRequest[];
  status: number;
  updateQuantityType: UpdateQuantityType;
}

interface ClientCartVariantRequest {
  variantId: number;
  quantity: number;
}

export interface ClientCartVariantKeyRequest {
  cartId: number;
  variantId: number;
}

export enum UpdateQuantityType {
  OVERRIDE = 'OVERRIDE',
  INCREMENTAL = 'INCREMENTAL'
}
