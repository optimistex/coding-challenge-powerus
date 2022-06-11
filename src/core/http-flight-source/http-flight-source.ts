import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { FlightSource } from '../../flight-aggregator/interface/flight-source.interface';
import { Flight } from '../../flight-aggregator/interface/flight-data.interface';

export class HttpFlightSource implements FlightSource {
  constructor(private httpService: HttpService, private sourceUrl) {}

  public get(): Observable<Flight[]> {
    return this.httpService.get<{ flights: Flight[] }>(this.sourceUrl).pipe(map((response) => response.data.flights || []));
  }
}
