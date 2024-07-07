import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../common/dto/create-order.dto';
import { OrderProcessorService } from '../order-processor/order-processor.service';

@Injectable()
export class WebhookService {
  constructor(private readonly orderProcessorService: OrderProcessorService) {}

  async handleOrderWebhook(orderData: CreateOrderDto): Promise<void> {
    await this.orderProcessorService.storeOrder(orderData);
  }
}
