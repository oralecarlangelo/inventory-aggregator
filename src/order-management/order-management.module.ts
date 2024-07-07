import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repositories/repositories.module';
import { OrderManagementController } from './order-management.controller';
import { OrderManagementService } from './order-management.service';

@Module({
  imports: [RepositoryModule],
  providers: [OrderManagementService],
  controllers: [OrderManagementController],
})
export class OrderManagementModule {}
