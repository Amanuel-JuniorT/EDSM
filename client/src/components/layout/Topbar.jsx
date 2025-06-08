/*
  Topbar.jsx - Main topbar/header for EDSM
  ---------------------------------------
  - Renders the topbar with notification, profile, and theme toggle.
  - For backend/frontend devs: Add global actions, user info, or notifications here as needed.
*/
import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuthStore } from "../../store/useAuthStore";

// Topbar.jsx - Top navigation bar with notifications, profile, and theme toggle
function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, checkAuth, isCheckingAuth } = useAuthStore();

  // useEffect(() => {
  //   // Check if user is authenticated on mount
  //   checkAuth();
  // }, [checkAuth]);

  return (
    <div className="topbar">
      <div className="topbar-icons">
        {/* Notification button */}
        <button
          id="notification-btn"
          className="notification-btn"
          aria-label="Notifications"
        >
          <i className="fas fa-bell"></i>
          <span className="notification-badge"></span>
        </button>
        {/* Profile icon */}
        <div className="profile-icon" aria-label="Profile">
        {!user ? (
            <div className="loading-spinner" />
          ) : (
            <img
              src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=007bff&color=fff&rounded=true&size=32`}
              alt="Profile"
            />
          )}
        </div>
        {/* Theme toggle button */}
        <button
          id="theme-toggle-btn"
          aria-label="Toggle dark/light mode"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <span
            className="theme-icon"
            id="theme-toggle-icon"
            role="img"
            aria-hidden="true"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Topbar;
