/*
  Settings.jsx - Settings page for EDSM
  ------------------------------------
  - Allows users to manage security, appearance, and help/support settings.
  - For backend/frontend devs: Add new settings, tabs, or logic here as needed.
*/
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaUserCircle,
  FaLock,
  FaPalette,
  FaQuestionCircle,
  FaPlayCircle,
  FaInfoCircle,
  FaTools,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Settings/Settings.css";
import { useAuthStore } from "../store/useAuthStore";

const user = {
  name: "Nati Ha",
};

const sidebarItems = [
  { key: "security", label: "Security and Privacy", icon: <FaLock /> },
  { key: "appearance", label: "App appearance", icon: <FaPalette /> },
];

const tabs = [
  { key: "setting", label: "Setting" },
  { key: "help", label: "Help" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("setting");
  const [activeSidebar, setActiveSidebar] = useState("security");
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { user } = useAuthStore();

  useEffect(() => {
    // Check if we have state from navigation
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="settings-user-info">
          <FaUserCircle className="settings-user-avatar" />
          <div>
            <h1 className="settings-user">
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
                user.firstName
              )}
            </h1>
            <div className="settings-user-role">Trader</div>
          </div>
        </div>
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`settings-tab${
                activeTab === tab.key ? " active" : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="settings-content-row">
        <div className="settings-menu">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              className={`settings-menu-item${
                activeSidebar === item.key ? " active" : ""
              }`}
              onClick={() => setActiveSidebar(item.key)}
            >
              <span className="settings-menu-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="settings-main-content">
          {activeTab === "setting" && activeSidebar === "security" && (
            <div className="settings-card">
              <div className="settings-section-title">Security and Privacy</div>
              <div className="settings-section-list">
                <div className="settings-section-title">Security</div>
                <div className="settings-section-desc">
                  Keep your EDSM account secure with additional layers of
                  protection.
                </div>
                <div className="settings-section-list-row">
                  Password{" "}
                  <span className="settings-section-action">
                    Update Password
                  </span>
                </div>
                <div className="settings-section-list-row">
                  Two-factor Authentication{" "}
                  <span
                    className="settings-section-action"
                    style={{ color: "#888" }}
                  >
                    Disabled &gt;
                  </span>
                </div>
                <div className="settings-section-list-row">Devices</div>
                <div className="settings-section-list-row">Linked apps</div>
              </div>
              <div className="settings-section-list">
                <div
                  className="settings-section-title"
                  style={{ marginTop: 32 }}
                >
                  Privacy
                </div>
                <div className="settings-section-desc">
                  Manage how your data is used
                </div>
                <div className="settings-section-list-row">
                  Data Sharing permissions{" "}
                  <span className="settings-section-action">Enabled</span>
                </div>
                <div className="settings-section-list-row">
                  Request Personal Data
                </div>
                <div className="settings-section-list-row">
                  Request Data Deletion
                </div>
                <div className="settings-section-list-row">
                  Privacy Policy{" "}
                  <span className="settings-section-action">&gt;</span>
                </div>
              </div>
              <div className="settings-logout">
                <button className="logout-btn">
                  <FaSignOutAlt /> Log Out
                </button>
              </div>
            </div>
          )}
          {activeTab === "setting" && activeSidebar === "appearance" && (
            <div className="settings-card">
              <div className="settings-section-title">App Appearance</div>
              <div className="settings-section-list">
                <div className="settings-section-list-row">
                  Theme
                  <span>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </span>
                </div>
                <div className="settings-section-list-row">
                  Accessible Colors{" "}
                  <span>
                    <input type="checkbox" />
                  </span>
                </div>
                <div
                  className="settings-section-list-row"
                  style={{ color: "#bbb" }}
                >
                  Best of red-green colorblindness
                </div>
              </div>
            </div>
          )}
          {activeTab === "help" && (
            <div className="settings-card help-card-group">
              <div className="help-header">
                <FaQuestionCircle className="help-header-icon" /> Help &amp;
                Support
                <div className="help-subtitle">
                  Find answers, tips, and ways to get in touch with our team.
                </div>
              </div>
              <div className="help-cards">
                <div className="help-card">
                  <div className="help-card-icon">
                    <FaPlayCircle />
                  </div>
                  <div className="help-card-content">
                    <h3>Getting Started</h3>
                    <p>
                      Learn how to set up your account, explore the dashboard,
                      and start trading on EDSM.
                    </p>
                    <Link to="/getting-started">
                      Read the Getting Started Guide
                    </Link>
                  </div>
                </div>
                <div className="help-card">
                  <div className="help-card-icon">
                    <FaInfoCircle />
                  </div>
                  <div className="help-card-content">
                    <h3>Frequently Asked Questions</h3>
                    <p>
                      Find quick answers to the most common questions about
                      using EDSM.
                    </p>
                    <Link to="/faq">View FAQs</Link>
                  </div>
                </div>
                <div className="help-card">
                  <div className="help-card-icon">
                    <FaTools />
                  </div>
                  <div className="help-card-content">
                    <h3>Troubleshooting</h3>
                    <p>
                      Having issues? Check our troubleshooting tips for common
                      problems and solutions.
                    </p>
                    <Link to="/troubleshooting">Troubleshooting Tips</Link>
                  </div>
                </div>
                <div className="help-card">
                  <div className="help-card-icon">
                    <FaEnvelope />
                  </div>
                  <div className="help-card-content">
                    <h3>Contact Support</h3>
                    <p>
                      Still need help? Reach out to our support team for
                      personalized assistance.
                    </p>
                    <Link to="/contact">Contact Us</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
