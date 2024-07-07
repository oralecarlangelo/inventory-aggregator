export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  vendor?: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}
