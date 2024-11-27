import { HistoryModel } from "./../../models/history.model";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

async function getHistory(
  customer_id: string | null,
  driver_id?: string | null
): Promise<HistoryModel> {
  const data = await api.get<HistoryModel>(
    `/ride/${customer_id}${driver_id ? `?driver_id=${driver_id}` : ""}`
  );
  return data.data;
}

interface Props {
  customer_id: string | null;
  driver_id?: string | null;
}

export function useGetHistory({ customer_id, driver_id }: Props) {
  const history = useQuery<HistoryModel>({
    queryFn: () => getHistory(customer_id, driver_id),
    queryKey: ["history", customer_id, driver_id],
    enabled: !!customer_id,
  });

  return history;
}
