import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ContentProvider } from "./context/ContentContext";

// Import Pages from the new structure
import LoginPage from "./pages/auth/LoginPage";
import ProfileSelectionPage from "./pages/auth/ProfileSelectionPage";
import ParentDashboard from "./pages/parent/ParentDashboard";
import ChildLibraryView from "./pages/child/ChildLibraryView";

// This component handles the logic of WHICH screen to show
// based on the current authentication state.
import AdminDashboard from "./pages/admin/AdminDashboard"; // Import the new page

const AppContent = () => {
  const { isAuthenticated, activeProfile, isParentMode, isAdmin } = useAuth(); // Get isAdmin

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // NEW: Check for Admin Role first
  if (isAdmin) {
    return <AdminDashboard />;
  }

  if (!activeProfile && !isParentMode) {
    return <ProfileSelectionPage />;
  }

  if (isParentMode) {
    return <ParentDashboard />;
  }

  return <ChildLibraryView />;
};

// The Main Export: Wraps the logic in the Data Providers
const App = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <AppContent />
      </ContentProvider>
    </AuthProvider>
  );
};

export default App;
