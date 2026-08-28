import { Media } from './media';

export interface OurStory {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  text?: any;
  image?: Media | null;
};
