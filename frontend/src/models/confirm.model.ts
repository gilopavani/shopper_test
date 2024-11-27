// "customer_id": "1",
// "origin": "Estr. Lobato/Campinas, 163 - Boa Vista do Lobato",
// "destination": "Estr. Lobato/Campinas, 80 - Mal. Rondon",
// "distance": 1,
// "duration": "22",
// "driver": {
//     "id": 1,
//     "name": "Jamilton"
// },
// "value": 1

export interface RaceApprovalPointsModel {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
  driver: {
    id: number;
    name: string;
  };
}

export interface ContructedRaceApprovalPointsModel {
  customer_id: string;
  origin: string;
  destination: string;
}
