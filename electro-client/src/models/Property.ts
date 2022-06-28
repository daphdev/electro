import BaseResponse from 'models/BaseResponse';

export interface PropertyResponse extends BaseResponse {
  name: string;
  code: string;
  description: string;
  status: number;
}

export interface PropertyRequest {
  name: string;
  code: string;
  description: string;
  status: number;
}
