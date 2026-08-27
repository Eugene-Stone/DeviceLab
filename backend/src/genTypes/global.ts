import { Media } from './media';
import { SharedSingleField } from './sharedSingleField';
import { SharedSocialLink } from './sharedSocialLink';
import { SharedSeo } from './sharedSeo';

export interface Global {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title: string;
  logoHeader: Media | null;
  logoFooter?: Media | null;
  contacts?: SharedSingleField[] | null;
  socials?: SharedSocialLink[] | null;
  copyright?: string;
  seo?: SharedSeo | null;
};
