import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../common/dto/create-order.dto';
import { Order } from '../common/interfaces/order.interface';
import { normalizeOrder } from '../common/utils/normalization.util';
import { OrderRepository } from '../repositories/interfaces/order.repository.interface';

@Injectable()
export class OrderManagementService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Partial<Order>> {
    const normalizedOrder = normalizeOrder(createOrderDto);
    return this.orderRepository.create(normalizedOrder);
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async findOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findOne(id);
  }

  async updateOrder(
    id: string,
    updateOrderDto: Partial<CreateOrderDto>,
  ): Promise<Order | null> {
    const normalizedOrder = normalizeOrder(updateOrderDto);
    return this.orderRepository.update(id, normalizedOrder);
  }

  async removeOrder(id: string): Promise<void> {
    return this.orderRepository.remove(id);
  }
}
