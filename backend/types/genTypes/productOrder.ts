import { ProductsBuyerDetails } from './productsBuyerDetails';
import { User } from './user';

export interface ProductOrder {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  orderNumber?: string;
  orderStatus?: "pending" | "processing" | "completed" | "cancelled";
  totalAmount?: number;
  items?: Record<string, any>;
  itemsDefault?: string;
  buyerDetails?: ProductsBuyerDetails | null;
  user?: User | null;
};
