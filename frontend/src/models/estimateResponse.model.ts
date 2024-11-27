import { GeocodedWaypoint, RouteResponse } from "./geocode.model";

interface Review {
  rating: number;
  comment: string;
}

export interface Option {
  id: number;
  name: string;
  description: string;
  car: string;
  tax: number;
  min_km: number;
  value: number;
  Review: Review[];
}

interface Location {
  latitude: number;
  longitude: number;
}

export interface DirectionsResponse {
  origin: Location;
  destination: Location;
  distance: number;
  duration: string;
  options: Option[];
  routeResponse: RouteResponse;
}

export interface GetEstimateUseCaseModel {
  customer_id: string;
  origin: string;
  destination: string;
}
