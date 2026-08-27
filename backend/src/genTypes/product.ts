import { Media } from './media';
import { ProductVariation } from './productVariation';
import { ProductCategory } from './productCategory';

export interface Product {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title: string;
  sku: string;
  price: number;
  priceOld?: number;
  stockStatus?: "inStock" | "outOffStock";
  description?: any;
  attributes?: any;
  images?: Media[] | null;
  product_variations?: ProductVariation[] | null;
  product_categories?: ProductCategory[] | null;
  overview?: string;
  deliveryNotice?: string;
  badge?: "new" | "sale";
  slug?: string;
};
