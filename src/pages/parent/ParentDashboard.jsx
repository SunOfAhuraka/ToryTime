import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Users,
  Plus,
  Sparkles,
  Mic,
  BookOpen,
  FileText,
  Award,
} from "lucide-react";
import { api } from "../../api/client"; // Import the API client
import AddChildModal from "../../components/modals/AddChildModal";
import CustomStoryCreator from "../../components/modals/CustomStoryCreator";

const ParentDashboard = () => {
  const navigate = useNavigate();

  // Local State to hold data from Backend
  const [parentName, setParentName] = useState("");
  const [children, setChildren] = useState([]);
  const [customStories, setCustomStories] = useState([]);
  const [globalStories, setGlobalStories] = useState([]);
  const [quizScores, setQuizScores] = useState({}); // Assuming backend returns this map

  // UI State
  const [showAddChild, setShowAddChild] = useState(false);
  const [showStoryCreator, setShowStoryCreator] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data on Mount
  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch Profile (for name)
      const profile = await api.getProfile();
      setParentName(profile.name || "Parent");

      // Fetch Children
      const childrenRes = await api.getChildren();
      setChildren(childrenRes.data);

      // Fetch All Stories and separate them
      const storiesRes = await api.getStories();
      const allStories = storiesRes.data;

      // Separate Global vs Custom (Assuming 'is_global' flag or check author)
      // Adjust logic based on your exact backend response structure
      const custom = allStories.filter(
        (s) => s.author === profile.name || s.category === "Personal"
      );
      const global = allStories.filter(
        (s) => s.author !== profile.name && s.category !== "Personal"
      );

      setCustomStories(custom);
      setGlobalStories(global);

      // If backend provides quiz scores in profile, set them here
      if (profile.quizScores) {
        setQuizScores(profile.quizScores);
      }
    } catch (error) {
      console.error("Failed to load dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // 2. Handlers replacing Context functions
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const selectProfile = (child) => {
    // Save selected child to storage so ChildLibrary can read it
    localStorage.setItem("active_profile", JSON.stringify(child));
    navigate("/app/stories");
  };

  const handleAddChild = async (childData) => {
    try {
      // The Modal calls the API, we just reload data here to be safe
      // Or we can manually update state to avoid a reload
      await loadDashboardData();
      setShowAddChild(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddStory = async (story) => {
    // CustomStoryCreator handles the API call internally, we just refresh
    await loadDashboardData();
    setShowStoryCreator(false);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F6C7B6" }}
      >
        <div className="text-2xl font-bold text-white">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#F6C7B6" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "#F28C38" }}>
              Parent Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {parentName}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-transform hover:scale-105"
            style={{ backgroundColor: "#5EC4D0" }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "overview"
                ? "text-white"
                : "text-gray-600 hover:bg-orange-100"
            }`}
            style={{
              backgroundColor: activeTab === "overview" ? "#F28C38" : "#F7EDE2",
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("stories")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "stories"
                ? "text-white"
                : "text-gray-600 hover:bg-orange-100"
            }`}
            style={{
              backgroundColor: activeTab === "stories" ? "#F28C38" : "#F7EDE2",
            }}
          >
            My Stories
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "progress"
                ? "text-white"
                : "text-gray-600 hover:bg-orange-100"
            }`}
            style={{
              backgroundColor: activeTab === "progress" ? "#F28C38" : "#F7EDE2",
            }}
          >
            Progress
          </button>
        </div>

        {/* Content: Overview */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Children Card */}
            <div
              className="p-6 rounded-2xl shadow-lg"
              style={{ backgroundColor: "#F7EDE2" }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-[#4A4A4A]">
                  <Users style={{ color: "#F28C38" }} />
                  Your Children
                </h2>
                <button
                  onClick={() => setShowAddChild(true)}
                  className="px-3 py-2 rounded-lg text-white text-sm flex items-center gap-2 transition hover:opacity-90"
                  style={{ backgroundColor: "#F28C38" }}
                >
                  <Plus className="w-4 h-4" />
                  Add Child
                </button>
              </div>
              <div className="space-y-3">
                {children.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No children added yet.
                  </p>
                ) : (
                  children.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm"
                          style={{ backgroundColor: child.color || "#FF6B9D" }}
                        >
                          {child.avatar}
                        </div>
                        <span className="font-semibold text-[#4A4A4A]">
                          {child.name}
                        </span>
                      </div>
                      <button
                        onClick={() => selectProfile(child)}
                        className="px-4 py-2 rounded-lg text-sm text-white transition hover:opacity-90"
                        style={{ backgroundColor: "#5EC4D0" }}
                      >
                        View Profile
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div
              className="p-6 rounded-2xl shadow-lg"
              style={{ backgroundColor: "#F7EDE2" }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#4A4A4A]">
                <Sparkles style={{ color: "#F28C38" }} />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => setShowStoryCreator(true)}
                  className="w-full p-4 rounded-lg bg-white text-left hover:shadow-md transition-all transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <FileText
                      className="w-6 h-6"
                      style={{ color: "#F28C38" }}
                    />
                    <div>
                      <p className="font-semibold text-[#4A4A4A]">
                        Create Custom Story
                      </p>
                      <p className="text-sm text-gray-600">
                        Write a personalized tale
                      </p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-4 rounded-lg bg-white text-left hover:shadow-md transition-all transform hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <Mic className="w-6 h-6" style={{ color: "#5EC4D0" }} />
                    <div>
                      <p className="font-semibold text-[#4A4A4A]">
                        Recording Studio
                      </p>
                      <p className="text-sm text-gray-600">
                        Add your voice to stories
                      </p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-4 rounded-lg bg-white text-left hover:shadow-md transition-all transform hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6" style={{ color: "#F28C38" }} />
                    <div>
                      <p className="font-semibold text-[#4A4A4A]">
                        View Quiz Results
                      </p>
                      <p className="text-sm text-gray-600">
                        Check children's progress
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content: Stories */}
        {activeTab === "stories" && (
          <div
            className="p-6 rounded-2xl shadow-lg"
            style={{ backgroundColor: "#F7EDE2" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#4A4A4A]">
                Custom Stories
              </h2>
              <button
                onClick={() => setShowStoryCreator(true)}
                className="px-4 py-3 rounded-lg text-white font-semibold flex items-center gap-2 transition hover:opacity-90"
                style={{ backgroundColor: "#F28C38" }}
              >
                <Plus className="w-5 h-5" />
                Create New Story
              </button>
            </div>

            {customStories.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {customStories.map((story) => (
                  <div
                    key={story.id}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >
                    {story.coverImage ? (
                      <img
                        src={story.coverImage}
                        alt={story.title}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <h3 className="font-semibold mb-1 text-[#4A4A4A]">
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-600">{story.category}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">
                  No custom stories yet. Create your first one!
                </p>
              </div>
            )}

            <div
              className="mt-8 border-t-2 pt-8"
              style={{ borderColor: "#5EC4D0" }}
            >
              <h2 className="text-xl font-bold mb-4 text-[#4A4A4A]">
                Global Library
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {globalStories.map((story) => (
                  <div
                    key={story.id}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >
                    {story.coverImage ? (
                      <img
                        src={story.coverImage}
                        alt={story.title}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <h3 className="font-semibold mb-1 text-[#4A4A4A]">
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {story.author || "Admin"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content: Progress */}
        {activeTab === "progress" && (
          <div
            className="p-6 rounded-2xl shadow-lg"
            style={{ backgroundColor: "#F7EDE2" }}
          >
            <h2 className="text-xl font-bold mb-6 text-[#4A4A4A]">
              Children's Quiz Progress
            </h2>

            {children.length === 0 && (
              <p className="text-gray-500">No children profiles to show.</p>
            )}

            {children.map((child) => {
              // Filtering logic based on quizScores structure
              const childScores = Object.entries(quizScores || {}).filter(
                ([key]) => key.startsWith(`${child.id}_`)
              );

              return (
                <div
                  key={child.id}
                  className="mb-6 p-4 bg-white rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xl border shadow-sm"
                      style={{ backgroundColor: child.color || "#FF6B9D" }}
                    >
                      {child.avatar}
                    </div>
                    <h3 className="font-bold text-lg text-[#4A4A4A]">
                      {child.name}
                    </h3>
                  </div>

                  {childScores.length > 0 ? (
                    <div className="space-y-2">
                      {childScores.map(([key, data]) => {
                        const storyId = key.split("_")[1];
                        // Find story in either list to get the title
                        const story = [...globalStories, ...customStories].find(
                          (s) => s.id == storyId
                        );
                        return (
                          <div
                            key={key}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded"
                          >
                            <span className="font-medium text-[#4A4A4A]">
                              {story?.title || "Unknown Story"}
                            </span>
                            <span
                              className="text-sm font-bold"
                              style={{ color: "#F28C38" }}
                            >
                              {data.score}/{data.total}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No quiz results yet</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddChild && (
        <AddChildModal
          onClose={() => setShowAddChild(false)}
          onAdd={handleAddChild}
        />
      )}
      {showStoryCreator && (
        <CustomStoryCreator
          onClose={() => setShowStoryCreator(false)}
          onSave={handleAddStory}
        />
      )}
    </div>
  );
};

export default ParentDashboard;
