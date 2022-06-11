import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, tap } from 'rxjs';
import { FlightData } from './flight-aggregator/interface/flight-data.interface';
import { FlightAggregatorService } from './flight-aggregator/flight-aggregator/flight-aggregator.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private httpService: HttpService, private flightAggregatorService: FlightAggregatorService) {}

  @Get()
  getHello(): Promise<FlightData> {
    this.flightAggregatorService.getFlights();

    const data$ = this.httpService.get<FlightData>('https://coding-challenge.powerus.de/flight/source1').pipe(
      map((v) => v.data),
      tap((v) => console.log('+++', v)),
    );
    return lastValueFrom(data$);
  }
}
