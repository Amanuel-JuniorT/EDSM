import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import EnterCode from "./components/EnterCode";
import ErrorBoundary from "./components/ErrorBoundary";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import Layout from "./components/layout/Layout";
import Portfolio from "./pages/Portfolio";
import Settings from "./pages/Settings";
import News from "./pages/News";
import StockDetail from "./pages/StockDetail";
import Watchlist from "./pages/Watchlist";
// Admin imports
import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/Dashboard";
import Users from "./admin/pages/Users";
import Stocks from "./admin/pages/Stocks";
import Transactions from "./admin/pages/Transactions";
// Placeholders for missing pages
import Verifications from "./admin/pages/Verifications";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminNews from "./admin/pages/News";
import "./admin/styles/admin.css";

const App = () => {
  const { isCheckingAuth, checkAuth, user } = useAuthStore();

  console.log("App rendered");

  useEffect(() => {
    // Check authentication status when the app loads
    if (!user) checkAuth();

    // Fetch user balance if authenticated
  }, [user, checkAuth]);

  return (
    <ErrorBoundary>
      {/* <ProgressBar currentStep={step} /> */}
      {/* <button
        className="theme-toggle-btn"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button> */}

      {/* {isCheckingAuth && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )} */}

      {/* Route to market */}

      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="stocks" element={<Stocks />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="verifications" element={<Verifications />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Route to market */}
        <Route path="/market" element={<Layout />}>
          <Route index element={<Market />} />
        </Route>

        <Route path="/stock/:symbol" element={<Layout />}>
          <Route index element={<StockDetail />} />
        </Route>

        {/* Route to signup */}
        <Route
          path="/signup"
          element={
            user == null || !user.isVerified ? (
              <SignUp />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Route to login */}
        <Route
          path="/login"
          element={
            user == null ? (
              <Login />
            ) : user.isVerified ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/verify-email" />
            )
          }
        />

        {/* Redirect root path based on user authentication and verification status */}
        <Route
          path="/"
          element={
            user == null ? (
              <Navigate to="/login" />
            ) : user.isVerified ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/verify-email" />
            )
          }
        />

        {/* Route to dashboard */}
        <Route
          path="/dashboard"
          element={
            user != null && user.isVerified ? (
              <Layout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        {/* Route to enter verification code */}
        <Route
          path="/verify-email"
          element={
            user != null && !user.isVerified ? (
              <EnterCode />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Catch-all route for 404 Not Found */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

        <Route path="/portfolio" element={<Layout />}>
          <Route
            index
            element={
              isCheckingAuth ? (
                <div className="loading-spinner" />
              ) : (
                <Portfolio />
              )
            }
          />
        </Route>

        <Route path="/settings" element={<Layout />}>
          <Route index element={<Settings />} />
        </Route>

        <Route path="/news" element={<Layout />}>
          <Route index element={<News />} />
        </Route>

        <Route path="/watchlist" element={<Layout />}>
          <Route index element={<Watchlist />} />
        </Route>
      </Routes>
      <Toaster />
    </ErrorBoundary>
  );
};

export default App;
