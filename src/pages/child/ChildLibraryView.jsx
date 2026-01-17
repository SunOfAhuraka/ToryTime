import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ChildBottomNav from "../../components/navigation/ChildBottomNav";

const ChildLibraryView = ({ activeProfile }) => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [tab, setTab] = useState("read");
  const [categorySearch, setCategorySearch] = useState("");

  useEffect(() => {
    api
      .getStories()
      .then((res) => setStories(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeProfile || !activeProfile.id) return;

    // Fetch recordings for the active child profile
    api
      .getRecordings({ child_id: activeProfile.id })
      .then((res) => {
        const recs = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        const enriched = recs.map((r) => {
          // Normalize story: API may return either an object or an ID
          let storyObj = {};
          if (r.story && typeof r.story === "object") {
            storyObj = r.story;
          } else {
            const storyId = Number(r.story);
            storyObj = stories.find((s) => Number(s.id) === storyId) || {};
          }

          // Support multiple possible audio field names (including camelCase `audioUrl`)
          const audioUrl =
            r.audioUrl ||
            r.audio_file ||
            r.file ||
            r.url ||
            r.audio ||
            r.recording_url ||
            r.recording ||
            null;

          return {
            id: r.id,
            story: storyObj,
            audioUrl,
          };
        });

        setRecordings(enriched);
      })
      .catch(console.error);
  }, [activeProfile, stories]);

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

        {/* Search by Category */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by category (e.g., Honesty, Integrity)... "
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value.toLowerCase())}
            className="w-full px-4 py-3 rounded-lg border-2 border-white focus:border-brand-primary outline-none bg-white/90 font-medium"
          />
        </div>

        {tab === "read" && (
          <div className="grid md:grid-cols-2 gap-6">
            {stories
              .filter(
                (story) =>
                  !categorySearch ||
                  (story.category &&
                    story.category.toLowerCase().includes(categorySearch)),
              )
              .map((story) => (
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
          <div className="grid md:grid-cols-2 gap-6">
            {recordings.length === 0 ? (
              <div className="text-center p-10 text-white text-xl font-bold">
                No recordings available yet. 🎧
              </div>
            ) : (
              recordings.map((rec) => (
                <Card
                  key={rec.id}
                  className="p-0 overflow-hidden group cursor-default hover:scale-105 transition duration-300"
                >
                  <div className="h-48 bg-gray-200">
                    {rec.story?.cover_image ? (
                      <img
                        src={rec.story.cover_image}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-3xl bg-white">
                        🎧
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-brand-text mb-2">
                      {rec.story?.title || "Untitled Story"}
                    </h3>
                    {rec.audioUrl ? (
                      <audio className="w-full" controls src={rec.audioUrl} />
                    ) : (
                      <div className="text-sm text-gray-400">
                        No audio file found
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )}
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
