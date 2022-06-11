import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FlightAggregatorModule } from './flight-aggregator/flight-aggregator.module';
import { CoreModule } from './core/core.module';
import { FlightSourceBuilderService } from './core/flight-source-builder/flight-source-builder.service';

@Global()
@Module({
  imports: [
    CoreModule.forRoot({
      timeout: 800,
      httpSourceUrls: ['https://coding-challenge.powerus.de/flight/source1', 'https://coding-challenge.powerus.de/flight/source2'],
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
