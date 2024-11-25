import { Driver } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/appError";

export class GetDriversUseCase {
  async execute(): Promise<Driver[]> {
    const drivers = await prisma.driver.findMany({
      include: {
        Review: {
          select: {
            rating: true,
            comment: true,
          },
        },
      },
    });

    if (!drivers || drivers.length === 0) {
      throw new AppError("INVALID_DATA", "Nenhum motorista encontrado", 404);
    }

    return drivers;
  }
}
