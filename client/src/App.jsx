/*
  App.jsx - Main entry point for the EDSM web app
  ------------------------------------------------
  - Handles routing, authentication, and KYC flow.
  - Integrates with backend via useAuthStore (see store/useAuthStore.js).
  - Theme is managed locally and synced to localStorage/document.
  - All main routes are defined here, including Help & Support pages.
  - For backend/frontend devs: If you add new routes or authentication logic, document integration points here.
*/

import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { STEPS } from './constants/steps';
import ErrorBoundary from './components/ErrorBoundary';
import ProgressBar from './components/ProgressBar';
import SignUp from './features/auth/SignUp';
import SignIn from './features/auth/SignIn';
import VerifyIdentity from './features/kyc/VerifyIdentity';
import VerifyPhone from './features/kyc/VerifyPhone';
import EnterCode from './features/kyc/EnterCode';
import KYCVerification from './features/kyc/KYCVerification';
import IncludePhoto from './features/kyc/IncludePhoto';
import VerificationPending from './features/kyc/VerificationPending';
import Dashboard from "./pages/Dashboard/Dashboard";
import Market from "./pages/Market/Market";
import Portfolio from "./pages/Portfolio/Portfolio";
import News from "./pages/News/News";
import Settings from "./pages/Settings/Settings";
import Layout from "./components/layout/Layout";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import Watchlist from "./pages/Watchlist";
import StockDetail from "./pages/StockDetail";
import GettingStarted from "./pages/Help/GettingStarted";
import FAQ from "./pages/Help/FAQ";
import Troubleshooting from "./pages/Help/Troubleshooting";
import Contact from "./pages/Help/Contact";

// App.jsx - Main entry point for routing and authentication logic
function App() {
  // Theme, step, and KYC state management
  const [theme, setTheme] = useState(getInitialTheme());
  const [step, setStep] = useState(STEPS.SIGNUP);
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('text');
  const [selectedKycType, setSelectedKycType] = useState('ID Card');
  const [isLoading, setIsLoading] = useState(false);
  const { isCheckingAuth, checkAuth, user } = useAuthStore();

  useEffect(() => {
    // Set theme on document and localStorage
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Check authentication status on mount
    checkAuth();
  }, [checkAuth]);

  // Handles step transitions in KYC/auth flow
  const handleNext = async (data) => {
    setIsLoading(true);
    try {
      if (step === STEPS.VERIFY_IDENTITY && data?.phone) {
        setPhone(data.phone);
      }
      if (step === STEPS.KYC_VERIFICATION && data?.kycType) {
        setSelectedKycType(data.kycType);
      }
      setStep(prev => typeof prev === 'number' ? prev + 1 : STEPS.VERIFY_IDENTITY);
    } finally {
      setIsLoading(false);
    }
  };

  // Handles going back in KYC/auth flow
  const handleBack = () => {
    setStep(prev => typeof prev === 'number' ? prev - 1 : STEPS.SIGNUP);
  };

  // Handles sending code for phone verification
  const handleSendCode = (chosenMethod) => {
    setMethod(chosenMethod);
    setStep(STEPS.ENTER_CODE);
  };

  // If user is not authenticated, show KYC/auth flow
  if (!user) {
    return (
      <ErrorBoundary>
        <ProgressBar currentStep={step} />
        <button
          className="theme-toggle-btn"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <span className="theme-icon" role="img" aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
            {theme === 'dark' ? '🌞' : '🌙'}
          </span>
        </button>
        
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner" />
          </div>
        )}

        {step === STEPS.SIGNUP && (
          <SignUp onNext={handleNext} onShowSignIn={() => setStep(STEPS.SIGNIN)} />
        )}
        {step === STEPS.SIGNIN && (
          <SignIn onSignIn={() => {
            alert('Go to dashboard!');
          }} onBackToSignup={() => setStep(STEPS.SIGNUP)} />
        )}
        {step === STEPS.VERIFY_IDENTITY && <VerifyIdentity onNext={handleNext} />}
        {step === STEPS.VERIFY_PHONE && (
          <VerifyPhone
            onNext={method => handleSendCode(method)}
            onBack={handleBack}
            phone={phone}
          />
        )}
        {step === STEPS.ENTER_CODE && (
          <EnterCode
            phone={phone}
            method={method}
            onBack={handleBack}
            onVerify={() => setStep(step + 1)}
            onResend={() => {}}
          />
        )}
        {step === STEPS.KYC_VERIFICATION && (
          <KYCVerification onNext={data => handleNext({ kycType: data })} onBack={handleBack} />
        )}
        {step === STEPS.INCLUDE_PHOTO && (
          <IncludePhoto kycType={selectedKycType} onNext={handleNext} onBack={handleBack} />
        )}
        {step === STEPS.VERIFICATION_PENDING && (
          <VerificationPending 
            onContact={() => alert('Contact support!')} 
            onDashboard={() => alert('Go to dashboard!')} 
          />
        )}
      </ErrorBoundary>
    );
  }

  // If user is authenticated, show main app with protected routes
  return (
    <div>
      {/* Main app routes, all wrapped in Layout for sidebar/topbar */}
      <Routes>
        {/* Default route - redirect to dashboard if authenticated */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        {/* Main app routes with Layout */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/market" element={<Layout><Market /></Layout>} />
        <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
        <Route path="/news" element={<Layout><News /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/watchlist" element={<Layout><Watchlist /></Layout>} />
        <Route path="/stock/:symbol" element={<Layout><StockDetail /></Layout>} />
        {/* Help & Support routes */}
        <Route path="/getting-started" element={<Layout><GettingStarted /></Layout>} />
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/troubleshooting" element={<Layout><Troubleshooting /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
      <Toaster/>
    </div>
  );
}

function getInitialTheme() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light';
}

export default App;
