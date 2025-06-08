import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";

/*
  Sidebar.jsx - Main sidebar navigation for EDSM
  ---------------------------------------------
  - Renders navigation links for all main app sections.
  - For backend/frontend devs: Add or change navigation links here as needed.
*/

// Sidebar.jsx - Navigation sidebar for main app sections
function Sidebar() {
  const navigate = useNavigate();
  const { user, logout, isCheckingAuth, checkAuth } = useAuthStore();

  // useEffect(() => {
  //   // Check if user is authenticated on mount
  //   checkAuth();
  // }, [checkAuth]);

  const handleLogout = () => {
    logout(true);
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* App logo/title */}
        <h2>
          <i className="fas fa-chart-line"></i> EDSM
        </h2>
      </div>
      <div className="sidebar-menu">
        {/* Navigation links for main sections */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <i className="fas fa-home"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/market"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <i className="fas fa-store"></i>
          <span>Market</span>
        </NavLink>
        <NavLink
          to="/portfolio"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <i className="fas fa-wallet"></i>
          <span>Portfolio</span>
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <i className="fas fa-newspaper"></i>
          <span>News</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </NavLink>
      </div>
      <div className="sidebar-footer">
        {/* User profile info and logout */}
        <div className="user-profile">
          {isCheckingAuth || !user ? (
            <div style={{width: "10px", height: "10px"}} className="loading-spinner" />
          ) : (
            <>
              <div className="user-avatar">{user.firstName.split("")[0]}</div>
            </>
          )}
          <div className="user-info">
            {!user ? (
              <div
                className="skeleton-header"
                style={{
                  height: "40px",
                  width: "200px",
                  background: "#eee",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              />
            ) : (
              <>
                <div className="user-name">{`${user.firstName} ${user.lastName}`}</div>
                <div className="user-email">{user.email}</div>
              </>
            )}
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
