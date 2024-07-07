import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { InventoryService } from './inventory.service';

@Module({
  providers: [InventoryService, PrismaService],
  exports: [InventoryService],
})
export class InventoryModule {}
