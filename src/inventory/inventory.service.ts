import { Injectable } from '@nestjs/common';
import { Order } from '../common/interfaces/order.interface';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async updateInventory(order: Order) {
    // Update inventory based on order items
    for (const item of order.items) {
      await this.prisma.inventory.update({
        where: { productId: item.productId },
        data: { quantity: { decrement: item.quantity } },
      });
    }
  }
}
