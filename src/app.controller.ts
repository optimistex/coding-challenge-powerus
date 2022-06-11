import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, tap } from 'rxjs';
import { FlightData } from './flight-data.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private httpService: HttpService,
  ) {}

  @Get()
  getHello(): Promise<FlightData> {
    const data$ = this.httpService
      .get<FlightData>(
        'https://coding-challenge.powerus.de/flight/source1',
      )
      .pipe(
        map((v) => v.data),
        tap((v) => console.log('+++', v)),
      );
    return lastValueFrom(data$);
  }
}
