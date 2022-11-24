import BaseResponse from 'models/BaseResponse';
import { AddressRequest, AddressResponse } from 'models/Address';

export interface WarehouseResponse extends BaseResponse {
  code: string;
  name: string;
  address: AddressResponse | null;
  status: number;
}

export interface WarehouseRequest {
  code: string;
  name: string;
  address: AddressRequest | null;
  status: number;
}
