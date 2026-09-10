

export interface ProductsBuyerDetails {
  id?: number;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryMethod?: "pickup" | "courier" | "postOperator";
  deliveryCity?: string;
  deliveryStreet?: string;
  deliveryStreetHouse?: string;
  deliveryPostOperator?: string;
  deliveryPostOffice?: string;
  orderComments?: string;
};
