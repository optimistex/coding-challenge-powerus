import { CacheMemoryService } from './cache-memory.service';

describe('CacheMemoryService', () => {
  let fakeNowMs: number;

  beforeEach(() => {
    fakeNowMs = Date.now();
    jest.spyOn(Date, 'now').mockImplementation(() => fakeNowMs);
  });

  it('Test sync', () => {
    const cache = new CacheMemoryService();

    expect(cache.get('wrongKey')).toBe(null);
    expect(cache.get('wrongKey', 55)).toBe(55);

    cache.set('test', 123, { maxAge: 60 });

    expect(cache.get('test')).toBe(123);
    expect(cache.get('test', 23)).toBe(123);

    fakeNowMs += 59999;
    expect(cache.get('test')).toBe(123);
    expect(cache.get('test', 23)).toBe(123);

    fakeNowMs += 60001;
    expect(cache.get('test')).toBe(null);
    expect(cache.get('test', 23)).toBe(23);
  });

  it('Test async', async () => {
    const cache = new CacheMemoryService();

    const mockCallback1 = jest.fn(() => Promise.resolve(10));
    const mockCallback2 = jest.fn(() => Promise.resolve(20));

    expect(mockCallback1.mock.calls.length).toBe(0);
    expect(mockCallback2.mock.calls.length).toBe(0);

    await cache.getAsync('test', { maxAge: 10 }, mockCallback1).then((value) => expect(value).toBe(10));

    fakeNowMs += 5000;
    await expect(cache.getAsync('test', { maxAge: 10 }, mockCallback2)).resolves.toBe(10);

    fakeNowMs += 10000;
    await expect(cache.getAsync('test', { maxAge: 10 }, mockCallback2)).resolves.toBe(20);

    expect(mockCallback1.mock.calls.length).toBe(1);
    expect(mockCallback2.mock.calls.length).toBe(1);
  });

  it('Test clearing single tag', async () => {
    const cache = new CacheMemoryService();

    cache.set('test1', 111, { maxAge: 100, tags: ['tag1'] });
    cache.set('test2', 222, { maxAge: 100, tags: ['tag1'] });
    cache.set('test3', 333, { maxAge: 100, tags: ['tag2'] });
    cache.set('test4', 444, { maxAge: 100, tags: ['tag1', 'tag2'] });
    cache.set('test5', 555, { maxAge: 100, tags: ['tag2', 'tag3'] });

    expect(cache.get('test1')).toBe(111);
    expect(cache.get('test2')).toBe(222);
    expect(cache.get('test3')).toBe(333);
    expect(cache.get('test4')).toBe(444);
    expect(cache.get('test5')).toBe(555);

    fakeNowMs += 20000;
    expect(cache.get('test1')).toBe(111);
    expect(cache.get('test2')).toBe(222);
    expect(cache.get('test3')).toBe(333);
    expect(cache.get('test4')).toBe(444);
    expect(cache.get('test5')).toBe(555);
    cache.clearCache(['tag1']);
    expect(cache.get('test1')).toBe(null);
    expect(cache.get('test2')).toBe(null);
    expect(cache.get('test3')).toBe(333);
    expect(cache.get('test4')).toBe(null);
    expect(cache.get('test5')).toBe(555);

    fakeNowMs += 30000;
    expect(cache.get('test1')).toBe(null);
    expect(cache.get('test2')).toBe(null);
    expect(cache.get('test3')).toBe(333);
    expect(cache.get('test4')).toBe(null);
    expect(cache.get('test5')).toBe(555);

    fakeNowMs += 100000;
    expect(cache.get('test1')).toBe(null);
    expect(cache.get('test2')).toBe(null);
    expect(cache.get('test3')).toBe(null);
    expect(cache.get('test4')).toBe(null);
    expect(cache.get('test5')).toBe(null);
  });

  it('Test clearing multi tags', async () => {
    const cache = new CacheMemoryService();

    cache.set('test1', 111, { maxAge: 10, tags: ['tag1'] });
    cache.set('test2', 222, { maxAge: 10, tags: ['tag1'] });
    cache.set('test3', 333, { maxAge: 10, tags: ['tag2'] });
    cache.set('test4', 444, { maxAge: 10, tags: ['tag1', 'tag2', 'tag4'] });
    cache.set('test5', 555, { maxAge: 10, tags: ['tag2', 'tag3', 'tag4'] });

    expect(cache.get('test1')).toBe(111);
    expect(cache.get('test2')).toBe(222);
    expect(cache.get('test3')).toBe(333);
    expect(cache.get('test4')).toBe(444);
    expect(cache.get('test5')).toBe(555);

    fakeNowMs += 2000;
    expect(cache.get('test1')).toBe(111);
    expect(cache.get('test2')).toBe(222);
    expect(cache.get('test3')).toBe(333);
    expect(cache.get('test4')).toBe(444);
    expect(cache.get('test5')).toBe(555);
    cache.clearCache(['tag1', 'tag3']);
    expect(cache.get('test1')).toBe(null);
    expect(cache.get('test2')).toBe(null);
    expect(cache.get('test3')).toBe(333);
    expect(cache.get('test4')).toBe(null);
    expect(cache.get('test5')).toBe(null);

    fakeNowMs += 3000;
    expect(cache.get('test1')).toBe(null);
    expect(cache.get('test2')).toBe(null);
    expect(cache.get('test3')).toBe(333);
    expect(cache.get('test4')).toBe(null);
    expect(cache.get('test5')).toBe(null);

    fakeNowMs += 10000;
    expect(cache.get('test1')).toBe(null);
    expect(cache.get('test2')).toBe(null);
    expect(cache.get('test3')).toBe(null);
    expect(cache.get('test4')).toBe(null);
    expect(cache.get('test5')).toBe(null);
  });

  it('Test cacheKey with an object', () => {
    const cache = new CacheMemoryService();

    const key = cache.cacheKey({ a: '1', b: '2', c: '3' });
    expect(key).toBeTruthy();
    expect(cache.cacheKey({ a: '1', b: '2', c: '3' })).toBe(key);
    expect(cache.cacheKey({ a: '1', c: '3', b: '2' })).toBe(key);
    expect(cache.cacheKey({ c: '3', a: '1', b: '2' })).toBe(key);
  });

  it('Test cacheKey with a nested object', () => {
    const cache = new CacheMemoryService();

    const key = cache.cacheKey({ a: '1', b: '2', c: { c1: '1', c2: '2' } });
    expect(key).toBeTruthy();
    expect(cache.cacheKey({ a: '1', b: '2', c: { c1: '1', c2: '2' } })).toBe(key);
    expect(cache.cacheKey({ a: '1', b: '2', c: { c2: '2', c1: '1' } })).toBe(key);
    expect(cache.cacheKey({ a: '1', b: '2', c: { c1: '1', c2: '3' } })).not.toBe(key);
  });

  it('Test cacheKey with an array', () => {
    const cache = new CacheMemoryService();

    const key = cache.cacheKey(['testValue', { a: '1', b: '2', c: '3' }]);
    expect(key).toBeTruthy();
    expect(cache.cacheKey(['testValue', { a: '1', b: '2', c: '3' }])).toBe(key);
    expect(cache.cacheKey(['testValue', { a: '1', c: '3', b: '2' }])).toBe(key);
    expect(cache.cacheKey(['testValue', { c: '3', a: '1', b: '2' }])).toBe(key);
  });
});
