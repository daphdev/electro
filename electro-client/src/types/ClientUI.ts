import { Icon } from 'tabler-icons-react';

export interface ClientCategoryResponse {
  categoryName: string;
  categorySlug: string;
  categoryChildren: ClientCategoryResponse[];
  categoryParent?: ClientCategoryResponse;
}

export interface CategorySlugIconMap {
  [categorySlug: string]: Icon;
}

export interface ClientListedProductResponse {
  productName: string;
  productSlug: string;
  productThumbnail: string;
  productPrice: number;
}
