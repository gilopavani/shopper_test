import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { RaceApprovalPointsModel } from "../../models/confirm.model";

async function confirmEstimate(
  estimate: RaceApprovalPointsModel
): Promise<{ success: boolean }> {
  const data = await api.post<{ success: boolean }>("/ride/confirm", estimate);
  return data.data;
}

interface Props {
  customSuccess?: (data: { success: boolean }) => void;
  customError?: (error: any) => void;
}

export function useConfirm({
  customSuccess: onCustomSuccess,
  customError: onCustomError,
}: Props = {}) {
  const confirm = useMutation<
    { success: boolean },
    Error,
    RaceApprovalPointsModel
  >({
    mutationFn: confirmEstimate,
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
  return confirm;
}
