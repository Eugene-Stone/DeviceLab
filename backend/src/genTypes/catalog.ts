import { SharedSeo } from './sharedSeo';

export interface Catalog {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title: string;
  slug: string;
  seo?: SharedSeo | null;
};
