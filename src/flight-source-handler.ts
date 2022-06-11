import { FlightSource } from './flight-source.interface';
import { Observable } from 'rxjs';
import { Flight } from './flight-data.interface';
import { CustomCache } from './cache/custom-cache';

export class FlightSourceHandler {
  constructor(
    private source: FlightSource,
    private cache: CustomCache,
    private timeout: number,
  ) {}

  public get(): Observable<Flight[]> {
    return this.source.get();
  }
}
