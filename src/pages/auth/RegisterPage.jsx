import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, ChevronLeft } from "lucide-react";
import { api } from "../../api/client";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      // Handle generic errors or specific backend validation errors
      const message =
        err.response?.data?.detail || "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center space-x-2 text-white font-bold hover:opacity-80 transition"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back to Home</span>
        </button>

        <Card className="p-10">
          <div className="text-center mb-8">
            <div className="bg-[#F28C38] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
              <UserPlus size={40} />
            </div>
            <h2 className="text-3xl font-bold text-brand-text">
              Join StoryTime
            </h2>
            <p className="text-gray-400 mt-2">
              Create an account for your family
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                name="username"
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#5EC4D0] outline-none transition font-medium"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                name="email"
                type="email"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#5EC4D0] outline-none transition font-medium"
                placeholder="parent@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                name="password"
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#5EC4D0] outline-none transition font-medium"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                name="confirmPassword"
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#5EC4D0] outline-none transition font-medium"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-center font-bold text-sm">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-lg shadow-xl mt-4"
              // Using secondary color for register to differentiate from login
              variant="secondary"
              style={{ backgroundColor: "#F28C38" }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#F28C38] font-bold hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
