

export interface ProductsBuyerDetails {
  id?: number;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryMethod?: "courier" | "pickup" | "postOperator";
  deliveryPostOperator?: string;
  deliveryCity?: string;
  deliveryStreet?: string;
  deliveryStreetHouse?: string;
  orderComments?: string;
};
