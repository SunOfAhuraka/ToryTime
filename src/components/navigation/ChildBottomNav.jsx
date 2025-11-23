import React from "react";
import { BookOpen, Headphones, Camera, Settings } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ChildBottomNav = ({ activeTab = "read", onTabChange = () => {} }) => {
  const { logout } = useAuth();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 p-4 flex justify-around items-center shadow-lg"
      style={{ backgroundColor: "#F7EDE2" }}
    >
      <button
        onClick={() => onTabChange("read")}
        className="flex flex-col items-center gap-1"
      >
        <BookOpen
          className="w-6 h-6"
          style={{ color: activeTab === "read" ? "#F28C38" : "#5EC4D0" }}
        />
        <span
          className={`text-xs font-medium ${
            activeTab === "read" ? "text-gray-800" : "text-gray-600"
          }`}
        >
          Read
        </span>
      </button>
      <button
        onClick={() => onTabChange("listen")}
        className="flex flex-col items-center gap-1"
      >
        <Headphones
          className="w-6 h-6"
          style={{ color: activeTab === "listen" ? "#F28C38" : "#5EC4D0" }}
        />
        <span
          className={`text-xs font-medium ${
            activeTab === "listen" ? "text-gray-800" : "text-gray-600"
          }`}
        >
          Listen
        </span>
      </button>
      <button
        onClick={() => onTabChange("studio")}
        className="flex flex-col items-center gap-1"
      >
        <Camera
          className="w-6 h-6"
          style={{ color: activeTab === "studio" ? "#F28C38" : "#5EC4D0" }}
        />
        <span
          className={`text-xs font-medium ${
            activeTab === "studio" ? "text-gray-800" : "text-gray-600"
          }`}
        >
          Studio
        </span>
      </button>
      <button
        onClick={() => onTabChange("settings")}
        className="flex flex-col items-center gap-1"
      >
        <Settings
          className="w-6 h-6"
          style={{ color: activeTab === "settings" ? "#F28C38" : "#5EC4D0" }}
        />
        <span
          className={`text-xs font-medium ${
            activeTab === "settings" ? "text-gray-800" : "text-gray-600"
          }`}
        >
          Settings
        </span>
      </button>
    </div>
  );
};

export default ChildBottomNav;
