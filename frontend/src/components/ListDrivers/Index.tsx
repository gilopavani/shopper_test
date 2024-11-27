import React, { useState } from "react";
import { Option } from "../../models/estimateResponse.model";
import { Icon } from "@iconify/react";

interface Props {
  drivers: Option[];
  loading?: boolean;
  handleConfirm: (driverId: number, driverName: string, price: number) => void;
}

export const ListDrivers = ({ drivers, loading, handleConfirm }: Props) => {
  const [expandedDriverId, setExpandedDriverId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setExpandedDriverId(expandedDriverId === id ? null : id);
  };
  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-4">
      {drivers.map((driver) => (
        <div className="flex w-full gap-2 items-center justify-center">
          <div className="flex flex-col w-4/6  bg-white shadow-white shadow-md rounded-xl overflow-hidden">
            <div className="flex w-full justify-between px-2 py-4 border-b border-gray-200">
              <div>{driver.car}</div>
              <div>R${driver.value}</div>
            </div>
            <div className="flex w-full h-full py-4 justify-between gap-8 px-4">
              <div className="flex flex-col gap-2 ">
                <div className="flex items-center gap-2 rounded-full bg-gray-200 p-2 w-40">
                  <Icon icon="fa-solid:user-circle" />
                  <div>{driver.name}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full">
                <div className="text-sm text-gray-500">
                  {driver.description}
                </div>
              </div>
              <div
                onClick={() => toggleAccordion(driver.id)}
                className="cursor-pointer"
              >
                <Icon
                  icon={
                    expandedDriverId === driver.id
                      ? "fa-solid:minus"
                      : "fa-solid:plus"
                  }
                  className="text-xl"
                />
              </div>
            </div>

            {expandedDriverId === driver.id && (
              <div className="px-2 py-4 border-t border-gray-200">
                <div>
                  <strong>Taxa:</strong> R${driver.tax}
                </div>
                <div>
                  <strong>Distância mínima:</strong> {driver.min_km} km
                </div>
                <div>
                  <strong>Comentários:</strong>
                  <ul>
                    {driver.Review.map((review, index) => (
                      <li key={index}>
                        <strong>{review.rating} estrelas</strong> -{" "}
                        {review.comment}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700"
            onClick={() => handleConfirm(driver.id, driver.name, driver.value)}
            disabled={loading}
          >
            Escolher
          </button>
        </div>
      ))}
    </div>
  );
};
