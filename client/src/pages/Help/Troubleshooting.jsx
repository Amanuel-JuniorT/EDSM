/*
  Troubleshooting.jsx - Troubleshooting help page for EDSM
  -------------------------------------------------------
  - Provides solutions to common user issues and problems.
  - For backend/frontend devs: Update troubleshooting content or logic here as needed.
*/
import React, { useState } from 'react';
import { FaArrowLeft, FaExclamationTriangle, FaCheckCircle, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Help.css';

export default function Troubleshooting() {
  const [searchTerm, setSearchTerm] = useState('');

  const issues = [
    {
      category: "Login & Account",
      problems: [
        {
          title: "Can't log in to my account",
          symptoms: ["Login page not responding", "Invalid credentials error", "Account locked"],
          solutions: [
            "Clear your browser cache and cookies",
            "Reset your password using the 'Forgot Password' link",
            "Check if your account is locked due to multiple failed attempts",
            "Ensure you're using the correct email/username"
          ]
        },
        {
          title: "Two-factor authentication issues",
          symptoms: ["2FA code not working", "Can't receive SMS codes", "App authenticator not syncing"],
          solutions: [
            "Check your device's time settings",
            "Request a new code",
            "Use backup codes if available",
            "Contact support to reset 2FA"
          ]
        }
      ]
    },
    {
      category: "Trading & Orders",
      problems: [
        {
          title: "Orders not executing",
          symptoms: ["Order pending for too long", "Order rejected", "Insufficient funds error"],
          solutions: [
            "Check your available balance",
            "Verify order price is within market limits",
            "Ensure you have sufficient buying power",
            "Check for any trading restrictions"
          ]
        },
        {
          title: "Portfolio not updating",
          symptoms: ["Holdings not reflecting", "Balance incorrect", "Recent trades not showing"],
          solutions: [
            "Refresh the page",
            "Check your internet connection",
            "Clear browser cache",
            "Wait a few minutes for updates to process"
          ]
        }
      ]
    },
    {
      category: "Technical Issues",
      problems: [
        {
          title: "Platform loading slowly",
          symptoms: ["Long loading times", "Charts not rendering", "Data delays"],
          solutions: [
            "Check your internet connection",
            "Clear browser cache and cookies",
            "Try a different browser",
            "Disable browser extensions"
          ]
        },
        {
          title: "Charts not displaying",
          symptoms: ["Blank chart area", "Missing data points", "Incorrect timeframes"],
          solutions: [
            "Refresh the page",
            "Check your internet connection",
            "Try a different timeframe",
            "Clear browser cache"
          ]
        }
      ]
    },
    {
      category: "Mobile App",
      problems: [
        {
          title: "App crashes on startup",
          symptoms: ["App closes immediately", "White screen", "Loading indefinitely"],
          solutions: [
            "Update to the latest version",
            "Clear app cache and data",
            "Reinstall the app",
            "Check device compatibility"
          ]
        },
        {
          title: "Push notifications not working",
          symptoms: ["No price alerts", "Missing trade confirmations", "No news updates"],
          solutions: [
            "Check notification permissions",
            "Verify device settings",
            "Update app to latest version",
            "Reinstall the app"
          ]
        }
      ]
    }
  ];

  const filteredIssues = issues.map(category => ({
    ...category,
    problems: category.problems.filter(problem => 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.symptoms.some(symptom => 
        symptom.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  })).filter(category => category.problems.length > 0);

  return (
    <div className="help-page">
      <div className="help-header">
        <Link to="/settings" state={{ activeTab: 'help' }} className="back-link">
          <FaArrowLeft /> Back to Settings
        </Link>
        <h1>Troubleshooting Guide</h1>
        <p className="help-subtitle">Find solutions to common issues and problems</p>
      </div>

      <div className="help-content">
        <div className="troubleshooting-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="troubleshooting-search-input"
          />
        </div>

        <div className="troubleshooting-sections">
          {filteredIssues.map((category, categoryIndex) => (
            <div key={categoryIndex} className="troubleshooting-section">
              <h2>{category.category}</h2>
              {category.problems.map((problem, problemIndex) => (
                <div key={problemIndex} className="problem-card">
                  <div className="problem-header">
                    <FaExclamationTriangle className="problem-icon" />
                    <h3>{problem.title}</h3>
                  </div>
                  
                  <div className="problem-symptoms">
                    <h4>Common Symptoms:</h4>
                    <ul>
                      {problem.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="problem-solutions">
                    <h4>Possible Solutions:</h4>
                    <ul>
                      {problem.solutions.map((solution, index) => (
                        <li key={index}>
                          <FaCheckCircle className="solution-icon" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <section className="help-section">
          <h2>Still Having Issues?</h2>
          <p>If you're still experiencing problems, please <Link to="/contact">contact our support team</Link>. Make sure to include:</p>
          <ul>
            <li>Description of the issue</li>
            <li>Steps to reproduce</li>
            <li>Any error messages you're seeing</li>
            <li>Your browser/device information</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 