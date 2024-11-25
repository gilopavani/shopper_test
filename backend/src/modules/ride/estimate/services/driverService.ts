import { prisma } from "../../../../prisma/client";
import { Option } from "../../../../interfaces/estimate.model";

export class DriverService {
  async getDrivers(distance: number): Promise<Option[]> {
    const drivers = await prisma.driver.findMany({
      include: {
        Review: {
          select: {
            rating: true,
            comment: true,
          },
        },
      },
      where: {
        min_km: {
          lte: distance,
        },
      },
    });

    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      car: driver.car,
      tax: driver.tax,
      min_km: driver.min_km,
      value: parseFloat((driver.tax * distance).toFixed(2)),
      Review: driver.Review,
    }));
  }
}
