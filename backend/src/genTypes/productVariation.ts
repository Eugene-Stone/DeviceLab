import { Media } from './media';
import { Product } from './product';

export interface ProductVariation {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  sku: string;
  price?: number;
  priceOld?: number;
  stockStatus?: "inStock" | "outOffStock";
  color?: any;
  storage?: string;
  images?: Media[] | null;
  product?: Product | null;
};
