import { map, Observable, zip } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { Flight } from '../interface/flight-data.interface';
import { FlightSourceBuilderService } from '../flight-source-builder/flight-source-builder.service';
import { FlightSourceHandler } from '../flight-source-handler/flight-source-handler';

@Injectable()
export class FlightAggregatorService {
  private flightSources: FlightSourceHandler[];

  constructor(private flightSourceBuilderService: FlightSourceBuilderService) {
    this.flightSources = this.flightSourceBuilderService.getSourceList();
  }

  public getFlights(): Observable<Flight[]> {
    return zip(this.flightSources.map((s) => s.getFlights())).pipe(
      map((data) => {
        const hashList: Record<string, boolean> = {};
        return [].concat(...data).filter((flight) => (hashList[flight.id] ? false : (hashList[flight.id] = true)));
      }),
    );
  }
}
