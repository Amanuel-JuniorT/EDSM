import ErrorBoundary from "../components/ErrorBoundary";
import { ProgressBar } from "../components/ProgressBar";

import "../components/SignUp.css"; // Assuming you have a CSS file for styling

import { Toaster } from "react-hot-toast";

import SignUpForm from "../components/SignUpForm"; // Assuming you have a SignUpForm component
import { usePageStore } from "../store/usePageStore"; // Assuming you have a page store for managing steps
import EnterCode from "../components/EnterCode";

const SignUp = () => {
  const { step } = usePageStore();

  return (
    <ErrorBoundary>
      <ProgressBar currentStep={step} />
      {step === 0 ? <SignUpForm /> : <EnterCode purpose="verify_email" />}

      <Toaster />
    </ErrorBoundary>
  );
};

export default SignUp;
