import React, { useState } from "react";
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
import { useAuth } from "../../context/AuthContext";
import { GLOBAL_STORIES } from "../../data/mockData";
import AddChildModal from "../../components/modals/AddChildModal";
import CustomStoryCreator from "../../components/modals/CustomStoryCreator";

const ParentDashboard = () => {
  const { parentData, logout, selectProfile, addChild, addCustomStory } =
    useAuth();
  const [showAddChild, setShowAddChild] = useState(false);
  const [showStoryCreator, setShowStoryCreator] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleAddChild = (childData) => {
    addChild(childData);
  };

  const handleAddStory = (story) => {
    addCustomStory(story);
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#F6C7B6" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "#F28C38" }}>
              Parent Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {parentData?.name}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: "#5EC4D0" }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === "overview" ? "text-white" : ""
            }`}
            style={{
              backgroundColor: activeTab === "overview" ? "#F28C38" : "#F7EDE2",
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("stories")}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === "stories" ? "text-white" : ""
            }`}
            style={{
              backgroundColor: activeTab === "stories" ? "#F28C38" : "#F7EDE2",
            }}
          >
            My Stories
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === "progress" ? "text-white" : ""
            }`}
            style={{
              backgroundColor: activeTab === "progress" ? "#F28C38" : "#F7EDE2",
            }}
          >
            Progress
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="p-6 rounded-2xl"
              style={{ backgroundColor: "#F7EDE2" }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users style={{ color: "#F28C38" }} />
                  Your Children
                </h2>
                <button
                  onClick={() => setShowAddChild(true)}
                  className="px-3 py-2 rounded-lg text-white text-sm flex items-center gap-2"
                  style={{ backgroundColor: "#F28C38" }}
                >
                  <Plus className="w-4 h-4" />
                  Add Child
                </button>
              </div>
              <div className="space-y-3">
                {parentData?.children.map((child) => (
                  <div
                    key={child.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                        style={{ backgroundColor: child.color }}
                      >
                        {child.avatar}
                      </div>
                      <span className="font-semibold">{child.name}</span>
                    </div>
                    <button
                      onClick={() => selectProfile(child, "child")}
                      className="px-4 py-2 rounded-lg text-sm text-white"
                      style={{ backgroundColor: "#5EC4D0" }}
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="p-6 rounded-2xl"
              style={{ backgroundColor: "#F7EDE2" }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles style={{ color: "#F28C38" }} />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => setShowStoryCreator(true)}
                  className="w-full p-4 rounded-lg bg-white text-left hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <FileText
                      className="w-6 h-6"
                      style={{ color: "#F28C38" }}
                    />
                    <div>
                      <p className="font-semibold">Create Custom Story</p>
                      <p className="text-sm text-gray-600">
                        Write a personalized tale
                      </p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-4 rounded-lg bg-white text-left hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <Mic className="w-6 h-6" style={{ color: "#5EC4D0" }} />
                    <div>
                      <p className="font-semibold">Recording Studio</p>
                      <p className="text-sm text-gray-600">
                        Add your voice to stories
                      </p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-4 rounded-lg bg-white text-left hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6" style={{ color: "#F28C38" }} />
                    <div>
                      <p className="font-semibold">View Quiz Results</p>
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

        {activeTab === "stories" && (
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: "#F7EDE2" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Custom Stories</h2>
              <button
                onClick={() => setShowStoryCreator(true)}
                className="px-4 py-3 rounded-lg text-white font-semibold flex items-center gap-2"
                style={{ backgroundColor: "#F28C38" }}
              >
                <Plus className="w-5 h-5" />
                Create New Story
              </button>
            </div>

            {parentData?.customStories.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {parentData.customStories.map((story) => (
                  <div key={story.id} className="bg-white rounded-lg p-4">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold mb-1">{story.title}</h3>
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
              <h2 className="text-xl font-bold mb-4">Global Library</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {GLOBAL_STORIES.map((story) => (
                  <div key={story.id} className="bg-white rounded-lg p-4">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold mb-1">{story.title}</h3>
                    <p className="text-sm text-gray-600">{story.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "progress" && (
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: "#F7EDE2" }}
          >
            <h2 className="text-xl font-bold mb-6">Children's Quiz Progress</h2>

            {parentData?.children.map((child) => {
              const childScores = Object.entries(
                parentData.quizScores || {}
              ).filter(([key]) => key.startsWith(`${child.id}_`));

              return (
                <div key={child.id} className="mb-6 p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                      style={{ backgroundColor: child.color }}
                    >
                      {child.avatar}
                    </div>
                    <h3 className="font-bold text-lg">{child.name}</h3>
                  </div>

                  {childScores.length > 0 ? (
                    <div className="space-y-2">
                      {childScores.map(([key, data]) => {
                        const storyId = key.split("_")[1];
                        const story = [
                          ...GLOBAL_STORIES,
                          ...(parentData.customStories || []),
                        ].find((s) => s.id === storyId);
                        return (
                          <div
                            key={key}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded"
                          >
                            <span className="font-medium">
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
