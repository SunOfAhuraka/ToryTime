import React, { useState } from "react";
import { Headphones, Camera, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useContent } from "../../context/ContentContext";
import StoryReadingPage from "./StoryReadingPage";
import ChildBottomNav from "../../components/navigation/ChildBottomNav";

const ChildLibraryView = () => {
  const { activeProfile } = useAuth();
  const { getStoriesForChild } = useContent();
  const [selectedStory, setSelectedStory] = useState(null);
  const [activeTab, setActiveTab] = useState("read");

  const stories = getStoriesForChild();

  if (selectedStory) {
    return (
      <StoryReadingPage
        story={selectedStory}
        onBack={() => setSelectedStory(null)}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "#F6C7B6" }}>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: activeProfile?.color }}
          >
            {activeProfile?.avatar}
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#F28C38" }}>
              {activeProfile?.name}'s Library
            </h1>
            <p className="text-sm text-gray-600">
              {stories.length} stories available
            </p>
          </div>
        </div>

        {activeTab === "read" && (
          <div className="grid grid-cols-2 gap-4">
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="rounded-2xl overflow-hidden transition-transform hover:scale-105"
                style={{ backgroundColor: "#F7EDE2" }}
              >
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-1">{story.title}</h3>
                  <p className="text-sm text-gray-600">{story.duration}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === "listen" && (
          <div className="text-center py-16">
            <Headphones className="w-20 h-20 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Audiobook Player</h2>
            <p className="text-gray-600">
              Coming soon! Listen to stories hands-free.
            </p>
          </div>
        )}

        {activeTab === "studio" && (
          <div className="text-center py-16">
            <Camera className="w-20 h-20 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Creative Studio</h2>
            <p className="text-gray-600">
              Coming soon! Create your own stories.
            </p>
          </div>
        )}

        {activeTab === "settings" && (
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: "#F7EDE2" }}
          >
            <h2 className="text-xl font-bold mb-6">Settings</h2>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-semibold mb-2">Profile</h3>
                <div className="flex items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                    style={{ backgroundColor: activeProfile?.color }}
                  >
                    {activeProfile?.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{activeProfile?.name}</p>
                    <p className="text-sm text-gray-600">
                      Reader Level: Beginner
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="w-full p-4 bg-white rounded-lg text-left flex items-center justify-between"
              >
                <span className="font-semibold">Switch Profile</span>
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ChildBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default ChildLibraryView;
