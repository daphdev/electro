import BaseResponse from 'models/BaseResponse';

export interface ProvinceResponse extends BaseResponse {
  name: string;
  code: string;
}

export interface ProvinceRequest {
  name: string;
  code: string;
}
