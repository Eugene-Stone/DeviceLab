import { UiCard } from './uiCard';

export interface SectionsFeatures {
  id?: number;
  title?: string;
  cards?: UiCard[] | null;
};
