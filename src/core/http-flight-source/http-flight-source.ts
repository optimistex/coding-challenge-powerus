import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { FlightSource } from '../../flight-aggregator/interface/flight-source.interface';
import { FlightRaw } from '../../flight-aggregator/interface/flight-data.interface';

export class HttpFlightSource implements FlightSource {
  constructor(private httpService: HttpService, private sourceUrl) {}

  public getId(): string {
    return this.sourceUrl;
  }

  public getFlights(): Observable<FlightRaw[]> {
    return this.httpService.get<{ flights: FlightRaw[] }>(this.sourceUrl).pipe(map((response) => response.data.flights || []));
  }
}
