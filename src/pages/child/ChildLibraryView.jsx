import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ChildBottomNav from "../../components/navigation/ChildBottomNav";

const ChildLibraryView = ({ activeProfile }) => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [tab, setTab] = useState("read");

  useEffect(() => {
    api
      .getStories()
      .then((res) => setStories(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      <div className="p-6">
        <header className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl shadow-md">
            {activeProfile?.avatar || "😊"}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              Hi, {activeProfile?.name}!
            </h1>
            <p className="text-white/90">Let's read something fun.</p>
          </div>
        </header>

        {tab === "read" && (
          <div className="grid md:grid-cols-2 gap-6">
            {stories.map((story) => (
              <Card
                key={story.id}
                className="p-0 overflow-hidden group cursor-pointer hover:scale-105 transition duration-300"
                onClick={() => navigate(`/story/${story.id}`)}
              >
                <div className="h-48 bg-gray-200">
                  {/* Placeholder logic for missing images */}
                  {story.cover_image ? (
                    <img
                      src={story.cover_image}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-3xl bg-white">
                      📖
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-brand-text mb-2">
                    {story.title}
                  </h3>
                  <Button className="w-full">Read Now</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
        {tab === "listen" && (
          <div className="text-center p-10 text-white text-xl font-bold">
            Audio Library Coming Soon! 🎧
          </div>
        )}
        {tab === "studio" && (
          <div className="text-center p-10 text-white text-xl font-bold">
            Studio Coming Soon! 🎤
          </div>
        )}
      </div>
      <ChildBottomNav activeTab={tab} onTabChange={setTab} />
    </div>
  );
};

export default ChildLibraryView;
