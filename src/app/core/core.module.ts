import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { CacheMemoryService } from './cache-memory/cache-memory.service';
import { FlightSourceBuilderService } from './flight-source-builder/flight-source-builder.service';
import { CORE_MODULE_OPTIONS, CoreModuleOptions } from './core.module-options';

@Module({})
export class CoreModule {
  public static forRoot(options: CoreModuleOptions): DynamicModule {
    return {
      module: CoreModule,
      global: true,
      imports: [HttpModule],
      providers: [{ provide: CORE_MODULE_OPTIONS, useValue: options }, CacheMemoryService, FlightSourceBuilderService],
      exports: [CacheMemoryService, FlightSourceBuilderService],
    };
  }
}
