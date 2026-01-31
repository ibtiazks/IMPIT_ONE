import React, { useState, useEffect } from "react";
import LoginPortal from "./modules/LoginPortal";
import DashboardShell from "./components/DashboardShell";

const App = () => {
  // Check local storage for auth state so refresh doesn't log you out immediately
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <>
      {isAuthenticated ? (
        <DashboardShell onSignOut={handleSignOut} />
      ) : (
        <LoginPortal onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
