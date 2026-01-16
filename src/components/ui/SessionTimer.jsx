import React, { useState, useEffect } from "react";
import { Clock, X } from "lucide-react";
import { useSession } from "../../context/SessionContext";

const SessionTimer = () => {
  const { sessionStartTime, isChildMode } = useSession();
  const [seconds, setSeconds] = useState(0);
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    if (!isChildMode || !sessionStartTime || !showTimer) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
      setSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [isChildMode, sessionStartTime, showTimer]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  if (!isChildMode || !showTimer) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-brand-primary text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 max-w-sm">
      <Clock className="w-5 h-5 flex-shrink-0" />
      <div className="flex-grow">
        <p className="text-xs font-semibold opacity-80">Time on Platform</p>
        <p className="text-lg font-bold">{formatTime(seconds)}</p>
      </div>
      <button
        onClick={() => setShowTimer(false)}
        className="text-white hover:opacity-70 transition flex-shrink-0"
        title="Hide timer"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SessionTimer;
