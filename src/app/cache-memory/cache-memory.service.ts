import * as NodeCache from 'node-cache';
import * as hash from 'object-hash';
import { CustomCache, CustomCacheOptions } from './custom-cache';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheMemoryService implements CustomCache {
  private readonly cache: NodeCache;
  private tags: { [name: string]: string[] } = {};

  constructor() {
    this.cache = new NodeCache({ errorOnMissing: true });
  }

  public cacheKey(data: object): string {
    return hash(data);
  }

  public get<T>(key: string, defaultValue: T = null): T {
    if (this.cache.has(key)) {
      return this.cache.get<T>(key);
    }
    return defaultValue;
  }

  public getAsync<T>(key: string, options: CustomCacheOptions, defaultValueCallback: () => Promise<T>): Promise<T> {
    if (this.cache.has(key)) {
      return Promise.resolve(this.cache.get<T>(key));
    }

    return defaultValueCallback().then((value) => {
      this.set(key, value, options);
      return value;
    });
  }

  public set<T>(key: string, value: T, options: CustomCacheOptions): void {
    const result = this.cache.set(key, value, options.maxAge);
    if (result && options.tags) {
      this.addTagsToKey(key, options.tags);
    }
  }

  public clearCache(tags: string[]): void {
    tags.forEach((tag: string) => {
      if (Array.isArray(this.tags[tag])) {
        this.cache.del(this.tags[tag]);
        delete this.tags[tag];
      }
    });
  }

  private addTagsToKey(key: string, tags: string[]): void {
    tags.forEach((tag) => {
      if (Array.isArray(this.tags[tag])) {
        if (this.tags[tag].indexOf(key) === -1) {
          this.tags[tag].push(key);
        }
      } else {
        this.tags[tag] = [key];
      }
    });
  }
}
