import { AppError } from "../../../../errors/appError";
import {
  DirectionsResponse,
  GetEstimateUseCaseModel,
} from "../../../../interfaces/estimate.model";
import { validateEstimateData } from "../validations/estimateValidation";
import { DriverService } from "../services/driverService";
import { geocodeAddress, getDirections } from "../services/googleMapsService";

export class GetEstimateUseCase {
  async execute({
    customer_id,
    origin,
    destination,
  }: GetEstimateUseCaseModel): Promise<DirectionsResponse> {
    const driverService = new DriverService();

    validateEstimateData({ customer_id, origin, destination });

    try {
      const [originCoords, destinationCoords] = await Promise.all([
        geocodeAddress(origin),
        geocodeAddress(destination),
      ]);

      if (!originCoords || !destinationCoords) {
        throw new AppError(
          "INVALID_ADDRESS",
          "Não foi possível encontrar as coordenadas para os endereços fornecidos.",
          404
        );
      }

      const directionsResponse = await getDirections(
        `${originCoords.lat},${originCoords.lng}`,
        `${destinationCoords.lat},${destinationCoords.lng}`
      );

      const route = directionsResponse.routes[0];
      if (!route) {
        throw new AppError("ROUTE_NOT_FOUND", "Rota não encontrada", 404);
      }

      const leg = route.legs[0];

      const distance = leg.distance.value / 1000;

      const drivers = await driverService.getDrivers(distance);

      const response: DirectionsResponse = {
        origin: {
          latitude: originCoords.lat,
          longitude: originCoords.lng,
        },
        destination: {
          latitude: destinationCoords.lat,
          longitude: destinationCoords.lng,
        },
        distance: distance,
        duration: leg.duration.text,
        options: drivers,
        routeResponse: directionsResponse,
      };

      return response;
    } catch (error) {
      console.error(error);
      throw new AppError(
        "GOOGLE_MAPS_ERROR",
        "Erro ao acessar a API do Google Maps",
        500
      );
    }
  }
}
