import React, { useState } from "react";
import { Volume2, Pause, Play, Award } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { useAuth } from "../../context/AuthContext";
import QuizView from "../../components/quiz/QuizView";
import ChildBottomNav from "../../components/navigation/ChildBottomNav";

const StoryReadingPage = ({ story, onBack }) => {
  const { getAudioForStory } = useContent();
  const { activeProfile } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [audioSrc] = useState(() => getAudioForStory(story.id));

  const hasCustomRecording = audioSrc && audioSrc !== story.defaultAudio;

  if (showQuiz) {
    return (
      <QuizView
        story={story}
        onComplete={onBack}
        onBack={() => setShowQuiz(false)}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "#F6C7B6" }}>
      <div className="p-6">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 rounded-lg text-white"
          style={{ backgroundColor: "#5EC4D0" }}
        >
          ← Back to Library
        </button>

        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{ backgroundColor: "#F7EDE2" }}
        >
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#F28C38" }}
            >
              {story.title}
            </h1>
            <p className="text-gray-600 mb-4">by {story.author}</p>

            {hasCustomRecording && (
              <div
                className="flex items-center gap-2 p-3 rounded-lg mb-4"
                style={{ backgroundColor: "#5EC4D0", color: "white" }}
              >
                <Volume2 className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  Playing with Parent's voice
                </span>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold"
                style={{ backgroundColor: "#F28C38" }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                {isPlaying ? "Pause" : "Play Story"}
              </button>

              {story.quiz && story.quiz.length > 0 && (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold"
                  style={{ backgroundColor: "#5EC4D0" }}
                >
                  <Award className="w-5 h-5" />
                  Take Quiz
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl" style={{ backgroundColor: "#F7EDE2" }}>
          <h2 className="text-xl font-bold mb-4">Story Text</h2>
          <p className="text-lg leading-relaxed">{story.script}</p>
        </div>
      </div>

      <ChildBottomNav activeTab="read" />
    </div>
  );
};

export default StoryReadingPage;
