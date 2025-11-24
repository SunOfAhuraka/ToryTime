import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import { Lock } from "lucide-react";

const ProfileSelectionPage = ({ setActiveProfile }) => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);

  useEffect(() => {
    api
      .getChildren()
      .then((res) => setChildren(res.data))
      .catch(() => {});
  }, []);

  const handleSelect = (child) => {
    setActiveProfile(child);
    // Persist active profile to survive refresh
    localStorage.setItem("active_profile", JSON.stringify(child));
    navigate("/app/stories");
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-white">
          Who is reading?
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center">
          {children.map((child) => (
            <div
              key={child.id}
              onClick={() => handleSelect(child)}
              className="flex flex-col items-center cursor-pointer group hover:scale-110 transition"
            >
              <div className="w-32 h-32 bg-brand-card rounded-full flex items-center justify-center text-6xl shadow-lg mb-4 border-4 border-white">
                {child.avatar}
              </div>
              <span className="text-xl font-bold text-white">{child.name}</span>
            </div>
          ))}
          <div
            onClick={() => navigate("/dashboard")}
            className="flex flex-col items-center cursor-pointer group hover:scale-110 transition"
          >
            <div className="w-32 h-32 bg-brand-secondary rounded-full flex items-center justify-center text-white shadow-lg mb-4">
              <Lock size={40} />
            </div>
            <span className="text-xl font-bold text-white">Parent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelectionPage;
