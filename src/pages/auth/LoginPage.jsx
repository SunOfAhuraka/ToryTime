import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("parent@storytime.com");
  const [password, setPassword] = useState("demo");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = () => {
    if (login(email, password)) {
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#F6C7B6" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-xl"
        style={{ backgroundColor: "#F7EDE2" }}
      >
        <div className="text-center mb-8">
          <BookOpen
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: "#F28C38" }}
          />
          <h1 className="text-3xl font-bold" style={{ color: "#F28C38" }}>
            StoryTime
          </h1>
          <p className="text-gray-600 mt-2">Where stories come alive</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-50"
              style={{ borderColor: "#5EC4D0", backgroundColor: "white" }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-50"
              style={{ borderColor: "#5EC4D0", backgroundColor: "white" }}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105"
            style={{ backgroundColor: "#F28C38" }}
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-semibold mb-2">Demo Accounts:</p>
          <p>• parent@storytime.com / demo</p>
          <p>• john@storytime.com / demo123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
