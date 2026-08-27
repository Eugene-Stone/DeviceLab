import { Media } from './media';
import { SharedSeo } from './sharedSeo';
import { AdminUser } from './adminUser';

export interface Article {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  slug?: string;
  image?: Media | null;
  text?: any;
  tags?: any;
  seo?: SharedSeo | null;
  author?: AdminUser | null;
};
