import { Icon } from 'tabler-icons-react';

export interface CategoryLink {
  categoryName: string;
  categorySlug: string;
  categoryChildren?: CategoryLink[];
}

export interface CategorySlugIconMap {
  [categorySlug: string]: Icon;
}

export interface ProductLink {
  productName: string;
  productSlug: string;
  productThumbnail: string;
  productPrice: number;
}
