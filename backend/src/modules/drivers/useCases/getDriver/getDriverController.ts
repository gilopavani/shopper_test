import { GetDriversUseCase } from "./getDriversUseCase";
import { Request, Response } from "express";
import { AppError } from "../../../../errors/appError";

export class GetDriversController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const getDriversUseCase = new GetDriversUseCase();
      const drivers = await getDriversUseCase.execute();
      return response.json(drivers);
    } catch (error) {
      throw new AppError(
        "INTERNAL_SERVER_ERROR",
        "Erro ao buscar motoristas",
        500
      );
    }
  }
}
