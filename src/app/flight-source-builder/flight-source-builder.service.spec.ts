// import { HttpService } from '@nestjs/axios';
// import { Test, TestingModule } from '@nestjs/testing';
// import { Provider } from '@nestjs/common';
// import { CORE_MODULE_OPTIONS, CoreModuleOptions } from '../core.module-options';
// import { CacheMemoryService } from '../cache-memory/cache-memory.service';
// import { FlightSourceBuilderService } from './flight-source-builder.service';
//
// describe('FlightSourceBuilderService', () => {
//   const mockOptionsProvider: Provider<CoreModuleOptions> = {
//     provide: CORE_MODULE_OPTIONS,
//     useValue: { cachingTime: 2000, timeout: 1500, httpSourceUrls: ['https://test.src/1', 'https://test.src/1'] },
//   };
//   const mockHttpService: Provider<Partial<HttpService>> = { provide: HttpService, useValue: {} };
//   const mockCacheMemoryService: Provider<Partial<CacheMemoryService>> = { provide: CacheMemoryService, useValue: {} };
//   let service: FlightSourceBuilderService;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [FlightSourceBuilderService, mockOptionsProvider, mockHttpService, mockCacheMemoryService],
//     }).compile();
//
//     service = module.get<FlightSourceBuilderService>(FlightSourceBuilderService);
//   });
//
//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
