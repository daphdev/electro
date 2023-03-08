import { CollectionWrapper } from 'types/CollectionWrapper';
import { VariantPropertyItem } from 'models/Variant';
import { AddressRequest } from 'models/Address';
import { ImageResponse } from 'models/Image';
import { SpecificationItem } from 'models/Product';
import { PaymentMethodType } from 'models/PaymentMethod';
import { RoomResponse } from 'models/Room';
import { MessageResponse } from 'models/Message';
import { RewardType } from 'models/RewardStrategy';

// CATEGORY

export interface ClientCategoryResponse {
  categoryName: string;
  categorySlug: string;
  categoryChildren: ClientCategoryResponse[];
  categoryParent?: ClientCategoryResponse;
}

export interface ClientListedProductResponse {
  productId: number;
  productName: string;
  productSlug: string;
  productThumbnail: string | null;
  productPriceRange: number[];
  productVariants: ClientListedVariantResponse[];
  productSaleable: boolean;
  productPromotion: ClientPromotionResponse | null;
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
  productPromotion: ClientPromotionResponse | null;
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
  productPromotion: ClientPromotionResponse | null;
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

// PAYMENT_METHOD

export interface ClientPaymentMethodResponse {
  paymentMethodId: number;
  paymentMethodName: string;
  paymentMethodCode: PaymentMethodType;
}

// ORDER

export interface ClientSimpleOrderResponse {
  orderId: number;
  orderCreatedAt: string;
  orderCode: string;
  orderStatus: number;
  orderTotalPay: number;
  orderItems: ClientOrderVariantResponse[];
  orderPaymentStatus: number;
}

export interface ClientOrderVariantResponse {
  orderItemVariant: ClientOrderVariantResponse_ClientVariantResponse;
  orderItemPrice: number;
  orderItemQuantity: number;
  orderItemAmount: number;
}

interface ClientOrderVariantResponse_ClientVariantResponse {
  variantId: number;
  variantProduct: ClientOrderVariantResponse_ClientVariantResponse_ClientProductResponse;
  variantProperties: CollectionWrapper<VariantPropertyItem> | null;
}

interface ClientOrderVariantResponse_ClientVariantResponse_ClientProductResponse {
  productId: number;
  productName: string;
  productSlug: string;
  productThumbnail: string;
  productIsReviewed: boolean;
}

export interface ClientOrderDetailResponse {
  orderId: number;
  orderCreatedAt: string;
  orderCode: string;
  orderStatus: number;
  orderToName: string;
  orderToPhone: string;
  orderToAddress: string;
  orderToWardName: string;
  orderToDistrictName: string;
  orderToProvinceName: string;
  orderTotalAmount: number;
  orderTax: number;
  orderShippingCost: number;
  orderTotalPay: number;
  orderPaymentMethodType: PaymentMethodType;
  orderPaymentStatus: number;
  orderItems: ClientOrderVariantResponse[];
  orderWaybill: ClientWaybillResponse | null;
}

// WAYBILL

export interface ClientWaybillResponse {
  waybillCode: string;
  waybillExpectedDeliveryTime: string;
  waybillLogs: ClientWaybillLogResponse[];
}

export interface ClientWaybillLogResponse {
  waybillLogId: number;
  waybillLogCreatedAt: string;
  waybillLogPreviousStatus: number | null;
  waybillLogCurrentStatus: number | null;
}


// PROMOTION

export interface ClientPromotionResponse {
  promotionId: number;
  promotionPercent: number;
}

// CHAT

export interface ClientRoomExistenceResponse {
  roomExistence: boolean;
  roomResponse: RoomResponse;
  roomRecentMessages: MessageResponse[];
}

// ORDER 2

export interface ClientSimpleOrderRequest {
  paymentMethodType: PaymentMethodType;
}

export interface ClientConfirmedOrderResponse {
  orderCode: string;
  orderPaymentMethodType: PaymentMethodType;
  orderPaypalCheckoutLink: string | null;
}

// REWARD

export interface ClientRewardLogResponse {
  rewardLogId: number;
  rewardLogCreatedAt: string;
  rewardLogScore: number;
  rewardLogType: RewardType;
  rewardLogNote: string;
}

export interface ClientRewardResponse {
  rewardTotalScore: number;
  rewardLogs: ClientRewardLogResponse[];
}

// REGISTRATION

export interface RegistrationResponse {
  userId: number;
}

export interface RegistrationRequest {
  userId: number;
  token: string;
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
}
