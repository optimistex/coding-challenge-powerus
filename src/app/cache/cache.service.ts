import * as NodeCache from 'node-cache';
import { Inject, Injectable } from '@nestjs/common';
import { APP_ENVIRONMENT, Environment } from '../../environments/environment';

@Injectable()
export class CacheService {
  private readonly cache: NodeCache;

  constructor(@Inject(APP_ENVIRONMENT) private environment: Environment) {
    this.cache = new NodeCache({ errorOnMissing: true });
  }

  public get<T>(key: string, defaultValue: T = null): T {
    if (this.cache.has(key)) {
      return this.cache.get<T>(key);
    }
    return defaultValue;
  }

  public set<T>(key: string, value: T): void {
    this.cache.set(key, value, this.environment.cachingTime);
  }
}
