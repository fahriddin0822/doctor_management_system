import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  
  // States to store login and password values
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-sm mx-auto my-11">
      <h2 className="text-center text-2xl font-bold mb-6">Doctor Login</h2>
      
      {/* Login form */}
      <form className="space-y-4">
        <div>
          <label htmlFor="login" className="block text-sm font-medium text-gray-700">Login</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your login"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all duration-300"
        >
          Enter Dashboard
        </button>
      </form>
    </div>
  );
};

export default Login;
