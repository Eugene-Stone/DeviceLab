

export interface ProductsBuyerDetails {
  id?: number;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryCity?: string;
  deliveryStreet?: string;
  deliveryStreetHouse?: string;
  deliveryMethod?: "pickup" | "courier" | "postOperator";
  deliveryPostOperator?: string;
  orderComments?: string;
};
