import { Client } from "@googlemaps/google-maps-services-js";
import { AppError } from "../../../../errors/appError";

const googleMapsClient = new Client({});

export const geocodeAddress = async (address: string) => {
  const response = await googleMapsClient.geocode({
    params: {
      address,
      key: process.env.GOOGLE_MAPS_API_KEY || "",
    },
  });

  const coords = response.data.results[0]?.geometry.location;

  if (!coords) {
    throw new AppError(
      "INVALID_ADDRESS",
      "Não foi possível encontrar as coordenadas para o endereço fornecido.",
      404
    );
  }

  return coords;
};

export const getDirections = async (origin: string, destination: string) => {
  const response = await googleMapsClient.directions({
    params: {
      origin,
      destination,
      key: process.env.GOOGLE_MAPS_API_KEY || "",
    },
  });

  return response.data;
};
