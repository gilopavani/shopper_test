import { GetRouteHistoryUseCase } from "./getRouteHistoryUseCase";
import { Request, Response } from "express";

export class GetRouteHistoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customer_id } = request.params;
    const { driver_id } = request.query;
    const getRouteHistoryUseCase = new GetRouteHistoryUseCase();
    const routeHistory = await getRouteHistoryUseCase.execute({
      customerId: customer_id,
      driverId: driver_id ? Number(driver_id) : undefined,
    });
    return response.json(routeHistory);
  }
}
