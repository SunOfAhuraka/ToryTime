import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { GLOBAL_STORIES } from "../data/mockData";

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const { parentData, activeProfile } = useAuth();

  const getStoriesForChild = () => {
    if (!activeProfile) return GLOBAL_STORIES;

    const customStories = parentData?.customStories || [];
    return [...GLOBAL_STORIES, ...customStories];
  };

  const getAudioForStory = (storyId) => {
    if (!activeProfile || !parentData) {
      const story = GLOBAL_STORIES.find((s) => s.id === storyId);
      return story?.defaultAudio || null;
    }

    const recording = parentData.recordings?.[activeProfile.id]?.[storyId];
    if (recording?.blobUrl) {
      return recording.blobUrl;
    }

    const story = GLOBAL_STORIES.find((s) => s.id === storyId);
    return story?.defaultAudio || null;
  };

  return (
    <ContentContext.Provider value={{ getStoriesForChild, getAudioForStory }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
