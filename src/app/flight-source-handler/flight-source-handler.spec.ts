import { of, PartialObserver, Subject, throwError } from 'rxjs';
import { HttpFlightSource } from '../http-flight-source/http-flight-source';
import { FlightRaw, FlightSlice } from '../interface/flight-data.interface';
import { FlightAggregatorCache } from '../interface/flight-aggregator-cache.interface';
import { FlightSourceHandler } from './flight-source-handler';

describe('FlightSourceHandler', () => {
  let sourceHandler: FlightSourceHandler;
  let source: jest.Mocked<HttpFlightSource>;
  let cache: jest.Mocked<FlightAggregatorCache>;
  let spyObserver: jest.Mocked<PartialObserver<unknown>>;

  beforeEach(() => {
    source = {
      getId: jest.fn().mockReturnValue('testSourceId'),
      getFlights: jest.fn(),
    } as Partial<HttpFlightSource> as jest.Mocked<HttpFlightSource>;
    cache = { get: jest.fn(), set: jest.fn() } as Partial<FlightAggregatorCache> as jest.Mocked<FlightAggregatorCache>;
    sourceHandler = new FlightSourceHandler(source, cache, 750, 1000);
    spyObserver = { next: jest.fn(), error: jest.fn() };
  });

  it('should be defined', () => {
    expect(sourceHandler).toBeDefined();
  });

  it('should fetch data and cache it', () => {
    source.getFlights.mockReturnValue(of([{ slices: [{ flight_number: '123' } as FlightSlice], price: 100 }]));
    sourceHandler.getFlights().subscribe(spyObserver);

    expect(spyObserver.next).toBeCalledTimes(1);
    expect(spyObserver.next).toBeCalledWith([
      { slices: [{ flight_number: '123' }], price: 100, id: 'd1ef4c077ab400f51e7afa2e8ac5449f75d657c60555a0f5917674257c290532' },
    ]);
    expect(spyObserver.error).not.toBeCalled();

    expect(cache.set).toBeCalledTimes(1);
    expect(cache.set).toBeCalledWith(
      'testSourceId',
      [{ slices: [{ flight_number: '123' }], price: 100, id: 'd1ef4c077ab400f51e7afa2e8ac5449f75d657c60555a0f5917674257c290532' }],
      { maxAge: 1000 },
    );
    expect(cache.get).not.toBeCalled();
  });

  it('should return cached data when fetch is failed', () => {
    cache.get.mockReturnValue([{ slices: [], price: 200 }]);
    source.getFlights.mockReturnValue(throwError(() => new Error()));
    sourceHandler.getFlights().subscribe(spyObserver);

    expect(spyObserver.next).toBeCalledTimes(1);
    expect(spyObserver.next).toBeCalledWith([{ slices: [], price: 200 }]);
    expect(spyObserver.error).not.toBeCalled();

    expect(cache.set).not.toBeCalled();
    expect(cache.get).toBeCalledTimes(1);
    expect(cache.get).toBeCalledWith('testSourceId', []);
  });

  it('should return cached data when fetch is failed timeout', () => {
    cache.get.mockReturnValue([{ slices: [], price: 300 }]);
    const testSubject = new Subject<FlightRaw[]>();
    source.getFlights.mockReturnValue(testSubject);
    jest.useFakeTimers();
    sourceHandler.getFlights().subscribe(spyObserver);
    jest.advanceTimersByTime(750);
    testSubject.next([]);

    expect(spyObserver.next).toBeCalledTimes(1);
    expect(spyObserver.next).toBeCalledWith([{ slices: [], price: 300 }]);
    expect(spyObserver.error).not.toBeCalled();

    expect(cache.set).not.toBeCalled();
    expect(cache.get).toBeCalledTimes(1);
    expect(cache.get).toBeCalledWith('testSourceId', []);
  });
});
