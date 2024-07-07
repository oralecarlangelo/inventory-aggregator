import { Controller } from '@nestjs/common';
import { OrderManagementService } from './order-management.service';

@Controller('order-management')
export class OrderManagementController {
  constructor(private readonly orderManagementService: OrderManagementService) {}
}
