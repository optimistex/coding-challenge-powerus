import { Test, TestingModule } from '@nestjs/testing';
import { FlightSourceBuilderService } from './flight-source-builder.service';

describe('FlightSourceBuilderService', () => {
  let service: FlightSourceBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightSourceBuilderService],
    }).compile();

    service = module.get<FlightSourceBuilderService>(FlightSourceBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
