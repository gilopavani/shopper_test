import { EstimateModel } from "../../models/estimate.model";
import { DirectionsResponse } from "../../models/estimateResponse.model";
import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";

async function createEstimate(
  estimate: EstimateModel
): Promise<DirectionsResponse> {
  const data = await api.post<DirectionsResponse>("/ride/estimate", estimate);
  return data.data;
}

interface Props {
  customSuccess?: (data: DirectionsResponse) => void;
  customError?: (error: any) => void;
}

export function useEstimate({
  customSuccess: onCustomSuccess,
  customError: onCustomError,
}: Props = {}) {
  const estimate = useMutation<DirectionsResponse, Error, EstimateModel>({
    mutationFn: createEstimate,
    onSuccess(data) {
      if (onCustomSuccess) {
        onCustomSuccess(data);
      }
    },

    onError(error) {
      if (onCustomError) {
        onCustomError(error);
      }
    },
  });

  return estimate;
}
