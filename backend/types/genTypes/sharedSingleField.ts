import { Media } from './media';

export interface SharedSingleField {
  id?: number;
  icon?: Media | null;
  field?: string;
  fieldAdditional?: string;
};
