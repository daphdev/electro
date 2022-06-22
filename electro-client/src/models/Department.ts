import BaseResponse from 'models/BaseResponse';

export interface DepartmentResponse extends BaseResponse {
  name: string;
  status: number;
}

export interface DepartmentRequest {
  name: string;
  status: number;
}
