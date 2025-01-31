import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ListIcon, LogOutIcon, HomeIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to logout (currently just redirects to login page)
  const handleLogout = () => {
    navigate("/");
  };

  // Render buttons based on current page
  const renderNavButtons = () => {
    switch (location.pathname) {
      case "/dashboard":
        return (
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/patients")}
              className="flex items-center bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <ListIcon className="h-5 w-5 mr-2" />
              View Patients List
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOutIcon className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        );
      case "/patients":
        return (
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOutIcon className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Doctor Management System</h1>
      {renderNavButtons()}
    </nav>
  );
};

export default Navbar;