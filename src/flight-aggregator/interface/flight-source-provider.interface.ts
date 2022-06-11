import { FlightSourceHandler } from '../flight-source-handler/flight-source-handler';

export interface FlightSourceProvider {
  getSourceList(): FlightSourceHandler[];
}
