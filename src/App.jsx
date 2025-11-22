import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ChildNavbar from "./components/ChildNavbar";
import AdultNavbar from "./components/AdultNavbar";
import HomePage from "./pages/HomePage";
import StoryReadingPage from "./pages/StoryReadingPage";
import ParentLoginPage from "./pages/ParentLoginPage";
import ParentDashboard from "./pages/ParentDashboard";
import CreateStoryPage from "./pages/CreateStoryPage";
import ManageIllustrationsPage from "./pages/ManageIllustrationsPage";
import ManageCategoriesPage from "./pages/ManageCategoriesPage";

const App = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Determine which Navbar to show based on the route or user state
  // If logged in, show Adult Navbar on admin pages
  // If not, show Child Navbar on public pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen">
      {user && isAdminRoute ? (
        <AdultNavbar user={user} setUser={setUser} />
      ) : (
        !isAdminRoute && <ChildNavbar />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:id" element={<StoryReadingPage />} />
        <Route path="/login" element={<ParentLoginPage setUser={setUser} />} />

        {/* Protected Admin Routes - in a real app, use a ProtectedRoute wrapper */}
        <Route
          path="/admin"
          element={
            user ? (
              <ParentDashboard user={user} />
            ) : (
              <ParentLoginPage setUser={setUser} />
            )
          }
        />
        <Route
          path="/admin/create"
          element={
            user ? (
              <CreateStoryPage user={user} />
            ) : (
              <ParentLoginPage setUser={setUser} />
            )
          }
        />
        <Route
          path="/admin/illustrations"
          element={
            user ? (
              <ManageIllustrationsPage user={user} />
            ) : (
              <ParentLoginPage setUser={setUser} />
            )
          }
        />
        <Route
          path="/admin/categories"
          element={
            user ? (
              <ManageCategoriesPage user={user} />
            ) : (
              <ParentLoginPage setUser={setUser} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
