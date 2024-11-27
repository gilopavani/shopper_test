import React from "react";
import { FilterHistory } from "../../components/Forms/FilterHistory/Index";
import { useLocation } from "react-router-dom";
import { useGetHistory } from "../../hooks/Api/useGetHistory";
import { FilterHistoryModel } from "../../models/history.model";

export default function History() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get("customer_id");

  const [customer_id, setCustomerId] = React.useState<string | null>(
    customerId || null
  );
  const [driver_id, setDriverId] = React.useState<string | null | undefined>(
    null
  );

  const { refetch, data } = useGetHistory({ customer_id, driver_id });

  const handleFilter = (data: FilterHistoryModel) => {
    setCustomerId(data.customer_id);
    setDriverId(data.driver_id);
    refetch();
  };

  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-96 h-full border-r border-gray-300 items-center justify-center flex">
        <FilterHistory
          handleFilter={handleFilter}
          customer_id={customer_id}
          driver_id={driver_id}
        />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-start p-4 text-white overflow-scroll">
        <h1 className="text-xl font-bold mb-4">Histórico de Corridas</h1>
        {data?.rides && data.rides.length > 0 ? (
          <ul className="w-full">
            {data.rides.map((ride) => (
              <li
                key={ride.id}
                className="mb-4 p-4 border border-gray-300 rounded shadow-sm"
              >
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(ride.date).toLocaleString("pt-BR")}
                </p>
                <p>
                  <strong>Origem:</strong> {ride.origin}
                </p>
                <p>
                  <strong>Destino:</strong> {ride.destination}
                </p>
                <p>
                  <strong>Distância:</strong> {ride.distance.toFixed(2)} km
                </p>
                <p>
                  <strong>Duração:</strong> {ride.duration}
                </p>
                <p>
                  <strong>Motorista:</strong> {ride.driver.name}
                </p>
                <p>
                  <strong>Valor:</strong>{" "}
                  {ride.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhuma corrida encontrada.</p>
        )}
      </div>
    </div>
  );
}
