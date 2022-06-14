import { Test, TestingModule } from '@nestjs/testing';
import { FlightApiService } from './flight-api.service';

describe('FlightApiService', () => {
  let service: FlightApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightApiService],
    }).compile();

    service = module.get<FlightApiService>(FlightApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
