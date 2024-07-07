import { Order } from '../../common/interfaces/order.interface';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findAll(): Promise<Order[]>;
  findOne(id: string): Promise<Order | null>;
  update(id: string, updateOrder: Partial<Order>): Promise<Order | null>;
  remove(id: string): Promise<void>;
}
