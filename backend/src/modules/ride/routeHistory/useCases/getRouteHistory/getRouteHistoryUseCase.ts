import {
  RouteHistory,
  Ride,
} from "./../../../../../interfaces/routeHistory.model";
import { prisma } from "../../../../../prisma/client";
import { AppError } from "../../../../../errors/appError";

export class GetRouteHistoryUseCase {
  async execute({
    customerId,
    driverId,
  }: {
    customerId: string;
    driverId?: number;
  }): Promise<RouteHistory> {
    if (!customerId) {
      throw new AppError("INVALID_DATA", "Id do cliente não informado", 400);
    }

    const where: {
      where: {
        customerId: string;
        driverId?: number;
      };
    } = {
      where: {
        customerId,
      },
    };

    if (driverId) {
      const driver = await prisma.driver.findUnique({
        where: {
          id: driverId,
        },
      });
      if (!driver) {
        throw new AppError("INVALID_DRIVER", "Motorista invalido", 400);
      }
      where.where.driverId = driverId;
    }

    const routeHistory = await prisma.raceApprovalPoints.findMany({
      ...where,
      include: {
        driver: true,
      },
    });

    if (!routeHistory || routeHistory.length === 0) {
      throw new AppError("NO_RIDES_FOUND", "Nenhum registro encontrado", 404);
    }

    const rides: Ride[] = routeHistory.map((ride) => {
      return {
        id: ride.id,
        date: ride.createdAt,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: ride.driver.id,
          name: ride.driver.name,
        },
        value: ride.price,
      };
    });

    const routeHistoryResponse: RouteHistory = {
      customer_id: customerId,
      rides,
    };

    return routeHistoryResponse;
  }
}
