import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Award,
  User,
  Upload,
  Settings,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { mockStories } from "../services/api";

const ParentDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [stories, setStories] = useState(mockStories);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Parent Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <BookOpen className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-2">{stories.length}</h3>
            <p className="text-lg">Total Stories</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <Award className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-2">45</h3>
            <p className="text-lg">Quizzes Completed</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <User className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-2">12</h3>
            <p className="text-lg">Active Readers</p>
          </div>
        </div>

        {user?.role === "admin" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Admin Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate("/admin/create")}
                className="bg-blue-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-600 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Story</span>
              </button>
              <button
                onClick={() => navigate("/admin/illustrations")}
                className="bg-purple-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-purple-600 flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Manage Illustrations</span>
              </button>
              <button
                onClick={() => navigate("/admin/categories")}
                className="bg-green-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-600 flex items-center justify-center space-x-2"
              >
                <Settings className="w-5 h-5" />
                <span>Manage Categories</span>
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recent Stories
          </h2>
          <div className="space-y-4">
            {stories.slice(0, 5).map((story) => (
              <div
                key={story.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={story.illustration}
                    alt={story.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{story.title}</h3>
                    <p className="text-gray-600">
                      {story.culture} • {story.category}
                    </p>
                  </div>
                </div>
                {user?.role === "admin" && (
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
