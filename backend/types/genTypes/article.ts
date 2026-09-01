import { Media } from './media';
import { Author } from './author';
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
  author?: Author | null;
  sections?: any;
  seo?: SharedSeo | null;
};
