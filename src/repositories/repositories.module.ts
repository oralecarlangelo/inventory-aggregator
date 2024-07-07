import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from '../config/config.service';
import { InMemoryModule } from '../database/in-memory/in-memory.module';
import { InMemoryService } from '../database/in-memory/in-memory.service';
import { PrismaModule } from '../database/prisma/prisma.module';
import { PrismaService } from '../database/prisma/prisma.service';
import { InMemoryOrderRepository } from './in-memory/in-memory-order.repository';
import { PrismaOrderRepository } from './prisma/prisma-order.repository';

@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is imported
    PrismaModule,
    InMemoryModule,
  ],
  providers: [
    AppConfigService, // Ensure AppConfigService is provided
    PrismaService, // Provide PrismaService
    InMemoryService, // Provide InMemoryService
    {
      provide: 'ORDER_REPOSITORY',
      useFactory: (
        configService: AppConfigService,
        prismaService: PrismaService,
        inMemoryService: InMemoryService,
      ) => {
        const usePrisma = configService.usePrisma;
        console.log(
          `Using ${usePrisma ? 'Prisma' : 'InMemory'} Order Repository`,
        );
        return usePrisma
          ? new PrismaOrderRepository(prismaService)
          : new InMemoryOrderRepository(inMemoryService);
      },
      inject: [AppConfigService, PrismaService, InMemoryService],
    },
  ],
  exports: ['ORDER_REPOSITORY'],
})
export class RepositoryModule {}
