import React, { createContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [isChildMode, setIsChildMode] = useState(false);
  const location = useLocation();

  // Start session when child logs in
  const startSession = useCallback(() => {
    setSessionStartTime(Date.now());
    setIsChildMode(true);
  }, []);

  // End session when child logs out
  const endSession = useCallback(() => {
    setSessionStartTime(null);
    setIsChildMode(false);
  }, []);

  // Monitor route changes to auto-start/end session
  useEffect(() => {
    const currentPath = location.pathname;
    const isChildRoute =
      currentPath.startsWith("/app") || currentPath.startsWith("/story");

    if (isChildRoute) {
      // Start a new session if we're entering child routes and session doesn't exist
      if (!sessionStartTime) {
        startSession();
      }
    } else {
      // End session if we're leaving child routes
      if (sessionStartTime) {
        endSession();
      }
    }
  }, [location.pathname, sessionStartTime, startSession, endSession]);

  return (
    <SessionContext.Provider
      value={{
        sessionStartTime,
        isChildMode,
        startSession,
        endSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
};
