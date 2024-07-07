import { Injectable } from '@nestjs/common';
import { Order } from '../../common/interfaces/order.interface';
import { InMemoryService } from '../../database/in-memory/in-memory.service';
import { OrderRepository } from '../interfaces/order.repository.interface';

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  constructor(private readonly inMemoryService: InMemoryService) {}

  async create(order: Order): Promise<Order> {
    return this.inMemoryService.create(order);
  }

  async findAll(): Promise<Order[]> {
    return this.inMemoryService.findAll();
  }

  async findOne(id: string): Promise<Order | null> {
    return this.inMemoryService.findOne(id);
  }

  async update(id: string, updateOrder: Partial<Order>): Promise<Order | null> {
    return this.inMemoryService.update(id, updateOrder);
  }

  async remove(id: string): Promise<void> {
    return this.inMemoryService.remove(id);
  }
}
