import { UiCardTeam } from './uiCardTeam';

export interface SectionsTeam {
  id?: number;
  title?: string;
  cards?: UiCardTeam[] | null;
};
