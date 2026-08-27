import { UiButton } from './uiButton';
import { Media } from './media';

export interface UiHeroSlide {
  id?: number;
  title?: string;
  text?: string;
  buttons?: UiButton[] | null;
  image?: Media | null;
};
