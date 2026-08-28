import { SharedSingleField } from './sharedSingleField';

export interface UiCardHours {
  id?: number;
  title?: string;
  hours?: SharedSingleField[] | null;
};
