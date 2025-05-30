import { useState, useEffect } from 'react';
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
import { useAuthStore } from './store/useAuthStore';
import toast, {Toaster} from 'react-hot-toast'

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
  // const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('text');
  // const [selectedKycType, setSelectedKycType] = useState('ID Card');
  const [ isLoading, setIsLoading] = useState(false);

   const { error, user, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    checkAuth();
  }, []);

  const handleNext = async () => {
    
    try {
      // if (step === STEPS.VERIFY_IDENTITY && data?.phone) {
      //   setPhone(data.phone);
      // }
      // if (step === STEPS.KYC_VERIFICATION && data?.kycType) {
      //   setSelectedKycType(data.kycType);
      // }
      checkAuth();
      setStep(prev => typeof prev === 'number' ? prev + 1 : user ? STEPS.VERIFICATION_PENDING : STEPS.SIGNUP);
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

 

  return (
    <ErrorBoundary>
      <ProgressBar currentStep={step} />

      {/* Theme Toggle Button */}
      <button
        className="theme-toggle-btn"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>
      

      {/* Loading Page */}
      {isCheckingAuth && (
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
          // phone={phone}
        />
      )}
      {step === STEPS.ENTER_CODE && (
        <EnterCode
          // phone={phone}
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
        <IncludePhoto 
        // kycType={selectedKycType}
         onNext={handleNext} onBack={handleBack} />
      )}
      {step === STEPS.VERIFICATION_PENDING && (
        <VerificationPending 
          onContact={() => alert('Contact support!')} 
          onDashboard={() => alert('Go to dashboard!')} 
        />
      )}
      <Toaster/>
    </ErrorBoundary>
    
  );
}

export default App;
