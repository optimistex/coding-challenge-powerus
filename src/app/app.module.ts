import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FlightAggregatorModule } from './flight-aggregator/flight-aggregator.module';
import { CoreModule } from './core/core.module';
import { FlightSourceBuilderService } from './core/flight-source-builder/flight-source-builder.service';
import { environment } from '../environments/environment';

@Global()
@Module({
  imports: [
    CoreModule.forRoot({
      cachingTime: 3600, // 1 hour
      timeout: 800,
      httpSourceUrls: environment.httpSourceUrls,
    }),
    FlightAggregatorModule.forRootAsync({
      inject: [FlightSourceBuilderService],
      useFactory: (flightSourceBuilderService: FlightSourceBuilderService) => ({
        flightSources: flightSourceBuilderService.getSourceList(),
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
