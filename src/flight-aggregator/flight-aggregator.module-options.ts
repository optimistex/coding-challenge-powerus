import { FactoryProvider, InjectionToken } from '@nestjs/common';
import { FlightSourceHandler } from './flight-source-handler/flight-source-handler';

export const FLIGHT_AGGREGATOR_MODULE_OPTIONS: InjectionToken = 'FLIGHT_AGGREGATOR_MODULE_OPTIONS';

export interface FlightAggregatorModuleOptions {
  flightSources: FlightSourceHandler[];
}

export type FlightAggregatorModuleAsyncOptions = Pick<FactoryProvider<FlightAggregatorModuleOptions>, 'inject' | 'useFactory'>;
