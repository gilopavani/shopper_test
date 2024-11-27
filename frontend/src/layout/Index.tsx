import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Index";

export default function Layout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="w-full h-[calc(100%-64px)] flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
