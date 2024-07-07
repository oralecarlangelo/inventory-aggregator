import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../interfaces/order.interface';

export function normalizeOrder(orderData: CreateOrderDto): Order {
  const now = new Date();
  return {
    ...orderData,
    createdAt: now,
    updatedAt: now,
  };
}
