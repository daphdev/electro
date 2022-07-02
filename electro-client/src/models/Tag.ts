import BaseResponse from 'models/BaseResponse';

export interface TagResponse extends BaseResponse {
  name: string;
  slug: string;
  status: number;
}

export interface TagRequest {
  name: string;
  slug: string;
  status: number;
}
