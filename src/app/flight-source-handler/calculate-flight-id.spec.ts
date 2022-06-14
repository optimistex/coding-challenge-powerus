import { calculateFlightId } from './calculate-flight-id';
import { FlightRaw } from '../interface/flight-data.interface';

const testFlight1: FlightRaw = {
  slices: [
    {
      origin_name: 'Schonefeld',
      destination_name: 'Stansted',
      departure_date_time_utc: '2019-08-08T04:30:00.000Z',
      arrival_date_time_utc: '2019-08-08T06:25:00.000Z',
      flight_number: '144',
      duration: 115,
    },
    {
      origin_name: 'Stansted',
      destination_name: 'Schonefeld',
      departure_date_time_utc: '2019-08-10T05:35:00.000Z',
      arrival_date_time_utc: '2019-08-10T07:35:00.000Z',
      flight_number: '8542',
      duration: 120,
    },
  ],
  price: 129,
};
const testFlight2: FlightRaw = {
  slices: [
    {
      origin_name: 'Schonefeld',
      destination_name: 'Stansted',
      departure_date_time_utc: '2019-08-08T20:25:00.000Z',
      arrival_date_time_utc: '2019-08-08T22:25:00.000Z',
      flight_number: '8545',
      duration: 120,
    },
    {
      origin_name: 'Stansted',
      destination_name: 'Schonefeld',
      departure_date_time_utc: '2019-08-10T06:50:00.000Z',
      arrival_date_time_utc: '2019-08-10T08:40:00.000Z',
      flight_number: '145',
      duration: 110,
    },
    {
      origin_name: 'Schonefeld',
      destination_name: 'Stansted',
      departure_date_time_utc: '2019-08-08T20:25:00.000Z',
      arrival_date_time_utc: '2019-08-08T22:25:00.000Z',
      flight_number: '8545',
      duration: 120,
    },
    {
      origin_name: 'Stansted',
      destination_name: 'Schonefeld',
      departure_date_time_utc: '2019-08-10T05:35:00.000Z',
      arrival_date_time_utc: '2019-08-10T07:35:00.000Z',
      flight_number: '8542',
      duration: 120,
    },
  ],
  price: 134.81,
};

describe('calculateFlightId', () => {
  it('should calculate simple', () => {
    expect(calculateFlightId(testFlight1)).toBe('380fa2dc0d9e3471608fd520ada7817aea0d12003cf120acb35ae42c55d16c36');
  });

  it('should calculate complex', () => {
    expect(calculateFlightId(testFlight2)).toBe('151b6183b39ef5bc266c752d6c796cc7a4984e5bc5790338488a9f7fb09dc79f');
  });
});
