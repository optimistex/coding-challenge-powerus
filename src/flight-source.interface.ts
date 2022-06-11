import { Observable } from 'rxjs';
import { Flight } from './flight-data.interface';

export interface FlightSource {
  get(): Observable<Flight[]>;
}
