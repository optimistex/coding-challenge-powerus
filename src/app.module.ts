import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightAggregatorModule } from './flight-aggregator/flight-aggregator.module';
import { CoreModule } from './core/core.module';
import { FlightSourceBuilderService } from './core/flight-source-builder/flight-source-builder.service';

@Global()
@Module({
  imports: [
    CoreModule,
    FlightAggregatorModule.forRootAsync({
      inject: [FlightSourceBuilderService],
      useFactory: (flightSourceBuilderService: FlightSourceBuilderService) => ({
        flightSources: flightSourceBuilderService.getSourceList(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
