import { FormsFormSelectOptions } from './formsFormSelectOptions';

export interface FormsFormSelect {
  id?: number;
  label?: string;
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  options?: FormsFormSelectOptions[] | null;
};
