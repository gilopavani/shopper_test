export interface GeocodedWaypoint {
  geocoder_status: string;
  place_id: string;
  types: string[];
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Bounds {
  northeast: LatLng;
  southwest: LatLng;
}

export interface Distance {
  text: string;
  value: number;
}

export interface Duration {
  text: string;
  value: number;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Polyline {
  points: string;
}

export interface Step {
  distance: Distance;
  duration: Duration;
  end_location: Location;
  html_instructions: string;
  polyline: Polyline;
  start_location: Location;
  travel_mode: string;
  maneuver?: string;
}

export interface Leg {
  distance: Distance;
  duration: Duration;
  end_address: string;
  end_location: Location;
  start_address: string;
  start_location: Location;
  steps: Step[];
  traffic_speed_entry: any[];
  via_waypoint: any[];
}

export interface Route {
  bounds: Bounds;
  copyrights: string;
  legs: Leg[];
  overview_polyline: Polyline;
  summary: string;
  warnings: any[];
  waypoint_order: any[];
}

export interface RouteResponse {
  geocoded_waypoints: GeocodedWaypoint[];
  routes: Route[];
  status: string;
}
