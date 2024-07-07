import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../common/dto/create-order.dto';
import { normalizeOrder } from '../common/utils/normalization.util';
import { InventoryService } from '../inventory/inventory.service';
import { ORDER_REPOSITORY } from '../repositories/constants';
import { OrderRepository } from '../repositories/interfaces/order.repository.interface';

@Injectable()
export class OrderProcessorService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepository,
    private readonly inventoryService: InventoryService,
  ) {}

  async storeOrder(orderData: CreateOrderDto) {
    const normalizedOrder = normalizeOrder(orderData);
    await this.orderRepository.create(normalizedOrder);
  }

  async processOrders() {
    const orders = await this.orderRepository.findAll();
    const validatedOrders = this.validateAndNormalizeOrders(orders);
    await this.storeAggregatedOrders(validatedOrders);
    await this.updateInventory(validatedOrders);
  }

  private validateAndNormalizeOrders(orders: any[]): any[] {
    return orders.map((order) => normalizeOrder(order));
  }

  private async storeAggregatedOrders(orders: any[]) {
    for (const order of orders) {
      await this.orderRepository.update(order.id, order);
    }
  }

  private async updateInventory(orders: any[]) {
    for (const order of orders) {
      await this.inventoryService.updateInventory(order);
    }
  }
}
