import { AppError } from "../../../../errors/appError";

export function validateConfirmRaceApprovalPoints({
  customer_id,
  origin,
  destination,
  distance,
  driver_min_distance,
}: any): void {
  if (!origin || !destination || !customer_id) {
    console.log(origin, destination, customer_id);
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

  if (distance < driver_min_distance) {
    throw new AppError(
      "INVALID_DISTANCE",
      "Quilometragem inválida para o motorista",
      406
    );
  }
}
