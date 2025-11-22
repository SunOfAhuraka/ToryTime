import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogOut } from "lucide-react";

const AdultNavbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/admin"
          className="flex items-center space-x-2 cursor-pointer"
        >
          <BookOpen className="w-8 h-8 text-white" />
          <span className="text-white font-bold text-xl">StoryTime Admin</span>
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-white font-semibold">
            Welcome, {user?.username}
          </span>
          <Link
            to="/"
            className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100"
          >
            View Stories
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 flex items-center"
          >
            <LogOut className="inline w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdultNavbar;
