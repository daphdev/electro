import BaseResponse from 'models/BaseResponse';

export interface DocketReasonResponse extends BaseResponse {
  name: string;
  status: number;
}

export interface DocketReasonRequest {
  name: string;
  status: number;
}
