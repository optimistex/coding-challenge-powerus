import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FLIGHT_AGGREGATOR_MODULE_OPTIONS, FlightAggregatorModuleOptions } from '../flight-aggregator.module-options';
import { FlightSourceHandler } from '../flight-source-handler/flight-source-handler';
import { FlightAggregatorService } from './flight-aggregator.service';

describe('FlightAggregatorService', () => {
  let service: FlightAggregatorService;
  let flightSources: FlightSourceHandler[];

  beforeEach(async () => {
    flightSources = [];
    const mockOptionsProvider: Provider<FlightAggregatorModuleOptions> = { provide: FLIGHT_AGGREGATOR_MODULE_OPTIONS, useValue: { flightSources } };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightAggregatorService, mockOptionsProvider],
    }).compile();

    service = module.get<FlightAggregatorService>(FlightAggregatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
