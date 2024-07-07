import { Module } from '@nestjs/common';
import { OrderManagementService } from './order-management.service';
import { OrderManagementController } from './order-management.controller';

@Module({
  controllers: [OrderManagementController],
  providers: [OrderManagementService],
})
export class OrderManagementModule {}
