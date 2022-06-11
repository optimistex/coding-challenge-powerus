import { Global, Module } from '@nestjs/common';
import { CacheMemoryService } from './cache-memory/cache-memory.service';

@Global()
@Module({
  providers: [CacheMemoryService],
  exports: [CacheMemoryService],
})
export class CoreModule {}
