import { UiButton } from './uiButton';
import { Product } from './product';

export interface SectionsBestProducts {
  id?: number;
  title?: string;
  buttons?: UiButton[] | null;
  products?: Product[] | null;
};
