export interface CustomCacheOptions {
  /**
   * Tag for this key
   */
  tags?: string[];
  /**
   * Max age in seconds
   */
  maxAge: number;
}

export interface CustomCache {
  /**
   * Make cache key as a hash from any data
   */
  cacheKey(data: object): string;

  /**
   * Get data by a key
   */
  get<T>(key: string, defaultValue?: T): T;

  /**
   * Get cache and return in a promise. If values has not found returns default promise and cache it.
   */
  getAsync<T>(key: string, options: CustomCacheOptions, defaultValueCallback: () => Promise<T>): Promise<T>;

  /**
   * Set cache for maxAge seconds
   */
  set<T>(key: string, value: T, options: CustomCacheOptions): void;

  /**
   * Remove all data by a tag
   */
  clearCache(tags: string[]): void;
}
