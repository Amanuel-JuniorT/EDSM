<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
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

function getInitialTheme() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light';
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme());
  const [step, setStep] = useState(STEPS.SIGNUP);
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('text');
  const [selectedKycType, setSelectedKycType] = useState('ID Card');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

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

  const handleBack = () => {
    setStep(prev => typeof prev === 'number' ? prev - 1 : STEPS.SIGNUP);
  };

  const handleSendCode = (chosenMethod) => {
    setMethod(chosenMethod);
    setStep(STEPS.ENTER_CODE);
  };
>>>>>>> a74ec12b93324f9a7bdea4b968c69d14f74a1bd8

  return (
    <ErrorBoundary>
      <ProgressBar currentStep={step} />
      <button
        className="theme-toggle-btn"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>
      
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
<<<<<<< HEAD
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
=======

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
>>>>>>> a74ec12b93324f9a7bdea4b968c69d14f74a1bd8

export default App;
