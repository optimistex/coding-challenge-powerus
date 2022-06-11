import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FlightSourceHandler } from '../../flight-aggregator/flight-source-handler/flight-source-handler';
import { CacheMemoryService } from '../cache-memory/cache-memory.service';
import { HttpFlightSource } from '../http-flight-source/http-flight-source';

@Injectable()
export class FlightSourceBuilderService {
  private readonly timeout = 800;
  private readonly urlList = ['https://coding-challenge.powerus.de/flight/source1', 'https://coding-challenge.powerus.de/flight/source2'];

  constructor(private httpService: HttpService, private cacheMemoryService: CacheMemoryService) {}

  public getSourceList(): FlightSourceHandler[] {
    return this.urlList
      .map((url) => new HttpFlightSource(this.httpService, url))
      .map((source) => new FlightSourceHandler(source, this.cacheMemoryService, this.timeout));
  }
}
