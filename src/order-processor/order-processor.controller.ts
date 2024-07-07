import { Controller } from '@nestjs/common';
import { OrderProcessorService } from './order-processor.service';

@Controller('order-processor')
export class OrderProcessorController {
  constructor(private readonly orderProcessorService: OrderProcessorService) {}
}
