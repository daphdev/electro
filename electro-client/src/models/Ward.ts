import BaseResponse from 'models/BaseResponse';
import { DistrictResponse } from 'models/District';

export interface WardResponse extends BaseResponse {
  name: string;
  code: string;
  district: DistrictResponse;
}

export interface WardRequest {
  name: string;
  code: string;
  districtId: number;
}
