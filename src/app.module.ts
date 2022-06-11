import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightAggregatorModule } from './flight-aggregator/flight-aggregator.module';
import { CacheMem } from './cache/cache-mem';

@Module({
  imports: [
    HttpModule,
    FlightAggregatorModule.forRootAsync({
      useFactory: () => ({
        flightSourceProvider: { getSourceList: () => [] },
        cache: new CacheMem(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
