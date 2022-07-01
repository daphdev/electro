import BaseResponse from 'models/BaseResponse';

export interface CategoryResponse extends BaseResponse {
  name: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  parentCategory: ParentCategoryResponse | null;
  status: number;
  categories: CategoryResponse[];
}

interface ParentCategoryResponse extends BaseResponse {
  name: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  status: number;
}

export interface CategoryRequest {
  name: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  parentCategoryId: number | null;
  status: number;
}
