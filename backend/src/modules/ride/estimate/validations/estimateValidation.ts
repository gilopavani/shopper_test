import { AppError } from "../../../../errors/appError";

export function validateEstimateData({
  customer_id,
  origin,
  destination,
}: any): void {
  if (!origin || !destination || !customer_id) {
    throw new AppError(
      "INVALID_DATA",
      "Os dados fornecidos no corpo da requisição são inválidos",
      400
    );
  }

  if (origin === destination) {
    throw new AppError(
      "INVALID_DATA",
      "Os dados fornecidos no corpo da requisição são inválidos",
      400
    );
  }
}
