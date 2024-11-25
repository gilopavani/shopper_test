import { AppError } from "../../../../errors/appError";
import { validateConfirmRaceApprovalPoints } from "../validations/confirmValidations";
import { CreateRaceApprovalPointsDTO } from "../DTOs/createRaceApprovalPointsDTO";
import { prisma } from "../../../../prisma/client";

export class SetConfirmUseCase {
  async execute({
    customerId,
    origin,
    destination,
    distance,
    duration,
    price,
    driverId,
  }: CreateRaceApprovalPointsDTO): Promise<{ success: boolean }> {
    try {
      const driver = await prisma.driver.findUnique({
        where: {
          id: driverId,
        },
      });
      if (!driver) {
        throw new AppError("DRIVER_NOT_FOUND", "Motorista não encontrado", 404);
      }

      validateConfirmRaceApprovalPoints({
        customer_id: customerId,
        origin,
        destination,
        distance,
        driver_min_distance: driver.min_km,
      });

      await prisma.raceApprovalPoints.create({
        data: {
          customerId,
          origin,
          destination,
          distance,
          duration,
          price,
          driverId: +driverId,
        },
      });

      return { success: true };
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        "INTERNAL_SERVER_ERROR",
        "Erro interno no servidor",
        500
      );
    }
  }
}
