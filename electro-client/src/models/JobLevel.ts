import BaseResponse from 'models/BaseResponse';

export interface JobLevelResponse extends BaseResponse {
  name: string;
  status: number;
}

export interface JobLevelRequest {
  name: string;
  status: number;
}
