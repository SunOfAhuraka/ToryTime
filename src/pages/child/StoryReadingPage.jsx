import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Volume2, Pause, Play, Award } from "lucide-react";
import { api } from "../../api/client"; // Use your real API client
import QuizView from "../../components/quiz/QuizView";
import ChildBottomNav from "../../components/navigation/ChildBottomNav";

const StoryReadingPage = ({ activeProfile }) => {
  // 1. Logic to get ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. State for Data (Replacing Context)
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [audioUrl, setAudioUrl] = useState(null);
  const [hasCustomRecording, setHasCustomRecording] = useState(false);

  // 3. UI State
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // 4. Audio Reference
  const audioRef = useRef(new Audio());

  // 5. Fetch Data from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch all stories to find the current one
        const storiesRes = await api.getStories();
        // Loose equality check (string vs int ID)
        const currentStory = storiesRes.data.find((s) => s.id == id);

        if (currentStory) {
          setStory(currentStory);

          // Smart Audio Check: Does Parent audio exist?
          if (activeProfile) {
            try {
              const audioRes = await api.checkAudio(
                currentStory.id,
                activeProfile.id,
              );

              if (audioRes.data.audio_url) {
                // Found Parent Audio
                console.log("Custom audio found for story");
                const fullUrl = audioRes.data.audio_url.startsWith("http")
                  ? audioRes.data.audio_url
                  : `http://localhost:8000${audioRes.data.audio_url}`;

                setAudioUrl(fullUrl);
                setHasCustomRecording(true);
              } else if (currentStory.default_audio) {
                // Fallback to Default
                setAudioUrl(currentStory.default_audio);
                setHasCustomRecording(false);
              }
            } catch (e) {
              console.warn("Audio check failed");
              if (currentStory.default_audio)
                setAudioUrl(currentStory.default_audio);
            }
          }
        }
      } catch (err) {
        console.error("Error loading story", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, activeProfile]);

  // 6. Handle Audio Playback
  useEffect(() => {
    if (audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.onended = () => setIsPlaying(false);
    }
    return () => {
      audioRef.current.pause(); // Cleanup on unmount
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.error("Playback error:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const onBack = () => {
    navigate("/app/stories");
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F6C7B6" }}
      >
        <div className="text-white font-bold text-xl">Loading Story...</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F6C7B6" }}
      >
        <div className="text-white font-bold text-xl">Story not found.</div>
      </div>
    );
  }

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
            // Handle snake_case from backend if not normalized
            src={
              story.coverImage ||
              story.cover_image ||
              "https://placehold.co/600x400"
            }
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
                onClick={togglePlay}
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
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {story.script}
          </p>
        </div>
      </div>

      <ChildBottomNav activeTab="read" />
    </div>
  );
};

export default StoryReadingPage;
