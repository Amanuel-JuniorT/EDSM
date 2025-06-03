/*
  GettingStarted.jsx - Getting Started help page for EDSM
  ------------------------------------------------------
  - Provides onboarding and introductory help for new users.
  - For backend/frontend devs: Update onboarding or help content here as needed.
*/
import React from 'react';
import { FaArrowLeft, FaChartLine, FaWallet, FaStar, FaNewspaper } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Help.css';

export default function GettingStarted() {
  return (
    <div className="help-page">
      <div className="help-header">
        <Link to="/settings" state={{ activeTab: 'help' }} className="back-link">
          <FaArrowLeft /> Back to Settings
        </Link>
        <h1>Getting Started with EDSM</h1>
        <p className="help-subtitle">Your comprehensive guide to trading and portfolio management</p>
      </div>

      <div className="help-content">
        <section className="help-section">
          <h2>Welcome to EDSM</h2>
          <p>EDSM is your all-in-one platform for stock trading and portfolio management. This guide will help you get started with the essential features and make the most of your trading experience.</p>
        </section>

        <section className="help-section">
          <h2>Key Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <FaChartLine className="feature-icon" />
              <h3>Market Overview</h3>
              <p>Access real-time market data, track stock prices, and analyze market trends. Use advanced filters to find stocks that match your investment criteria.</p>
            </div>
            <div className="feature-card">
              <FaWallet className="feature-icon" />
              <h3>Portfolio Management</h3>
              <p>Track your investments, monitor performance, and manage your portfolio with ease. Add funds and execute trades directly from your dashboard.</p>
            </div>
            <div className="feature-card">
              <FaStar className="feature-icon" />
              <h3>Watchlist</h3>
              <p>Create and manage your watchlist to keep track of stocks you're interested in. Get instant notifications for price changes and important updates.</p>
            </div>
            <div className="feature-card">
              <FaNewspaper className="feature-icon" />
              <h3>Market News</h3>
              <p>Stay informed with the latest market news, company updates, and financial insights. Filter news by categories and save articles for later reading.</p>
            </div>
          </div>
        </section>

        <section className="help-section">
          <h2>Getting Started Steps</h2>
          <ol className="steps-list">
            <li>
              <h3>1. Set Up Your Account</h3>
              <p>Complete your profile and verify your account to access all features. Add funds to your account to start trading.</p>
            </li>
            <li>
              <h3>2. Explore the Dashboard</h3>
              <p>Familiarize yourself with the dashboard layout. Customize your view to show the information most relevant to you.</p>
            </li>
            <li>
              <h3>3. Create Your Watchlist</h3>
              <p>Add stocks to your watchlist to track their performance. Use the star icon in the Market page to add stocks.</p>
            </li>
            <li>
              <h3>4. Make Your First Trade</h3>
              <p>Research stocks using our market data and news. When ready, use the Buy/Sell widget to execute your first trade.</p>
            </li>
          </ol>
        </section>

        <section className="help-section">
          <h2>Tips for Success</h2>
          <ul className="tips-list">
            <li>Start with a small investment to get comfortable with the platform</li>
            <li>Use the watchlist feature to track potential investments</li>
            <li>Stay informed with market news and updates</li>
            <li>Regularly review your portfolio performance</li>
            <li>Set up price alerts for stocks you're interested in</li>
          </ul>
        </section>

        <section className="help-section">
          <h2>Need More Help?</h2>
          <p>If you need additional assistance, check out our <Link to="/faq">FAQ section</Link> or <Link to="/contact">contact our support team</Link>.</p>
        </section>
      </div>
    </div>
  );
} 