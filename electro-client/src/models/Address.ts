import BaseResponse from 'models/BaseResponse';
import { ProvinceResponse } from 'models/Province';
import { DistrictResponse } from 'models/District';

export interface AddressResponse extends BaseResponse {
  line: string;
  province: ProvinceResponse;
  district: District_AddressResponse;
}

type District_AddressResponse = Omit<DistrictResponse, 'province'>;

export interface AddressRequest {
  line: string;
  provinceId: number;
  districtId: number;
}
