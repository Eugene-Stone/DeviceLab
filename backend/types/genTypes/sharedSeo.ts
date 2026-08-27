import { Media } from './media';

export interface SharedSeo {
  id?: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  metaRobots?: "index,follow" | "noindex,follow" | "index,nofollow" | "noindex,nofollow";
  preventIndexing?: boolean;
  metaViewport?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: Media | null;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: Media | null;
  structuredData?: string;
};
