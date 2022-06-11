import { map, Observable, zip } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { FLIGHT_AGGREGATOR_MODULE_OPTIONS, FlightAggregatorModuleOptions } from '../flight-aggregator.module-options';
import { Flight } from '../interface/flight-data.interface';

@Injectable()
export class FlightAggregatorService {
  constructor(@Inject(FLIGHT_AGGREGATOR_MODULE_OPTIONS) private options: FlightAggregatorModuleOptions) {}

  public getFlights(): Observable<Flight[]> {
    return zip(this.options.flightSources.map((s) => s.getFlights())).pipe(
      map((data) => {
        const hashList: Record<string, boolean> = {};
        return [].concat(...data).filter((flight) => (hashList[flight.id] ? false : (hashList[flight.id] = true)));
      }),
    );
  }
}
