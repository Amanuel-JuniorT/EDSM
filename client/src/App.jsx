import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import EnterCode from "./components/EnterCode";

const App = () => {
  const { isCheckingAuth, checkAuth, user } = useAuthStore();

  useEffect(() => {
    // Check authentication status when the app loads
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      {/* Loading Page */}
      {isCheckingAuth && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
      <Routes>
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
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
