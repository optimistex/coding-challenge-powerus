import { map, Observable, zip } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { APP_ENVIRONMENT, Environment } from '../../environments/environment';
import { Flight } from '../flight-data.interface';
import { FlightApiService } from '../flight-api/flight-api.service';

@Injectable()
export class FlightAggregatorService {
  constructor(private flightApiService: FlightApiService, @Inject(APP_ENVIRONMENT) private environment: Environment) {}

  public getAggregatedFlights(): Observable<Flight[]> {
    return zip(this.environment.httpSourceUrls.map((url) => this.flightApiService.getFlights(url))).pipe(
      map((data) => {
        const hashList: Record<string, boolean> = {};
        return [].concat(...data).filter((flight) => (hashList[flight.id] ? false : (hashList[flight.id] = true)));
      }),
    );
  }
}
