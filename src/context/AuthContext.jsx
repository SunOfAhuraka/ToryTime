import React, { createContext, useContext, useState } from "react";
import { PARENT_DATABASE } from "../data/mockData";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [parentData, setParentData] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  const [isParentMode, setIsParentMode] = useState(false);

  const login = (email, password) => {
    // 1. Check for Admin Login
    if (email === "admin@storytime.com" && password === "admin123") {
      setIsAuthenticated(true);
      setIsAdmin(true);
      setParentData({ name: "Super Admin" });
      return true;
    }

    // 2. Check for Parent Login
    const parent = PARENT_DATABASE[email];
    if (parent && parent.password === password) {
      setIsAuthenticated(true);
      setIsAdmin(false);
      setParentData({ ...parent });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setParentData(null);
    setActiveProfile(null);
    setIsParentMode(false);
    setIsAdmin(false);
  };

  // --- MISSING FUNCTIONS ADDED BELOW ---

  const selectProfile = (profile, mode = "child") => {
    setActiveProfile(profile);
    setIsParentMode(mode === "parent");
  };

  const addChild = (childData) => {
    setParentData((prev) => ({
      ...prev,
      children: [
        ...prev.children,
        {
          ...childData,
          id: `child_${Date.now()}`,
        },
      ],
    }));
  };

  const addRecording = (childId, storyId, blobUrl) => {
    setParentData((prev) => ({
      ...prev,
      recordings: {
        ...prev.recordings,
        [childId]: {
          ...prev.recordings[childId],
          [storyId]: { blobUrl, recordedAt: new Date().toISOString() },
        },
      },
    }));
  };

  const addCustomStory = (story) => {
    setParentData((prev) => ({
      ...prev,
      customStories: [
        ...prev.customStories,
        {
          ...story,
          id: `custom_${Date.now()}`,
          author: prev.name,
        },
      ],
    }));
  };

  const saveQuizScore = (childId, storyId, score, total) => {
    setParentData((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [`${childId}_${storyId}`]: {
          score,
          total,
          date: new Date().toISOString(),
        },
      },
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        parentData,
        activeProfile,
        isParentMode,
        login,
        logout,
        selectProfile, // Now defined above
        addChild, // Now defined above
        addRecording, // Now defined above
        addCustomStory, // Now defined above
        saveQuizScore, // Now defined above
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
