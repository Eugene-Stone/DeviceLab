import { Media } from './media';

export interface SharedSocialLink {
  id?: number;
  title: string;
  link: string;
  icon?: Media | null;
};
