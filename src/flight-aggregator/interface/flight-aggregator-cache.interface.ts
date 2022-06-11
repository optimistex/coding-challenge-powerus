export interface CustomCacheOptions {
  /** Max age in seconds */
  maxAge: number;
}

export interface FlightAggregatorCache {
  /**
   * Make cache key as a hash from any data
   */
  cacheKey(data: object): string;

  /**
   * Get data by a key
   */
  get<T>(key: string, defaultValue?: T): T;

  /**
   * Set cache for maxAge seconds
   */
  set<T>(key: string, value: T, options: CustomCacheOptions): void;

  /**
   * Remove all data by a tag
   */
  clearCache(tags: string[]): void;
}
