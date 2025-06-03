import ErrorBoundary from "../components/ErrorBoundary";

import "../components/SignUp.css"; // Assuming you have a CSS file for styling

import { Toaster } from "react-hot-toast";

import LoginForm from "../components/LoginForm"; // Assuming you have a SignUpForm component
import { usePageStore } from "../store/usePageStore"; // Assuming you have a page store for managing steps
import EnterCode from "../components/EnterCode";
// import { useAuthStore } from "../store/useAuthStore";
// import { useEffect } from "react";

const Login = () => {
  const { step } = usePageStore();
  // const { clearUser } = useAuthStore();

  // Clear user data when the component mounts
 

  return (
    <ErrorBoundary>

      {step === 0 ? <LoginForm /> : <EnterCode purpose="verify_email" />}

      <Toaster />
    </ErrorBoundary>
  );
};

export default Login;
