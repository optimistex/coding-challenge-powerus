import { createHash } from 'crypto';
import { FlightRaw } from '../flight-data.interface';

export function calculateFlightId(flight: FlightRaw): string {
  const data = flight.slices.map((s) => s.flight_number + s.departure_date_time_utc + s.arrival_date_time_utc).join('');
  return createHash('sha256').update(data).digest('hex');
}
