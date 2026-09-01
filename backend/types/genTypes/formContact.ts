import { FormsFormInput } from './formsFormInput';
import { FormsFormSelect } from './formsFormSelect';
import { FormsFormTextarea } from './formsFormTextarea';
import { FormsFormSubmit } from './formsFormSubmit';

export interface FormContact {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title?: string;
  description?: string;
  nameInput?: FormsFormInput | null;
  emailInput?: FormsFormInput | null;
  subjectSelect?: FormsFormSelect | null;
  messageTextarea?: FormsFormTextarea | null;
  submitButton?: FormsFormSubmit | null;
  submitUrl?: string;
  successMessage?: string;
  errorMessage?: string;
};
