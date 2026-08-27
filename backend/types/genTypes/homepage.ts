import { SharedSeo } from './sharedSeo';

export interface Homepage {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  sections?: any;
  seo?: SharedSeo | null;
};
