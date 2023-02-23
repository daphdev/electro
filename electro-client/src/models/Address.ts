import BaseResponse from 'models/BaseResponse';
import { ProvinceResponse } from 'models/Province';
import { DistrictResponse } from 'models/District';
import { WardResponse } from 'models/Ward';

export interface AddressResponse extends BaseResponse {
  line: string | null;
  province: ProvinceResponse | null;
  district: AddressResponse_DistrictResponse | null;
  ward: AddressResponse_WardResponse | null;
}

type AddressResponse_DistrictResponse = Omit<DistrictResponse, 'province'>;

type AddressResponse_WardResponse = Omit<WardResponse, 'district'>;

export interface AddressRequest {
  line: string | null;
  provinceId: number | null;
  districtId: number | null;
  wardId: number | null;
}
