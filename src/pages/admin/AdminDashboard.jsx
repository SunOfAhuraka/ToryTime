import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Plus,
  Search,
  MoreVertical,
  TrendingUp,
  FileText,
  Trash2,
  Edit,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { GLOBAL_STORIES, PARENT_DATABASE } from "../../data/mockData";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stories, setStories] = useState(GLOBAL_STORIES);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Analytics Data
  const stats = [
    {
      label: "Total Families",
      value: Object.keys(PARENT_DATABASE).length,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Global Stories",
      value: stories.length,
      icon: BookOpen,
      color: "bg-emerald-500",
    },
    {
      label: "Total Recordings",
      value: "1,240",
      icon: MicIcon,
      color: "bg-purple-500",
    },
    {
      label: "Active Users",
      value: "85%",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  // Filter stories logic
  const filteredStories = stories.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteStory = (id) => {
    if (window.confirm("Are you sure you want to delete this global story?")) {
      setStories(stories.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="text-orange-500" />
            StoryTime{" "}
            <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
              ADMIN
            </span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem
            icon={LayoutDashboard}
            label="Overview"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <SidebarItem
            icon={BookOpen}
            label="Global Stories"
            active={activeTab === "stories"}
            onClick={() => setActiveTab("stories")}
          />
          <SidebarItem
            icon={Users}
            label="User Management"
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          />
          <SidebarItem
            icon={Settings}
            label="System Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full p-2"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-slate-800">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold border border-orange-200">
              A
            </div>
            <span className="font-medium text-slate-700">Super Admin</span>
          </div>
        </header>

        <div className="p-8">
          {activeTab === "dashboard" && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}
                      >
                        <stat.icon
                          className={`w-6 h-6 ${stat.color.replace(
                            "bg-",
                            "text-"
                          )}`}
                        />
                      </div>
                      <span className="text-green-500 text-sm font-medium flex items-center">
                        +12% <TrendingUp className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-slate-500 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-slate-800">
                    Recent Platform Activity
                  </h3>
                  <button className="text-blue-600 text-sm font-medium hover:underline">
                    View All
                  </button>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50 text-slate-500 text-sm">
                    <tr>
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium">Action</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[1, 2, 3].map((i) => (
                      <tr key={i} className="text-sm">
                        <td className="p-4 font-medium text-slate-800">
                          Sarah Johnson
                        </td>
                        <td className="p-4 text-slate-600">
                          Added new child profile "Emma"
                        </td>
                        <td className="p-4 text-slate-500">2 mins ago</td>
                        <td className="p-4">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                            Success
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "stories" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search stories..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800">
                  <Plus size={20} />
                  Add New Story
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 text-slate-500 text-sm">
                    <tr>
                      <th className="text-left p-4 font-medium">Title</th>
                      <th className="text-left p-4 font-medium">Category</th>
                      <th className="text-left p-4 font-medium">Age Range</th>
                      <th className="text-left p-4 font-medium">Author</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredStories.map((story) => (
                      <tr
                        key={story.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={story.coverImage}
                              alt=""
                              className="w-10 h-14 object-cover rounded"
                            />
                            <span className="font-medium text-slate-800">
                              {story.title}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                            {story.category}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">{story.ageRange}</td>
                        <td className="p-4 text-slate-600">{story.author}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-slate-400 hover:text-blue-600">
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteStory(story.id)}
                              className="p-2 text-slate-400 hover:text-red-600"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Helper component for Sidebar
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      active
        ? "bg-orange-500 text-white shadow-md"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

// Helper icon for stats
const MicIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
);

export default AdminDashboard;
