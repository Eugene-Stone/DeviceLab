import { SharedSeo } from './sharedSeo';

export interface Blog {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title: string;
  slug: string;
  description?: string;
  sections?: any;
  seo?: SharedSeo | null;
};
