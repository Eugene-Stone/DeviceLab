import { Media } from './media';
import { ProductVariation } from './productVariation';
import { ProductCategory } from './productCategory';
import { SharedSeo } from './sharedSeo';

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
  slug?: string;
  badge?: any;
  seo?: SharedSeo | null;
};
