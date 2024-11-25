import { SetConfirmUseCase } from "./setConfirmUseCase";
import { Request, Response } from "express";

export class SetConfirmController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      value,
      driver,
    } = request.body;

    const setConfirmUseCase = new SetConfirmUseCase();

    const result = await setConfirmUseCase.execute({
      customerId: customer_id,
      origin,
      destination,
      distance,
      duration,
      price: value,
      driverId: driver.id,
    });

    return response.status(201).json(result);
  }
}
