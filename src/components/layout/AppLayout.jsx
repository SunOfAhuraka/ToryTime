import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      <Outlet />
    </div>
  );
};

export default AppLayout;
