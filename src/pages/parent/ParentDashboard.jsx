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
import { api } from "../../api/client";
import AddChildModal from "../../components/modals/AddChildModal";
import CustomStoryCreator from "../../components/modals/CustomStoryCreator";

const ParentDashboard = () => {
  const navigate = useNavigate();

  // Data State
  const [parentName, setParentName] = useState("");
  const [children, setChildren] = useState([]);
  const [customStories, setCustomStories] = useState([]);
  const [globalStories, setGlobalStories] = useState([]);
  const [quizScores, setQuizScores] = useState({});

  // UI State
  const [showAddChild, setShowAddChild] = useState(false);
  const [showStoryCreator, setShowStoryCreator] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data
  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch Profile
      const profile = await api.getProfile();
      setParentName(profile.name || "Parent");

      // Fetch Children
      const childrenRes = await api.getChildren();
      setChildren(childrenRes.data);

      // Fetch Stories
      const storiesRes = await api.getStories();
      const allStories = storiesRes.data;

      // Filter Stories (Logic: Author is Me vs Author is Admin/Others)
      const myStories = allStories.filter(
        (s) => s.author === profile.name || s.category === "Personal",
      );
      const libraryStories = allStories.filter(
        (s) => s.author !== profile.name && s.category !== "Personal",
      );

      setCustomStories(myStories);
      setGlobalStories(libraryStories);

      // Fetch Quiz Results for children
      const quizResultsRes = await api.getQuizResults();
      const results = quizResultsRes.data || [];
      setQuizScores(results);

      if (profile.quizScores) {
        setQuizScores((prev) => [...prev, ...profile.quizScores]);
      }
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // 2. Actions
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const selectProfile = (child) => {
    localStorage.setItem("active_profile", JSON.stringify(child));
    navigate("/app/stories");
  };

  const handleChildAdded = async () => {
    await loadDashboardData();
    setShowAddChild(false);
  };

  const handleStorySaved = async () => {
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
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition hover:opacity-90"
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
            className={`px-6 py-3 rounded-lg font-semibold transition ${
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
            className={`px-6 py-3 rounded-lg font-semibold transition ${
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
            className={`px-6 py-3 rounded-lg font-semibold transition ${
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

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="p-6 rounded-2xl shadow-lg"
              style={{ backgroundColor: "#F7EDE2" }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-[#4A4A4A]">
                  <Users style={{ color: "#F28C38" }} /> Your Children
                </h2>
                <button
                  onClick={() => setShowAddChild(true)}
                  className="px-3 py-2 rounded-lg text-white text-sm flex items-center gap-2 hover:opacity-90"
                  style={{ backgroundColor: "#F28C38" }}
                >
                  <Plus className="w-4 h-4" /> Add Child
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
                        className="px-4 py-2 rounded-lg text-sm text-white hover:opacity-90"
                        style={{ backgroundColor: "#5EC4D0" }}
                      >
                        View Profile
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div
              className="p-6 rounded-2xl shadow-lg"
              style={{ backgroundColor: "#F7EDE2" }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#4A4A4A]">
                <Sparkles style={{ color: "#F28C38" }} /> Quick Actions
              </h2>
              <div className="space-y-3">
                <ActionCard
                  onClick={() => setShowStoryCreator(true)}
                  icon={FileText}
                  iconColor="#F28C38"
                  title="Create Custom Story"
                  desc="Write a personalized tale"
                />
                <ActionCard
                  onClick={() => navigate("/dashboard/studio")}
                  icon={Mic}
                  iconColor="#5EC4D0"
                  title="Recording Studio"
                  desc="Add your voice to stories"
                />
                <ActionCard
                  onClick={() => setActiveTab("progress")}
                  icon={Award}
                  iconColor="#F28C38"
                  title="View Quiz Results"
                  desc="Check children's progress"
                />
              </div>
            </div>
          </div>
        )}

        {/* Stories Tab */}
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
                className="px-4 py-3 rounded-lg text-white font-semibold flex items-center gap-2 hover:opacity-90"
                style={{ backgroundColor: "#F28C38" }}
              >
                <Plus className="w-5 h-5" /> Create New Story
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {customStories.length > 0 ? (
                customStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  No custom stories yet.
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold mb-4 text-[#4A4A4A] pt-6 border-t-2 border-[#5EC4D0]">
              Global Library
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {globalStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === "progress" && (
          <div
            className="p-6 rounded-2xl shadow-lg"
            style={{ backgroundColor: "#F7EDE2" }}
          >
            <h2 className="text-xl font-bold mb-6 text-[#4A4A4A]">
              Quiz Progress
            </h2>
            {children.length === 0 && (
              <p className="text-gray-500">No children profiles.</p>
            )}
            {children.map((child) => (
              <div
                key={child.id}
                className="mb-6 p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: child.color || "#FF6B9D" }}
                  >
                    {child.avatar}
                  </div>
                  <h3 className="font-bold text-lg text-[#4A4A4A]">
                    {child.name}
                  </h3>
                </div>

                {/* Get child's quiz results */}
                {Array.isArray(quizScores) && quizScores.length > 0 ? (
                  <div className="space-y-3">
                    {quizScores
                      .filter((result) => result.child === child.id)
                      .sort(
                        (a, b) =>
                          new Date(b.date_taken) - new Date(a.date_taken),
                      )
                      .slice(0, 5) // Show last 5 results
                      .map((result, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <p className="font-semibold text-[#4A4A4A]">
                              {result.story_title || `Story ${result.story}`}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(result.date_taken).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#F28C38]">
                              {result.score}/{result.total_questions}
                            </p>
                            <p className="text-xs text-gray-500">
                              {Math.round(
                                (result.score / result.total_questions) * 100,
                              )}
                              %
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No quiz results yet.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddChild && (
        <AddChildModal
          onClose={() => setShowAddChild(false)}
          onChildAdded={handleChildAdded}
        />
      )}
      {showStoryCreator && (
        <CustomStoryCreator
          parentName={parentName}
          onClose={() => setShowStoryCreator(false)}
          onSave={handleStorySaved}
        />
      )}
    </div>
  );
};

// Helper Components
const ActionCard = ({ onClick, icon: Icon, iconColor, title, desc }) => (
  <button
    onClick={onClick}
    className="w-full p-4 rounded-lg bg-white text-left hover:shadow-md transition-all transform hover:-translate-y-1"
  >
    <div className="flex items-center gap-3">
      <Icon className="w-6 h-6" style={{ color: iconColor }} />
      <div>
        <p className="font-semibold text-[#4A4A4A]">{title}</p>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  </button>
);

const StoryCard = ({ story }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition">
    <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 overflow-hidden">
      {story.coverImage ? (
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
    </div>
    <h3 className="font-semibold mb-1 text-[#4A4A4A] truncate">
      {story.title}
    </h3>
    <p className="text-sm text-gray-600">{story.category}</p>
  </div>
);

export default ParentDashboard;
