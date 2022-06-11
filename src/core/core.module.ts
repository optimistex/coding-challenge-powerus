import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { CacheMemoryService } from './cache-memory/cache-memory.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [CacheMemoryService],
  exports: [CacheMemoryService, HttpModule],
})
export class CoreModule {}
