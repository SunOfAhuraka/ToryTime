import React from "react";
import { BookOpen, Headphones, Camera, Settings, LogOut } from "lucide-react";
import { useSession } from "../../context/SessionContext";

const ChildBottomNav = ({ activeTab, onTabChange }) => {
  const { endSession } = useSession();

  const handleLogout = () => {
    if (window.confirm("Exit to profile selection?")) {
      endSession();
      window.location.href = "/profiles";
    }
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => onTabChange(id)}
      className={`flex flex-col items-center gap-1 ${
        activeTab === id ? "text-brand-primary" : "text-gray-400"
      }`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-[10px] font-bold uppercase">{label}</span>
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-around items-center bg-brand-card rounded-t-3xl shadow-xl z-50">
      <NavItem id="read" icon={BookOpen} label="Read" />
      <NavItem id="listen" icon={Headphones} label="Listen" />
      <NavItem id="studio" icon={Camera} label="Studio" />
      <button
        onClick={handleLogout}
        className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500"
      >
        <LogOut className="w-6 h-6" />
        <span className="text-[10px] font-bold uppercase">Exit</span>
      </button>
    </div>
  );
};

export default ChildBottomNav;
