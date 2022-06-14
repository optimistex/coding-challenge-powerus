// import { of, PartialObserver } from 'rxjs';
// import { Test, TestingModule } from '@nestjs/testing';
// import { FlightAggregatorModuleOptions } from '../flight-aggregator.module-options';
// import { FlightSourceHandler } from '../flight-source-handler/flight-source-handler';
// import { Flight } from '../interface/flight-data.interface';
// import { FlightAggregatorService } from './flight-aggregator.service';
//
// function mockFlightSourceHandler(value: Partial<Flight>[]): FlightSourceHandler {
//   return { getFlights: jest.fn().mockReturnValue(of(value)) } as Partial<FlightSourceHandler> as FlightSourceHandler;
// }
//
// describe('FlightAggregatorService', () => {
//   let service: FlightAggregatorService;
//   let mockOptions: FlightAggregatorModuleOptions;
//   let spyObserver: jest.Mocked<PartialObserver<unknown>>;
//
//   beforeEach(async () => {
//     mockOptions = { flightSources: [] };
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [FlightAggregatorService],
//     }).compile();
//
//     service = module.get<FlightAggregatorService>(FlightAggregatorService);
//     spyObserver = { next: jest.fn(), error: jest.fn() };
//   });
//
//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
//
//   it('should merge data', () => {
//     mockOptions.flightSources = [
//       mockFlightSourceHandler([{ id: 'flight1' }, { id: 'flight2' }]),
//       mockFlightSourceHandler([{ id: 'flight3' }, { id: 'flight4' }]),
//     ];
//     service.getFlights().subscribe(spyObserver);
//
//     expect(spyObserver.next).toBeCalledTimes(1);
//     expect(spyObserver.next).toBeCalledWith([{ id: 'flight1' }, { id: 'flight2' }, { id: 'flight3' }, { id: 'flight4' }]);
//     expect(spyObserver.error).not.toBeCalled();
//   });
//
//   it('should remove duplicates', () => {
//     mockOptions.flightSources = [
//       mockFlightSourceHandler([{ id: 'flight1' }, { id: 'flight2' }, { id: 'flight3' }]),
//       mockFlightSourceHandler([{ id: 'flight3' }, { id: 'flight2' }, { id: 'flight4' }]),
//     ];
//     service.getFlights().subscribe(spyObserver);
//
//     expect(spyObserver.next).toBeCalledTimes(1);
//     expect(spyObserver.next).toBeCalledWith([{ id: 'flight1' }, { id: 'flight2' }, { id: 'flight3' }, { id: 'flight4' }]);
//     expect(spyObserver.error).not.toBeCalled();
//   });
// });
