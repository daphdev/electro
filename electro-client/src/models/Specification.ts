import BaseResponse from 'models/BaseResponse';

export interface SpecificationResponse extends BaseResponse {
  name: string;
  code: string;
  description: string | null;
  status: number;
}

export interface SpecificationRequest {
  name: string;
  code: string;
  description: string | null;
  status: number;
}
