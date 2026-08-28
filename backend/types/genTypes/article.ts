import { Media } from './media';
import { AdminUser } from './adminUser';
import { SharedSeo } from './sharedSeo';

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
  related_articles?: Article[] | null;
  author?: AdminUser | null;
  seo?: SharedSeo | null;
};
