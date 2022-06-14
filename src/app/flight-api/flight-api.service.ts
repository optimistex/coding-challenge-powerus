import { HttpService } from '@nestjs/axios';
import { catchError, map, Observable, of, tap, timeout } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { APP_ENVIRONMENT, Environment } from '../../environments/environment';
import { Flight, FlightRaw } from '../flight-data.interface';
import { CacheService } from '../cache/cache.service';
import { calculateFlightId } from './calculate-flight-id';

@Injectable()
export class FlightApiService {
  constructor(private httpService: HttpService, private cacheService: CacheService, @Inject(APP_ENVIRONMENT) private environment: Environment) {}

  public getFlights(sourceUrl: string): Observable<Flight[]> {
    return this.httpService.get<{ flights: FlightRaw[] }>(sourceUrl).pipe(
      timeout(this.environment.timeout),
      map((response) => response.data.flights.map<Flight>((f) => ({ ...f, id: calculateFlightId(f) }))),
      tap((flightList) => this.cacheService.set(sourceUrl, flightList)),
      catchError(() => of(this.cacheService.get<Flight[]>(sourceUrl, []))),
    );
  }
}
