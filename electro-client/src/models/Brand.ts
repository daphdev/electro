import BaseResponse from 'models/BaseResponse';

export interface BrandResponse extends BaseResponse {
  name: string;
  code: string;
  description: string;
  status: number;
}

export interface BrandRequest {
  name: string;
  code: string;
  description: string;
  status: number;
}
