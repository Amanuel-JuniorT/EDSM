import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

/*
  Sidebar.jsx - Main sidebar navigation for EDSM
  ---------------------------------------------
  - Renders navigation links for all main app sections.
  - For backend/frontend devs: Add or change navigation links here as needed.
*/

// Sidebar.jsx - Navigation sidebar for main app sections
function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* App logo/title */}
        <h2><i className="fas fa-chart-line"></i> EDSM</h2>
      </div>
      <div className="sidebar-menu">
        {/* Navigation links for main sections */}
        <NavLink to="/dashboard" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <i className="fas fa-home"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/market" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <i className="fas fa-store"></i>
          <span>Market</span>
        </NavLink>
        <NavLink to="/portfolio" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <i className="fas fa-wallet"></i>
          <span>Portfolio</span>
        </NavLink>
        <NavLink to="/news" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <i className="fas fa-newspaper"></i>
          <span>News</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </NavLink>
      </div>
      <div className="sidebar-footer">
        {/* User profile info and logout */}
        <div className="user-profile">
          <div className="user-avatar">N</div>
          <div className="user-info">
            <div className="user-name">Natnael Habtamu</div>
            <div className="user-email">nati@edsm.et</div>
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