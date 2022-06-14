import { Environment } from '../../environments/environment';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  const mockEnvironment = { cachingTime: 60 } as Partial<Environment> as Environment;
  let fakeNowMs: number;

  beforeEach(() => {
    fakeNowMs = Date.now();
    jest.spyOn(Date, 'now').mockImplementation(() => fakeNowMs);
  });

  it('Test sync', () => {
    const cache = new CacheService(mockEnvironment);

    expect(cache.get('wrongKey')).toBe(null);
    expect(cache.get('wrongKey', 55)).toBe(55);

    cache.set('test', 123);

    expect(cache.get('test')).toBe(123);
    expect(cache.get('test', 23)).toBe(123);

    fakeNowMs += 59999;
    expect(cache.get('test')).toBe(123);
    expect(cache.get('test', 23)).toBe(123);

    fakeNowMs += 60001;
    expect(cache.get('test')).toBe(null);
    expect(cache.get('test', 23)).toBe(23);
  });
});
