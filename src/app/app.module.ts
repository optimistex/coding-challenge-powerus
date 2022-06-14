import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { APP_ENVIRONMENT, environment } from '../environments/environment';
import { AppController } from './app.controller';
import { FlightAggregatorService } from './flight-aggregator/flight-aggregator.service';
import { CacheMemoryService } from './cache-memory/cache-memory.service';
import { FlightSourceBuilderService } from './flight-source-builder/flight-source-builder.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [{ provide: APP_ENVIRONMENT, useValue: environment }, FlightAggregatorService, CacheMemoryService, FlightSourceBuilderService],
  controllers: [AppController],
})
export class AppModule {}
