import { Observable } from 'rxjs';
import { Flight } from './flight-data.interface';

export interface FlightSource {
  getId(): string;
  getFlights(): Observable<Flight[]>;
}
