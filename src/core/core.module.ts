import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { CacheMemoryService } from './cache-memory/cache-memory.service';
import { FlightSourceBuilderService } from './flight-source-builder/flight-source-builder.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [CacheMemoryService, FlightSourceBuilderService],
  exports: [CacheMemoryService, FlightSourceBuilderService, HttpModule],
})
export class CoreModule {}
