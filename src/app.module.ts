import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightAggregatorModule } from './flight-aggregator/flight-aggregator.module';
import { CacheMemoryService } from './core/cache-memory/cache-memory.service';
import { CoreModule } from './core/core.module';

@Global()
@Module({
  imports: [
    HttpModule,
    CoreModule,
    FlightAggregatorModule.forRootAsync({
      inject: [CacheMemoryService],
      useFactory: (cacheMemoryService) => ({
        flightSourceProvider: { getSourceList: () => [] },
        cache: cacheMemoryService,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
