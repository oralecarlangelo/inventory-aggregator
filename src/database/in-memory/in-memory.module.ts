import { Module } from '@nestjs/common';
import { InMemoryService } from './in-memory.service';

@Module({
  providers: [InMemoryService],
})
export class InMemoryModule {}
