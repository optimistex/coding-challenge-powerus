import { Observable } from 'rxjs';
import { FlightRaw } from './flight-data.interface';

export interface FlightSource {
  getId(): string;
  getFlights(): Observable<FlightRaw[]>;
}
