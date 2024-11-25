import { GetEstimateUseCase } from "./getEstimateUseCase";
import { Request, Response } from "express";

export class GetEstimateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getEstimateUseCase = new GetEstimateUseCase();
    const { customer_id, origin, destination } = request.body;
    const estimate = await getEstimateUseCase.execute({
      customer_id,
      origin,
      destination,
    });
    return response.json(estimate);
  }
}
