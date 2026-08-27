import { SharedSeo } from './sharedSeo';

export interface Page {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title: string;
  slug: string;
  sections?: any;
  seo?: SharedSeo | null;
};
