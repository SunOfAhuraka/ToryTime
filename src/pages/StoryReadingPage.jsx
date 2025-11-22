import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { api, mockStories } from "../services/api";
import AudioPlayer from "../components/AudioPlayer";
import QuizComponent from "../components/QuizComponent";

const StoryReadingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate fetching specific story
    // In production: api.getStory(id)
    const foundStory = mockStories.find((s) => s.id === parseInt(id));

    if (foundStory) {
      setStory(foundStory);
    } else {
      // Fallback attempt to API
      api
        .getStory(id)
        .then((data) => setStory(data))
        .catch((err) => console.log("Story not found"));
    }
    setLoading(false);
  }, [id]);

  if (loading || !story) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-purple-600">
        Loading Story...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto p-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-bold text-lg text-purple-600"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back to Stories</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="h-96 overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200">
            <img
              src={story.illustration}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-4 py-2 bg-yellow-300 text-yellow-800 rounded-full text-lg font-bold">
                {story.culture}
              </span>
              <span className="px-4 py-2 bg-purple-300 text-purple-800 rounded-full text-lg font-bold">
                {story.category}
              </span>
            </div>

            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              {story.title}
            </h1>

            <div className="prose prose-lg max-w-none">
              {story.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-2xl leading-relaxed text-gray-700 mb-6"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <AudioPlayer audioUrl={story.audio_url} />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-purple-600">
              Quiz Time! 🎯
            </h2>
            <button
              onClick={() => setShowQuiz(!showQuiz)}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg hover:from-green-600 hover:to-blue-600"
            >
              {showQuiz ? "Hide Quiz" : "Start Quiz"}
            </button>
          </div>

          {showQuiz && <QuizComponent quiz={story.quiz} />}
        </div>
      </div>
    </div>
  );
};

export default StoryReadingPage;
