import BaseResponse from 'models/BaseResponse';

export interface CategoryResponse extends BaseResponse {
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  parentCategory: ParentCategoryResponse;
  status: number;
  categories: CategoryResponse[];
}

interface ParentCategoryResponse extends BaseResponse {
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  status: number;
}

export interface CategoryRequest {
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  parentCategoryId: number;
  status: number;
}
