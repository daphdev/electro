import BaseResponse from 'models/BaseResponse';
import { AddressRequest, AddressResponse } from 'models/Address';

export interface SupplierResponse extends BaseResponse {
  displayName: string;
  code: string;
  contactFullname: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  companyName: string | null;
  taxCode: string | null;
  email: string | null;
  phone: string | null;
  fax: string | null;
  website: string | null;
  address: AddressResponse | null;
  description: string | null;
  note: string | null;
  status: number;
}

export interface SupplierRequest {
  displayName: string;
  code: string;
  contactFullname: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  companyName: string | null;
  taxCode: string | null;
  email: string | null;
  phone: string | null;
  fax: string | null;
  website: string | null;
  address: AddressRequest | null;
  description: string | null;
  note: string | null;
  status: number;
}
