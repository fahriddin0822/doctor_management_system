import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // ✅ To‘g‘ri yo‘l
import React from "react";
const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
