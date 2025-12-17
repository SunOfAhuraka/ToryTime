import React from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import Card from "../../components/ui/Card";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-sm">
            ToryTime
          </h1>
          <p className="text-xl text-white/90 font-medium leading-relaxed">
            Where parents' voices bring stories to life. Create magical moments
            for your children.
          </p>
        </div>

        <div className="space-y-6">
          <Card
            onClick={() => navigate("/login")}
            className="cursor-pointer hover:scale-105 transition-transform flex items-center gap-6 p-8"
          >
            <div className="bg-[#F28C38] w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md">
              <LogIn size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-text">Login</h2>
              <p className="text-gray-500">Welcome back!</p>
            </div>
          </Card>

          <Card
            onClick={() => navigate("/register")}
            className="cursor-pointer hover:scale-105 transition-transform flex items-center gap-6 p-8 border-4 border-white/50"
          >
            <div className="bg-[#5EC4D0] w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md">
              <UserPlus size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-text">Register</h2>
              <p className="text-gray-500">Create a new account</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
