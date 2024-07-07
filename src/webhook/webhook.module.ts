import { Module } from '@nestjs/common';
import { OrderProcessorModule } from '../order-processor/order-processor.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [OrderProcessorModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
