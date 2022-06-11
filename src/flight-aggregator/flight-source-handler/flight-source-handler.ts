import { catchError, Observable, of, tap, timeout } from 'rxjs';
import { FlightSource } from '../interface/flight-source.interface';
import { FlightRaw } from '../interface/flight-data.interface';
import { FlightAggregatorCache } from '../interface/flight-aggregator-cache.interface';

export class FlightSourceHandler {
  constructor(private source: FlightSource, private cache: FlightAggregatorCache, private timeout: number, private cacheMaxAge) {}

  public getFlights(): Observable<FlightRaw[]> {
    return this.source.getFlights().pipe(
      timeout(this.timeout),
      tap((data) => this.cache.set(this.source.getId(), data, { maxAge: this.cacheMaxAge })),
      catchError(() => of(this.cache.get<FlightRaw[]>(this.source.getId(), []))),
    );
  }
}
