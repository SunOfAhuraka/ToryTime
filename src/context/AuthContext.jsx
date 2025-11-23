import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [parentData, setParentData] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  const [isParentMode, setIsParentMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing token on reload
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // Try to fetch profile with existing token
          const profile = await api.getProfile();
          setParentData(profile);
          setIsAuthenticated(true);
        } catch (err) {
          // Token expired or invalid
          localStorage.removeItem('access_token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // 1. Admin Hardcoded Check (Optional, or move to backend)
      if (email === "admin@storytime.com" && password === "admin123") {
        setIsAuthenticated(true);
        setIsAdmin(true);
        setParentData({ name: "Super Admin", children: [] });
        return true;
      }

      // 2. Real Backend Login
      const profile = await api.login({ username: email, password }); // Django usually expects 'username'
      
      setParentData(profile);
      setIsAuthenticated(true);
      setIsAdmin(false);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setParentData(null);
    setActiveProfile(null);
    setIsParentMode(false);
    setIsAdmin(false);
  };

  const selectProfile = (profile, mode = 'child') => {
    setActiveProfile(profile);
    setIsParentMode(mode === 'parent');
  };

  const addChild = async (childData) => {
    try {
      const newChild = await api.createChild(childData);
      setParentData(prev => ({
        ...prev,
        children: [...prev.children, newChild]
      }));
    } catch (err) {
      console.error("Failed to add child", err);
    }
  };

  // Stub functions - These can be expanded to use API later
  const addRecording = () => {}; 
  const addCustomStory = () => {};
  const saveQuizScore = () => {};

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
        selectProfile,
        addChild,
        addRecording,
        addCustomStory,
        saveQuizScore,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);