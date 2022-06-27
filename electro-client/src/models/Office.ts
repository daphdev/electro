import BaseResponse from 'models/BaseResponse';
import { AddressRequest, AddressResponse } from 'models/Address';

export interface OfficeResponse extends BaseResponse {
  name: string;
  address: AddressResponse;
  status: number;
}

export interface OfficeRequest {
  name: string;
  address: AddressRequest;
  status: number;
}
