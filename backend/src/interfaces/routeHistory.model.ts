export interface RouteHistory {
  customer_id: string;
  rides: Ride[];
}

export interface Ride {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: Driver;
  value: number;
}

interface Driver {
  id: number;
  name: string;
}
