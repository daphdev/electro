import BaseResponse from 'models/BaseResponse';
import { AddressRequest, AddressResponse } from 'models/Address';
import { RoleResponse } from 'models/Role';

export interface UserResponse extends BaseResponse {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  gender: 'M' | 'F';
  address: AddressResponse;
  avatar: string | null;
  status: number;
  roles: RoleResponse[];
}

export interface UserRequest {
  username: string;
  password: string | null;
  fullname: string;
  email: string;
  phone: string;
  gender: 'M' | 'F';
  address: AddressRequest;
  avatar: string | null;
  status: number;
  roles: Role_UserRequest[];
}

interface Role_UserRequest {
  id?: number;
  code?: string;
  name?: string;
  status?: number;
}
