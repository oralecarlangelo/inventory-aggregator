import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from '../common/dto/create-order.dto';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('order')
  async receiveOrder(@Body() createOrderDto: CreateOrderDto) {
    await this.webhookService.handleOrderWebhook(createOrderDto);
    return { message: 'Order received and processed' };
  }
}
