import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { FilterHistoryModel } from "../../../models/history.model";
import { FilterHistorySchema } from "../../../schemas/history.schema";

interface Props {
  handleFilter: (data: FilterHistoryModel) => void;
  customer_id: string | null;
  driver_id?: string | null;
}

export const FilterHistory = ({
  handleFilter,
  customer_id,
  driver_id,
}: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FilterHistoryModel>({
    resolver: zodResolver(FilterHistorySchema),
    defaultValues: {
      customer_id: customer_id || "",
      driver_id: driver_id || "",
    },
  });

  const onSubmit = (data: FilterHistoryModel) => {
    handleFilter(data);
  };

  return (
    <div className="h-full w-11/12 py-20 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full justify-center gap-8 g"
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Icon icon="mdi:user" color="#9CA3AF" width="20" height="20" />
          </div>
          <input
            type="text"
            id="customer_id"
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
            id="driver_id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 py-4"
            placeholder="Id do motorista"
            {...register("driver_id")}
          />
        </div>

        {errors.driver_id && (
          <span className="text-red-500 text-sm">
            {errors.driver_id.message}
          </span>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white text-sm rounded-lg py-3"
        >
          Filtrar
        </button>
      </form>
    </div>
  );
};
