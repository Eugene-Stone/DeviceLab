import { Article } from './article';

export interface Author {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  firstName?: string;
  lastName?: string;
  articles?: Article[] | null;
};
