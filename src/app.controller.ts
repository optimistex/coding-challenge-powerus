import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, tap } from 'rxjs';
import { FlightSourceData } from './source-data.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private httpService: HttpService,
  ) {}

  @Get()
  getHello(): Promise<FlightSourceData> {
    const data$ = this.httpService
      .get<FlightSourceData>(
        'https://coding-challenge.powerus.de/flight/source1',
      )
      .pipe(
        map((v) => v.data),
        tap((v) => console.log('+++', v)),
      );
    return lastValueFrom(data$);
  }
}
