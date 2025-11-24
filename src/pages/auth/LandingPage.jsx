import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
      <div className="max-w-4xl grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl font-bold text-white mb-6">StoryTime</h1>
          <p className="text-xl text-white/90">
            Where stories come alive with your voice.
          </p>
        </div>
        <div className="space-y-6">
          <Card
            onClick={() => navigate("/profiles")}
            className="cursor-pointer hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold text-brand-text">
              Start Reading
            </h2>
            <p className="text-gray-500">For Kids</p>
          </Card>
          <Card
            onClick={() => navigate("/login")}
            className="cursor-pointer hover:scale-105 transition border-4 border-white/50"
          >
            <h2 className="text-2xl font-bold text-brand-text">Parent Login</h2>
            <p className="text-gray-500">Manage Family</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
