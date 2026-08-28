import { FormsFormCheckbox } from './formsFormCheckbox';

export interface FormsFormCheckboxes {
  id?: number;
  label?: string;
  name: string;
  type?: "checkbox" | "radio";
  items?: FormsFormCheckbox[] | null;
};
