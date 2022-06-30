import BaseResponse from 'models/BaseResponse';

export interface GuaranteeResponse extends BaseResponse {
  name: string;
  description: string | null;
  status: number;
}

export interface GuaranteeRequest {
  name: string;
  description: string | null;
  status: number;
}
