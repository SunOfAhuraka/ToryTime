import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mic,
  Square,
  Play,
  Save,
  ChevronLeft,
  Loader,
  RefreshCw,
  Clock,
} from "lucide-react";
import { api } from "../../api/client";

const RecordingStudio = () => {
  const navigate = useNavigate();

  // Data State
  const [stories, setStories] = useState([]);
  const [children, setChildren] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Selection State
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedChild, setSelectedChild] = useState(""); // "" means 'All Children' or 'Default'

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Refs
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  // 1. Fetch Stories and Children on mount
  useEffect(() => {
    const init = async () => {
      try {
        const [storiesRes, childrenRes] = await Promise.all([
          api.getStories(),
          api.getChildren(),
        ]);
        setStories(storiesRes.data);
        setChildren(childrenRes.data);
      } catch (err) {
        console.error("Failed to load studio data", err);
      } finally {
        setLoadingData(false);
      }
    };
    init();
  }, []);

  // 2. Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        // Create blob (webm is standard for browser recording)
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);

        // Stop all tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Reset and start timer
      setTimer(0);
      timerIntervalRef.current = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    } catch (err) {
      alert("Microphone access denied. Please check your browser permissions.");
      console.error(err);
    }
  };

  // 3. Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerIntervalRef.current);
    }
  };

  // 4. Reset / Re-record
  const resetRecording = () => {
    if (window.confirm("Discard this recording?")) {
      setAudioBlob(null);
      setAudioUrl(null);
      setTimer(0);
    }
  };

  // 5. Save to Backend
  const handleSave = async () => {
    if (!audioBlob || !selectedStory) return;

    setIsUploading(true);
    const formData = new FormData();
    // Rename file to .webm or .mp3 based on backend expectations, usually webm works
    formData.append("audio_file", audioBlob, `rec_${Date.now()}.webm`);
    formData.append("story", selectedStory.id);

    // Only append if specific child is selected
    if (selectedChild) {
      formData.append("for_child", selectedChild);
    }

    try {
      await api.uploadRecording(formData);
      alert("Recording saved successfully! Your child can now listen to it.");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to upload recording. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6C7B6]">
        <div className="text-2xl font-bold text-white">Loading Studio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6C7B6] p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 bg-white/20 rounded-full hover:bg-white/40 text-white transition"
            >
              <ChevronLeft />
            </button>
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              Recording Studio
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 flex-1">
          {/* Left Panel: Story Selector */}
          <div className="bg-[#F7EDE2] rounded-3xl p-6 shadow-xl flex flex-col overflow-hidden">
            <h2 className="text-xl font-bold text-[#4A4A4A] mb-4">
              Select a Story
            </h2>
            <div className="overflow-y-auto flex-1 space-y-3 pr-2">
              {stories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => {
                    setSelectedStory(story);
                    setAudioBlob(null); // Reset recording when changing story
                    setAudioUrl(null);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                    selectedStory?.id === story.id
                      ? "border-[#F28C38] bg-white shadow-md"
                      : "border-transparent bg-white/50 hover:bg-white"
                  }`}
                >
                  <h3 className="font-bold text-[#4A4A4A]">{story.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {story.script.substring(0, 50)}...
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: The Booth */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-xl flex flex-col">
            {selectedStory ? (
              <>
                {/* Script Display */}
                <div className="flex-1 overflow-y-auto mb-6 p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <h3 className="text-sm font-bold text-gray-400 uppercase mb-2 sticky top-0 bg-gray-50">
                    Script
                  </h3>
                  <p className="text-xl leading-loose text-gray-800 font-medium whitespace-pre-line">
                    {selectedStory.script}
                  </p>
                </div>

                {/* Controls Area */}
                <div className="bg-[#F7EDE2] rounded-2xl p-6">
                  {/* Settings Row */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                        Recording For
                      </label>
                      <select
                        value={selectedChild}
                        onChange={(e) => setSelectedChild(e.target.value)}
                        className="bg-white px-3 py-2 rounded-lg text-sm border focus:outline-none focus:border-[#F28C38]"
                      >
                        <option value="">All My Children</option>
                        {children.map((child) => (
                          <option key={child.id} value={child.id}>
                            {child.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {isRecording && (
                      <div className="flex items-center gap-2 text-red-500 font-bold animate-pulse">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        Recording {formatTime(timer)}
                      </div>
                    )}
                  </div>

                  {/* Button Row */}
                  <div className="flex items-center justify-center gap-6">
                    {!audioBlob ? (
                      <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                          isRecording
                            ? "bg-red-500 text-white"
                            : "bg-[#F28C38] text-white"
                        }`}
                      >
                        {isRecording ? (
                          <Square className="w-8 h-8 fill-current" />
                        ) : (
                          <Mic className="w-10 h-10" />
                        )}
                      </button>
                    ) : (
                      // Post-Recording Controls
                      <div className="flex items-center gap-4 w-full">
                        <audio
                          src={audioUrl}
                          controls
                          className="flex-1 h-12"
                        />
                        <button
                          onClick={resetRecording}
                          className="p-3 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
                          title="Record Again"
                        >
                          <RefreshCw className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isUploading}
                          className="flex items-center gap-2 px-8 py-3 bg-[#F28C38] text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50"
                        >
                          {isUploading ? (
                            <Loader className="animate-spin w-5 h-5" />
                          ) : (
                            <Save className="w-5 h-5" />
                          )}
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              // Empty State
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Mic className="w-24 h-24 mb-4 opacity-20" />
                <p className="text-xl font-bold">
                  Select a story to start recording
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingStudio;
