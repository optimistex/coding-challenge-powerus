import { DynamicModule, Module } from '@nestjs/common';
import { FlightAggregatorService } from './flight-aggregator/flight-aggregator.service';
import { FLIGHT_AGGREGATOR_MODULE_OPTIONS, FlightAggregatorModuleAsyncOptions } from './flight-aggregator.module-options';

@Module({})
export class FlightAggregatorModule {
  public static forRootAsync(options: FlightAggregatorModuleAsyncOptions): DynamicModule {
    return {
      module: FlightAggregatorModule,
      global: true,
      providers: [{ provide: FLIGHT_AGGREGATOR_MODULE_OPTIONS, ...options }, FlightAggregatorService],
      exports: [FlightAggregatorService],
    };
  }
}
