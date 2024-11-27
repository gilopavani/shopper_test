interface Driver {
  id: number;
  name: string;
}

interface Ride {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: Driver;
  value: number;
}

export interface HistoryModel {
  customer_id: string;
  rides: Ride[];
}

export interface FilterHistoryModel {
  customer_id: string;
  driver_id?: string | null;
}
