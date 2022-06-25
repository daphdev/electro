import BaseResponse from 'models/BaseResponse';

export interface CustomerResourceResponse extends BaseResponse {
  code: string;
  name: string;
  description: string;
  color: string;
  status: number;
}

export interface CustomerResourceRequest {
  code: string;
  name: string;
  description: string;
  color: string;
  status: number;
}
