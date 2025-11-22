import React, { useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-2xl">🎧 Listen to Story</h3>
        <Volume2 className="w-8 h-8 text-white" />
      </div>
      <div className="bg-white bg-opacity-30 rounded-full h-3 mb-4 overflow-hidden">
        <div
          className="bg-white h-full rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white text-purple-600 rounded-full p-4 hover:bg-gray-100 transition-all shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </button>
      </div>
      {!audioUrl && (
        <p className="text-white text-center mt-4 text-sm">
          Audio coming soon!
        </p>
      )}
    </div>
  );
};

export default AudioPlayer;
