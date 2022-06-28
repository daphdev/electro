import BaseResponse from 'models/BaseResponse';
import { AddressRequest, AddressResponse } from 'models/Address';

export interface SupplierResponse extends BaseResponse {
  displayName: string;
  code: string;
  contactFullname: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  taxCode: string;
  email: string;
  phone: string;
  fax: string;
  website: string;
  address: AddressResponse;
  description: string;
  note: string;
  status: number;
}

export interface SupplierRequest {
  displayName: string;
  code: string;
  contactFullname: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  taxCode: string;
  email: string;
  phone: string;
  fax: string;
  website: string;
  address: AddressRequest;
  description: string;
  note: string;
  status: number;
}
