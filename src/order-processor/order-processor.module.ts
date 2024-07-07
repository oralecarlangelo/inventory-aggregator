import { Module } from '@nestjs/common';
import { InventoryModule } from '../inventory/inventory.module';
import { RepositoryModule } from '../repositories/repositories.module';
import { OrderProcessorService } from './order-processor.service';

@Module({
  imports: [RepositoryModule, InventoryModule],
  providers: [OrderProcessorService],
  exports: [OrderProcessorService],
})
export class OrderProcessorModule {}
