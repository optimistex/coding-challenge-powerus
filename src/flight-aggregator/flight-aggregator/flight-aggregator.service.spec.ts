import { Test, TestingModule } from '@nestjs/testing';
import { FlightAggregatorService } from './flight-aggregator.service';

describe('FlightAggregatorService', () => {
  let service: FlightAggregatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightAggregatorService],
    }).compile();

    service = module.get<FlightAggregatorService>(FlightAggregatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
