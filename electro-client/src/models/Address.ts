import BaseResponse from 'models/BaseResponse';
import { ProvinceResponse } from 'models/Province';
import { DistrictResponse } from 'models/District';

export interface AddressResponse extends BaseResponse {
  line: string | null;
  province: ProvinceResponse | null;
  district: District_AddressResponse | null;
}

type District_AddressResponse = Omit<DistrictResponse, 'province'>;

export interface AddressRequest {
  line: string | null;
  provinceId: number | null;
  districtId: number | null;
}
