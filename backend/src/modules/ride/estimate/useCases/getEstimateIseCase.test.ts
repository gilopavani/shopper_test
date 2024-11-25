import { GetEstimateUseCase } from "./getEstimateUseCase";
import { AppError } from "../../../../errors/appError";
import { geocodeAddress, getDirections } from "../services/googleMapsService";
import { DriverService } from "../services/driverService";
import { validateEstimateData } from "../validations/estimateValidation";

jest.mock("../services/googleMapsService");
jest.mock("../services/driverService");
jest.mock("../validations/estimateValidation");

describe("GetEstimateUseCase", () => {
  let getEstimateUseCase: GetEstimateUseCase;

  beforeEach(() => {
    getEstimateUseCase = new GetEstimateUseCase();
  });

  it("Deve retornar uma estimativa de rota", async () => {
    const mockOriginCoords = { lat: 10, lng: 20 };
    const mockDestinationCoords = { lat: 30, lng: 40 };
    const mockDirectionsResponse = {
      routes: [
        {
          legs: [
            {
              distance: { value: 10000 },
              duration: { text: "10 mins" },
            },
          ],
        },
      ],
    };
    const mockDrivers = [{ id: 1, name: "Driver 1" }];

    (geocodeAddress as jest.Mock).mockResolvedValueOnce(mockOriginCoords);
    (geocodeAddress as jest.Mock).mockResolvedValueOnce(mockDestinationCoords);
    (getDirections as jest.Mock).mockResolvedValue(mockDirectionsResponse);
    (DriverService.prototype.getDrivers as jest.Mock).mockResolvedValue(
      mockDrivers
    );

    const response = await getEstimateUseCase.execute({
      customer_id: "123",
      origin: "Rua da Paz, 45, Centro, São João Del Rei, MG",
      destination:
        "Avenida Presidente Vargas, 120, Tijuco, São João Del Rei, MG",
    });

    expect(response).toEqual({
      origin: {
        latitude: mockOriginCoords.lat,
        longitude: mockOriginCoords.lng,
      },
      destination: {
        latitude: mockDestinationCoords.lat,
        longitude: mockDestinationCoords.lng,
      },
      distance: 10,
      duration: "10 mins",
      options: mockDrivers,
      routeResponse: mockDirectionsResponse,
    });
  });

  it("Deve lançar um erro se os dados de entrada forem inválidos", async () => {
    (geocodeAddress as jest.Mock).mockResolvedValueOnce(null);
    (geocodeAddress as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      getEstimateUseCase.execute({
        customer_id: "123",
        origin: "Invalid Origin",
        destination: "Invalid Destination",
      })
    ).rejects.toThrow(AppError);
  });

  it("Deve lançar um erro se a rota não for encontrada", async () => {
    const mockOriginCoords = { lat: 10, lng: 20 };
    const mockDestinationCoords = { lat: 30, lng: 40 };
    const mockDirectionsResponse = { routes: [] };

    (geocodeAddress as jest.Mock).mockResolvedValueOnce(mockOriginCoords);
    (geocodeAddress as jest.Mock).mockResolvedValueOnce(mockDestinationCoords);
    (getDirections as jest.Mock).mockResolvedValue(mockDirectionsResponse);

    await expect(
      getEstimateUseCase.execute({
        customer_id: "123",
        origin: "Origin Address",
        destination: "Destination Address",
      })
    ).rejects.toThrow(AppError);
  });

  it("Deve lançar um erro se não encontrar motoristas disponíveis", async () => {
    (geocodeAddress as jest.Mock).mockRejectedValue(
      new Error("Google Maps API Error")
    );

    await expect(
      getEstimateUseCase.execute({
        origin: "Estr. Lobato/Campinas, 163 - Boa Vista do Lobato",
        destination: "Estr. Lobato/Campinas, 80 - Mal. Rondon",
        customer_id: "1",
      })
    ).rejects.toThrow(AppError);
  });
});
