import { zip } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { FLIGHT_AGGREGATOR_MODULE_OPTIONS, FlightAggregatorModuleOptions } from '../flight-aggregator.module-options';

@Injectable()
export class FlightAggregatorService {
  constructor(@Inject(FLIGHT_AGGREGATOR_MODULE_OPTIONS) private options: FlightAggregatorModuleOptions) {
    console.log('FlightAggregatorService', this.options);
  }

  public getFlights() {
    return zip(this.options.flightSources.map((s) => s.getFlights())).pipe();
  }
}
