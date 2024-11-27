import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EstimateModel } from "../../../models/estimate.model";
import { EstimateSchema } from "../../../schemas/estimate.schema";
import { Icon } from "@iconify/react";

interface Props {
  handleEstimate: (data: EstimateModel) => void;
  loading?: boolean;
}

export const SelectRouteForm = ({ handleEstimate, loading }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EstimateModel>({
    resolver: zodResolver(EstimateSchema),
  });

  const onSubmit = (data: EstimateModel) => {
    console.log(data);
    handleEstimate(data);
  };
  return (
    <div className="h-full w-3/5 py-20 flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full justify-center gap-8"
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Icon icon="mdi:user" color="#9CA3AF" width="20" height="20" />
          </div>
          <input
            type="text"
            id="user-id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 py-4"
            placeholder="Id do cliente"
            {...register("customer_id")}
            required
          />
        </div>

        {errors.customer_id && (
          <span className="text-red-500 text-sm">
            {errors.customer_id.message}
          </span>
        )}

        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Icon
              icon="mdi:map-marker"
              color="#9CA3AF"
              width="20"
              height="20"
            />
          </div>
          <input
            type="text"
            id="origin"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 py-4"
            placeholder="Origem"
            {...register("origin")}
            required
          />
        </div>

        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Icon
              icon="mdi:map-marker"
              color="#9CA3AF"
              width="20"
              height="20"
            />
          </div>
          <input
            type="text"
            id="destination"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 py-4"
            placeholder="Destino"
            {...register("destination")}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-50  text-black rounded-lg py-2.5 flex gap-2 items-center justify-center"
        >
          <div>Calcular</div>
          <div>{loading && <Icon icon="eos-icons:bubble-loading" />}</div>
        </button>
      </form>
    </div>
  );
};
