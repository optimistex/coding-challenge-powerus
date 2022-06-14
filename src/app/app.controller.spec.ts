import { of } from 'rxjs';
import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { FlightAggregatorService } from './flight-aggregator/flight-aggregator.service';
import { Flight } from './flight-data.interface';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const mockFlightAggregatorService: Provider<FlightAggregatorService> = {
      provide: FlightAggregatorService,
      useValue: {
        getAggregatedFlights: jest.fn().mockReturnValue(of<Partial<Flight>[]>([{ id: 'f1' }, { id: 'f2' }])),
      } as Partial<FlightAggregatorService> as FlightAggregatorService,
    };
    const app: TestingModule = await Test.createTestingModule({
      providers: [mockFlightAggregatorService],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('root', () => {
    it('should return flights', async () => {
      await expect(appController.getFlights()).resolves.toEqual([{ id: 'f1' }, { id: 'f2' }]);
    });
  });
});
