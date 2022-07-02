import BaseResponse from 'models/BaseResponse';

export interface CustomerGroupResponse extends BaseResponse {
  code: string;
  name: string;
  description: string;
  color: string;
  status: number;
}

export interface CustomerGroupRequest {
  code: string;
  name: string;
  description: string;
  color: string;
  status: number;
}
