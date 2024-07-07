import { Injectable } from '@nestjs/common';
import { Order } from '../../common/interfaces/order.interface';
import { PrismaService } from '../../database/prisma/prisma.service';
import { OrderRepository } from '../interfaces/order.repository.interface';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: Order): Promise<Order> {
    const prismaOrder = this.mapToPrismaOrder(order);
    const createdOrder = await this.prisma.order.create({
      data: prismaOrder,
      include: { items: true },
    });
    return this.mapFromPrismaOrder(createdOrder);
  }

  async findAll(): Promise<Order[]> {
    const prismaOrders = await this.prisma.order.findMany({
      include: { items: true },
    });
    return prismaOrders.map(this.mapFromPrismaOrder);
  }

  async findOne(id: string): Promise<Order | null> {
    const prismaOrder = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    return prismaOrder ? this.mapFromPrismaOrder(prismaOrder) : null;
  }

  async update(id: string, updateOrder: Partial<Order>): Promise<Order | null> {
    const prismaUpdateOrder = this.mapToPrismaOrder(updateOrder);
    const prismaOrder = await this.prisma.order.update({
      where: { id },
      data: prismaUpdateOrder,
      include: { items: true },
    });
    return prismaOrder ? this.mapFromPrismaOrder(prismaOrder) : null;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }

  private mapToPrismaOrder(order: Partial<Order>) {
    const { id, customerId, vendor, items, createdAt, updatedAt } = order;
    return {
      id,
      customerId,
      vendor,
      createdAt,
      updatedAt,
      items: items
        ? {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          }
        : undefined,
    };
  }

  private mapFromPrismaOrder(prismaOrder: any): Order {
    return {
      id: prismaOrder.id,
      customerId: prismaOrder.customerId,
      vendor: prismaOrder.vendor,
      items: prismaOrder.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      createdAt: prismaOrder.createdAt,
      updatedAt: prismaOrder.updatedAt,
    };
  }
}
