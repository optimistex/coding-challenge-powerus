import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { FlightSourceHandler } from '../../flight-aggregator/flight-source-handler/flight-source-handler';
import { CacheMemoryService } from '../cache-memory/cache-memory.service';
import { HttpFlightSource } from '../http-flight-source/http-flight-source';
import { CORE_MODULE_OPTIONS, CoreModuleOptions } from '../core.module-options';

@Injectable()
export class FlightSourceBuilderService {
  constructor(
    @Inject(CORE_MODULE_OPTIONS) private options: CoreModuleOptions,
    private httpService: HttpService,
    private cacheMemoryService: CacheMemoryService,
  ) {}

  public getSourceList(): FlightSourceHandler[] {
    return this.options.httpSourceUrls
      .map((url) => new HttpFlightSource(this.httpService, url))
      .map((source) => new FlightSourceHandler(source, this.cacheMemoryService, this.options.timeout, this.options.cachingTime));
  }
}
