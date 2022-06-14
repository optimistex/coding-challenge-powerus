import { of, PartialObserver, Subject, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { Provider } from '@nestjs/common';
import { APP_ENVIRONMENT, Environment } from '../../environments/environment';
import { CacheService } from '../cache/cache.service';
import { FlightRaw, FlightSlice } from '../flight-data.interface';
import { FlightApiService } from './flight-api.service';

function mockResponse(flights: FlightRaw[]): AxiosResponse<{ flights: FlightRaw[] }> {
  return { data: { flights } } as Partial<AxiosResponse<{ flights: FlightRaw[] }>> as AxiosResponse<{ flights: FlightRaw[] }>;
}

describe('FlightApiService', () => {
  let service: FlightApiService;
  let httpService: jest.Mocked<HttpService>;
  let cache: jest.Mocked<CacheService>;
  let spyObserver: jest.Mocked<PartialObserver<unknown>>;

  beforeEach(async () => {
    const mockEnvironment: Provider<Partial<Environment>> = { provide: APP_ENVIRONMENT, useValue: { timeout: 750 } };
    const mockHttpProvider: Provider<Partial<HttpService>> = { provide: HttpService, useValue: { get: jest.fn() } };
    const mockCacheProvider: Provider<Partial<CacheService>> = { provide: CacheService, useValue: { get: jest.fn(), set: jest.fn() } };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightApiService, mockHttpProvider, mockCacheProvider, mockEnvironment],
    }).compile();

    service = module.get<FlightApiService>(FlightApiService);
    cache = module.get(CacheService);
    httpService = module.get(HttpService);
    spyObserver = { next: jest.fn(), error: jest.fn() };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch data and cache it', () => {
    httpService.get.mockReturnValue(of(mockResponse([{ slices: [{ flight_number: '123' } as FlightSlice], price: 100 }])));

    service.getFlights('https://test.source').subscribe(spyObserver);

    expect(spyObserver.next).toBeCalledTimes(1);
    expect(spyObserver.next).toBeCalledWith([
      {
        slices: [{ flight_number: '123' }],
        price: 100,
        id: 'd1ef4c077ab400f51e7afa2e8ac5449f75d657c60555a0f5917674257c290532',
      },
    ]);
    expect(spyObserver.error).not.toBeCalled();

    expect(cache.set).toBeCalledTimes(1);
    expect(cache.set).toBeCalledWith('https://test.source', [
      {
        slices: [{ flight_number: '123' }],
        price: 100,
        id: 'd1ef4c077ab400f51e7afa2e8ac5449f75d657c60555a0f5917674257c290532',
      },
    ]);
    expect(cache.get).not.toBeCalled();
  });

  it('should return cached data when fetch is failed', () => {
    cache.get.mockReturnValue([{ slices: [], price: 200 }]);
    httpService.get.mockReturnValue(throwError(() => new Error()));
    service.getFlights('https://test.source').subscribe(spyObserver);

    expect(spyObserver.next).toBeCalledTimes(1);
    expect(spyObserver.next).toBeCalledWith([{ slices: [], price: 200 }]);
    expect(spyObserver.error).not.toBeCalled();

    expect(cache.set).not.toBeCalled();
    expect(cache.get).toBeCalledTimes(1);
    expect(cache.get).toBeCalledWith('https://test.source', []);
  });

  it('should return cached data when fetch is failed timeout', () => {
    cache.get.mockReturnValue([{ slices: [], price: 300 }]);
    const testSubject = new Subject<AxiosResponse<{ flights: FlightRaw[] }>>();
    httpService.get.mockReturnValue(testSubject);
    jest.useFakeTimers();
    service.getFlights('https://test.source').subscribe(spyObserver);
    jest.advanceTimersByTime(750);
    testSubject.next(undefined);

    expect(spyObserver.next).toBeCalledTimes(1);
    expect(spyObserver.next).toBeCalledWith([{ slices: [], price: 300 }]);
    expect(spyObserver.error).not.toBeCalled();

    expect(cache.set).not.toBeCalled();
    expect(cache.get).toBeCalledTimes(1);
    expect(cache.get).toBeCalledWith('https://test.source', []);
  });
});
