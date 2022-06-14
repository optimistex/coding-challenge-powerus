import { of, PartialObserver } from 'rxjs';
import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { APP_ENVIRONMENT, Environment } from '../../environments/environment';
import { Flight } from '../flight-data.interface';
import { FlightApiService } from '../flight-api/flight-api.service';
import { FlightAggregatorService } from './flight-aggregator.service';

describe('FlightAggregatorService', () => {
  let service: FlightAggregatorService;
  let mockEnvironment: Partial<Environment>;
  let flightApiService: jest.Mocked<FlightApiService>;
  let spyObserver: jest.Mocked<PartialObserver<unknown>>;

  beforeEach(async () => {
    mockEnvironment = { httpSourceUrls: ['https://flight.source1', 'https://flight.source2'] };
    const mockEnvironmentProvider: Provider<Partial<Environment>> = {
      provide: APP_ENVIRONMENT,
      useValue: mockEnvironment,
    };
    const mockApiProvider: Provider<Partial<FlightApiService>> = {
      provide: FlightApiService,
      useValue: { getFlights: jest.fn() },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightAggregatorService, mockApiProvider, mockEnvironmentProvider],
    }).compile();

    service = module.get<FlightAggregatorService>(FlightAggregatorService);
    flightApiService = module.get(FlightApiService);
    spyObserver = { next: jest.fn(), error: jest.fn() };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should merge data', () => {
    flightApiService.getFlights.mockReturnValueOnce(of([{ id: 'flight1' }, { id: 'flight2' }] as Flight[]));
    flightApiService.getFlights.mockReturnValue(of([{ id: 'flight3' }, { id: 'flight4' }] as Flight[]));
    service.getAggregatedFlights().subscribe(spyObserver);

    expect(flightApiService.getFlights).toBeCalledTimes(2);
    expect(flightApiService.getFlights).toHaveBeenNthCalledWith(1, 'https://flight.source1');
    expect(flightApiService.getFlights).toHaveBeenNthCalledWith(2, 'https://flight.source2');
    expect(spyObserver.next).toBeCalledTimes(1);
    expect(spyObserver.next).toBeCalledWith([{ id: 'flight1' }, { id: 'flight2' }, { id: 'flight3' }, { id: 'flight4' }]);
    expect(spyObserver.error).not.toBeCalled();
  });

  it('should remove duplicates', () => {
    flightApiService.getFlights.mockReturnValueOnce(of([{ id: 'flight1' }, { id: 'flight2' }, { id: 'flight3' }] as Flight[]));
    flightApiService.getFlights.mockReturnValue(of([{ id: 'flight3' }, { id: 'flight2' }, { id: 'flight4' }] as Flight[]));
    service.getAggregatedFlights().subscribe(spyObserver);

    expect(spyObserver.next).toBeCalledTimes(1);
    expect(spyObserver.next).toBeCalledWith([{ id: 'flight1' }, { id: 'flight2' }, { id: 'flight3' }, { id: 'flight4' }]);
    expect(spyObserver.error).not.toBeCalled();
  });
});
