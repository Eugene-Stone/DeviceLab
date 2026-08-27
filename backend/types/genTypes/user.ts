import { Role } from './role';
export interface User {
  id?: number;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  role: Role | null | number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  product_orders?: any[];
};
