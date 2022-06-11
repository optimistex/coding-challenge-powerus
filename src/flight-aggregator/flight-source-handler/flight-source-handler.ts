import { catchError, map, Observable, of, tap, timeout } from 'rxjs';
import { FlightSource } from '../interface/flight-source.interface';
import { Flight } from '../interface/flight-data.interface';
import { FlightAggregatorCache } from '../interface/flight-aggregator-cache.interface';
import { calculateFlightId } from './calculate-flight-id';

export class FlightSourceHandler {
  constructor(private source: FlightSource, private cache: FlightAggregatorCache, private timeout: number, private cacheMaxAge) {}

  public getFlights(): Observable<Flight[]> {
    return this.source.getFlights().pipe(
      timeout(this.timeout),
      map((flightRawList) => flightRawList.map<Flight>((f) => ({ ...f, id: calculateFlightId(f) }))),
      tap((flightList) => this.cache.set(this.source.getId(), flightList, { maxAge: this.cacheMaxAge })),
      catchError(() => of(this.cache.get<Flight[]>(this.source.getId(), []))),
    );
  }
}
