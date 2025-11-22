import React from "react";
import { useNavigate } from "react-router-dom";

const StoryCard = ({ story }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/story/${story.id}`)}
      className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
    >
      <div className="h-48 overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200">
        <img
          src={story.illustration}
          alt={story.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="px-4 py-1 bg-yellow-300 text-yellow-800 rounded-full text-sm font-bold">
            {story.culture}
          </span>
          <span className="px-4 py-1 bg-purple-300 text-purple-800 rounded-full text-sm font-bold">
            {story.category}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{story.title}</h3>
        <p className="text-gray-600 text-lg leading-relaxed line-clamp-3">
          {story.summary}
        </p>
        <button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all text-lg">
          Read Story 📖
        </button>
      </div>
    </div>
  );
};

export default StoryCard;
