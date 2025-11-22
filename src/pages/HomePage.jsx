import React, { useState, useEffect } from "react";
import { api, mockStories } from "../services/api";
import StoryCard from "../components/StoryCard";

const HomePage = () => {
  const [stories, setStories] = useState(mockStories);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try to fetch from API, fallback to mock data
    setLoading(true);
    api
      .getStories()
      .then((data) => setStories(data))
      .catch(() => setStories(mockStories))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Welcome to StoryTime! 📚
          </h1>
          <p className="text-2xl text-gray-700 font-semibold">
            Discover amazing stories from cultures around the world!
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
            <p className="text-2xl font-bold text-gray-700 mt-4">
              Loading stories...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
