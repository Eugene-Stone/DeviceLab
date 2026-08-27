import { Media } from './media';

export interface UiCard {
  id?: number;
  title?: string;
  text?: string;
  icon?: Media | null;
};
