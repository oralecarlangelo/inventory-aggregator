import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AppConfigService } from './config/config.service';
import { InMemoryModule } from './database/in-memory/in-memory.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderManagementModule } from './order-management/order-management.module';
import { OrderProcessorModule } from './order-processor/order-processor.module';
import { RepositoryModule } from './repositories/repositories.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),

    PrismaModule,
    InMemoryModule,
    WebhookModule,
    OrderProcessorModule,
    OrderManagementModule,
    InventoryModule,
    RepositoryModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
