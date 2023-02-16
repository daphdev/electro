import BaseResponse from 'models/BaseResponse';

export interface ReviewResponse extends BaseResponse {
  user: ReviewResponse_UserResponse;
  product: ReviewResponse_ProductResponse;
  ratingScore: number;
  content: string;
  reply: string | null;
  status: number;
}

interface ReviewResponse_UserResponse extends BaseResponse {
  username: string;
  fullname: string;
}

interface ReviewResponse_ProductResponse extends BaseResponse {
  name: string;
  code: string;
  slug: string;
}

export interface ReviewRequest {
  userId: number;
  productId: number;
  ratingScore: number;
  content: string;
  reply: string | null;
  status: number;
}
