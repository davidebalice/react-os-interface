import React from "react";
import { Outlet } from "react-router-dom";
import BottomBar from "../components/BottomBar";

const Layout = () => {
  return (
    <div className="min-h-screen w-full">
      <Outlet />
      <BottomBar />
    </div>
  );
};

export default Layout;
