import BaseResponse from 'models/BaseResponse';

export interface CustomerStatusResponse extends BaseResponse {
  code: string;
  name: string;
  description: string;
  color: string;
  status: number;
}

export interface CustomerStatusRequest {
  code: string;
  name: string;
  description: string;
  color: string;
  status: number;
}
