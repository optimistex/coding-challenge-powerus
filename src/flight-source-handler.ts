import { FlightSource } from './flight-source.interface';
import { Observable } from 'rxjs';
import { Flight } from './flight-data.interface';

export class FlightSourceHandler {
  constructor(
    private source: FlightSource,
    private cache: Cache,
    private timeout: number,
  ) {}

  public get(): Observable<Flight[]> {
    return this.source.get();
  }
}
