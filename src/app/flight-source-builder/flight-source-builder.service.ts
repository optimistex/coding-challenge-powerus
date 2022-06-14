import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FlightSourceHandler } from '../flight-source-handler/flight-source-handler';
import { CacheMemoryService } from '../cache-memory/cache-memory.service';
import { HttpFlightSource } from '../http-flight-source/http-flight-source';
import { environment } from '../../environments/environment';

@Injectable()
export class FlightSourceBuilderService {
  constructor(private httpService: HttpService, private cacheMemoryService: CacheMemoryService) {}

  public getSourceList(): FlightSourceHandler[] {
    return environment.httpSourceUrls
      .map((url) => new HttpFlightSource(this.httpService, url))
      .map((source) => new FlightSourceHandler(source, this.cacheMemoryService, environment.timeout, environment.cachingTime));
  }
}
