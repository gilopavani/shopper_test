import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const goToPage = (page: string) => {
    navigate(page);
  };
  return (
    <div className="h-16 w-full px-12 justify-between flex items-center">
      <div className="flex gap-5">
        <div
          className="text-white text-lg cursor-pointer font-bold transition-transform duration-300 hover:scale-110"
          onClick={() => goToPage("/")}
        >
          Home
        </div>
        <div
          className="text-white text-lg cursor-pointer font-bold transition-transform duration-300 hover:scale-110"
          onClick={() => goToPage("/historico")}
        >
          Histórico
        </div>
      </div>

      <div className="text-white text-xl font-bold ">Shooper Driver</div>
    </div>
  );
};
