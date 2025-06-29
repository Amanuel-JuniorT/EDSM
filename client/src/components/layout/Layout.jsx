import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

/*
  Layout.jsx - Main layout wrapper for EDSM
  ----------------------------------------
  - Wraps all main app pages with sidebar, topbar, and content area.
  - For backend/frontend devs: Add global wrappers (e.g., modals, notifications) here if needed.
*/

// Layout.jsx - Wraps main pages with sidebar and topbar
function Layout() {
  return (
    <div className="app-container">
      {/* Topbar at the top */}
      <Topbar />
      <div className="main-container">
        {/* Sidebar on the left */}
        <Sidebar />
        {/* Main content area */}
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
