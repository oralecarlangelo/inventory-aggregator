import { Injectable } from '@nestjs/common';
import { Order } from '../../common/interfaces/order.interface';

@Injectable()
export class InMemoryService {
  private orders: Order[] = [];

  async create(order: Order): Promise<Order> {
    this.orders.push(order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orders;
  }

  async findOne(id: string): Promise<Order | null> {
    return this.orders.find((order) => order.id === id) || null;
  }

  async update(id: string, updateOrder: Partial<Order>): Promise<Order | null> {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index === -1) return null;
    this.orders[index] = { ...this.orders[index], ...updateOrder };
    return this.orders[index];
  }

  async remove(id: string): Promise<void> {
    this.orders = this.orders.filter((order) => order.id !== id);
  }
}
