import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, User } from "lucide-react";

const ChildNavbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 cursor-pointer">
          <BookOpen className="w-10 h-10 text-white" />
          <span className="text-white font-bold text-2xl">StoryTime</span>
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/"
            className={`px-6 py-3 rounded-full font-bold text-lg transition-all flex items-center ${
              isActive("/")
                ? "bg-white text-purple-600"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            <Home className="inline w-6 h-6 mr-2" />
            Stories
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-green-500 text-white rounded-full font-bold text-lg hover:bg-green-600 transition-all flex items-center"
          >
            <User className="inline w-6 h-6 mr-2" />
            Parents
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ChildNavbar;
