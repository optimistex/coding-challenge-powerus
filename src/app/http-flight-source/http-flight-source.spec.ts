import { Test, TestingModule } from '@nestjs/testing';
import { HttpFlightSource } from './http-flight-source';

describe('HttpFlightSource', () => {
  let service: HttpFlightSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpFlightSource],
    }).compile();

    service = module.get<HttpFlightSource>(HttpFlightSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
