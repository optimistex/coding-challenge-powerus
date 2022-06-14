import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { FlightRaw } from '../interface/flight-data.interface';

export class HttpFlightSource {
  constructor(private httpService: HttpService, private sourceUrl) {}

  public getId(): string {
    return this.sourceUrl;
  }

  public getFlights(): Observable<FlightRaw[]> {
    return this.httpService.get<{ flights: FlightRaw[] }>(this.sourceUrl).pipe(map((response) => response.data.flights || []));
  }
}
