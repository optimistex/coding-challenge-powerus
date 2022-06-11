import { FactoryProvider, InjectionToken } from '@nestjs/common';
import { FlightSourceProvider } from './interface/flight-source-provider.interface';
import { FlightAggregatorCache } from './interface/flight-aggregator-cache.interface';

export const FLIGHT_AGGREGATOR_MODULE_OPTIONS: InjectionToken = 'FLIGHT_AGGREGATOR_MODULE_OPTIONS';

export interface FlightAggregatorModuleOptions {
  flightSourceProvider: FlightSourceProvider;
  cache: FlightAggregatorCache;
}

export type FlightAggregatorModuleAsyncOptions = Pick<FactoryProvider<FlightAggregatorModuleOptions>, 'inject' | 'useFactory'>;
