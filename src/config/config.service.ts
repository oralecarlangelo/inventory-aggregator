import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService extends ConfigService {
  get usePrisma(): boolean {
    const usePrisma = this.get<string>('USE_PRISMA', 'true');
    return usePrisma.toLowerCase() === 'true';
  }
}
