import BaseResponse from 'models/BaseResponse';

export interface GuaranteeResponse extends BaseResponse {
  name: string;
  description: string;
  status: number;
}

export interface GuaranteeRequest {
  name: string;
  description: string;
  status: number;
}
