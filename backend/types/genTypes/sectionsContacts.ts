import { UiCardLocation } from './uiCardLocation';
import { UiCardHours } from './uiCardHours';
import { UiCardConnect } from './uiCardConnect';

export interface SectionsContacts {
  id?: number;
  title?: string;
  location?: UiCardLocation | null;
  hours?: UiCardHours | null;
  socials?: UiCardConnect | null;
};
