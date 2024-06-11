export interface OrderDto {
    orderTrackingNumber: string;
    dateCreated: Date;
    totalPrice: number;
    orderItemQuantity: number;
    address: string;
    status: string;
  }