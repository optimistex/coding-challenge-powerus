interface FlightSlice {
  origin_name: string;
  destination_name: string;
  departure_date_time_utc: string;
  arrival_date_time_utc: string;
  flight_number: string;
  duration: number;
}

interface Flight {
  slices: FlightSlice[];
  price: number;
}

export interface FlightSourceData {
  flights: Flight[];
}
