import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { APP_ENVIRONMENT, environment } from '../environments/environment';
import { AppController } from './app.controller';
import { FlightApiService } from './flight-api/flight-api.service';
import { CacheService } from './cache/cache.service';
import { FlightAggregatorService } from './flight-aggregator/flight-aggregator.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [{ provide: APP_ENVIRONMENT, useValue: environment }, FlightApiService, CacheService, FlightAggregatorService],
  controllers: [AppController],
})
export class AppModule {}
