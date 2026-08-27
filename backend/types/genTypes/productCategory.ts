import { Media } from './media';
import { Product } from './product';

export interface ProductCategory {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  slug?: string;
  image?: Media | null;
  description?: string;
  products?: Product[] | null;
};
