import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/auth/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import ProfileSelectionPage from "./pages/auth/ProfileSelectionPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateStoryPage from "./pages/admin/CreateStoryPage";
import ManageCategoriesPage from "./pages/admin/ManageCategoriesPage";
import ManageIllustrationsPage from "./pages/admin/ManageIllustrationsPage";
import ParentDashboard from "./pages/parent/ParentDashboard";
import AppLayout from "./components/layout/AppLayout";
import ChildLibraryView from "./pages/child/ChildLibraryView";
import StoryReadingPage from "./pages/child/StoryReadingPage";
import CustomStoryCreator from "./components/modals/CustomStoryCreator";
import RegisterPage from "./pages/auth/RegisterPage";
import RecordingStudio from "./pages/parent/RecordingStudio";
import SessionTimer from "./components/ui/SessionTimer";
import { SessionProvider } from "./context/SessionContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const savedProfile = localStorage.getItem("active_profile");

    if (token) {
      setIsAuthenticated(true);
      // Determine role purely from localstorage or API logic in Login
      // For this implementation, we assume login page set 'user_role'
      // or check a backend /me endpoint if available.
      // Fallback check:
      const userRole = localStorage.getItem("user_role"); // 'admin' or 'parent'
      setIsAdmin(userRole === "admin");

      if (savedProfile) {
        setActiveProfile(JSON.parse(savedProfile));
      }
    }
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6C7B6] text-white font-bold">
        Loading StoryTime...
      </div>
    );

  // Guard Wrapper
  const Protected = ({ children, requireAdmin }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (requireAdmin && !isAdmin) return <Navigate to="/profiles" />;
    return children;
  };

  return (
    <SessionProvider>
      <SessionTimer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              setIsAuthenticated={setIsAuthenticated}
              setIsAdmin={setIsAdmin}
            />
          }
        />

        <Route
          path="/register"
          element={
            <RegisterPage
              setIsAuthenticated={setIsAuthenticated}
              setIsAdmin={setIsAdmin}
            />
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <Protected requireAdmin>
              <AdminDashboard />
            </Protected>
          }
        />
        <Route
          path="/admin/create"
          element={
            <Protected requireAdmin>
              <CustomStoryCreator />
            </Protected>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <Protected requireAdmin>
              <ManageCategoriesPage />
            </Protected>
          }
        />
        <Route
          path="/admin/illustrations"
          element={
            <Protected requireAdmin>
              <ManageIllustrationsPage />
            </Protected>
          }
        />

        {/* Parent/Child Routes */}
        <Route
          path="/profiles"
          element={
            <Protected>
              <ProfileSelectionPage setActiveProfile={setActiveProfile} />
            </Protected>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <ParentDashboard />
            </Protected>
          }
        />

        <Route
          path="/dashboard/studio"
          element={
            <Protected>
              <RecordingStudio />
            </Protected>
          }
        />

        {/* Child App */}
        <Route
          path="/app"
          element={
            <Protected>
              <AppLayout />
            </Protected>
          }
        >
          <Route index element={<Navigate to="stories" replace />} />
          <Route
            path="stories"
            element={<ChildLibraryView activeProfile={activeProfile} />}
          />
        </Route>

        <Route
          path="/story/:id"
          element={
            <Protected>
              <StoryReadingPage activeProfile={activeProfile} />
            </Protected>
          }
        />
      </Routes>
    </SessionProvider>
  );
};

export default App;
