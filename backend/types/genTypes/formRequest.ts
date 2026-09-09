import { User } from './user';

export interface FormRequest {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  formTitle?: string;
  formData?: string;
  formDataJSON?: Record<string, any>;
  user?: User | null;
};
