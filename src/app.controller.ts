import { Controller, Get } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Flight } from './flight-aggregator/interface/flight-data.interface';
import { FlightAggregatorService } from './flight-aggregator/flight-aggregator/flight-aggregator.service';

@Controller()
export class AppController {
  constructor(private flightAggregatorService: FlightAggregatorService) {}

  @Get()
  getHello(): Promise<Flight[][]> {
    const data2$ = this.flightAggregatorService.getFlights();
    return lastValueFrom(data2$);
  }
}
