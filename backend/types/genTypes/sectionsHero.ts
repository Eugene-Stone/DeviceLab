import { UiHeroSlide } from './uiHeroSlide';

export interface SectionsHero {
  id?: number;
  title: string;
  slides?: UiHeroSlide[] | null;
};
