import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import Button from "../../components/ui/Button";

const LoginPage = ({ setIsAuthenticated, setIsAdmin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.login({ username, password });
      localStorage.setItem("access_token", res.data.access);
      // Store refresh token if provided by backend
      if (res.data.refresh) {
        localStorage.setItem("refresh_token", res.data.refresh);
      }
      setIsAuthenticated(true);

      // Check Admin status based on username for MVP or decoded token
      const isAdmin = username.includes("admin");
      setIsAdmin(isAdmin);
      navigate(isAdmin ? "/admin" : "/profiles");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
      <div className="bg-brand-card p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-brand-primary">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full p-4 rounded-xl border-2 border-white bg-white"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full p-4 rounded-xl border-2 border-white bg-white"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <Button type="submit" className="w-full">
            Login
          </Button>

          <div className="mt-4 pt-5 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-sm">
              Do not have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-[#F28C38] font-bold hover:underline"
              >
                Register here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
