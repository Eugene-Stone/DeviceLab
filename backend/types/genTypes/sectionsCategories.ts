import { ProductCategory } from './productCategory';

export interface SectionsCategories {
  id?: number;
  title?: string;
  showAllCategories?: boolean;
  product_categories?: ProductCategory[] | null;
};
