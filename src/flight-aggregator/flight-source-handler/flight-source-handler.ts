import { Observable } from 'rxjs';
import { FlightSource } from '../interface/flight-source.interface';
import { Flight } from '../interface/flight-data.interface';
import { FlightAggregatorCache } from '../interface/flight-aggregator-cache.interface';

export class FlightSourceHandler {
  constructor(private source: FlightSource, private cache: FlightAggregatorCache, private timeout: number) {}

  public get(): Observable<Flight[]> {
    return this.source.get();
  }
}
