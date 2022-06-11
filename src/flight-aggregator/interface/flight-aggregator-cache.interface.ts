export interface CustomCacheOptions {
  /** Max age in seconds */
  maxAge: number;
}

export interface FlightAggregatorCache {
  /**
   * Get data by a key
   */
  get<T>(key: string, defaultValue?: T): T;

  /**
   * Set cache for maxAge seconds
   */
  set<T>(key: string, value: T, options: CustomCacheOptions): void;
}
