import { Media } from './media';
import { UiStatItem } from './uiStatItem';

export interface SectionsOurStory {
  id?: number;
  title?: string;
  text?: any;
  image?: Media | null;
  stats?: UiStatItem[] | null;
};
