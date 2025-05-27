/*
  SignUpForm.jsx - User sign-up form for EDSM
  ------------------------------------------
  - Handles user registration input and validation.
  - For backend/frontend devs: Add validation, API integration, or extra fields here as needed.
*/
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';
import { usePageStore } from '../store/usePageStore';

const SignUpForm = () => {

  const { setNextStep } = usePageStore();
  const { user, signup, isSigningUp } = useAuthStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (!form.firstName || !form.lastName || !form.email || !form.password)
      return toast.error("Please fill all fields");

    // Check if the email is valid
    if (!/\S+@\S+\.\S+/.test(form.email))
      return toast.error("Invalid email address");
    // Check if the password is at least 10 characters long
    if (form.password.length < 10)
        return toast.error("Password must be at least 10 characters long");

    // console.log("Clicked");

    signup(form);
    ( user && setNextStep(1))

    
  };

  

  return (
    <div className="signup-ref-bg">
        {isSigningUp && (
          <div className="loading-overlay">
            <div className="loading-spinner" />
          </div>
        )}

        {/* <button
          className="theme-toggle-btn"
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <span role="img" aria-label="Light mode">
              🌞
            </span>
          ) : (
            <span role="img" aria-label="Dark mode">
              🌙
            </span>
          )}
        </button> */}

        <div className="signup-ref-logo">EDSM</div>

        <div className="signup-ref-card">
          <form
            className="signup-ref-form"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            autoComplete="off"
          >
            <div className="signup-ref-title">Sign up for EDSM</div>
            <div className="signup-ref-subtitle">
              Enter your first and last name as they appear on your government
              ID.
            </div>
            <div className="signup-ref-names-row">
              <input
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className="signup-ref-input"
                autoComplete="given-name"
                aria-label="First name"
              />
              <input
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="signup-ref-input"
                autoComplete="family-name"
                aria-label="Last name"
              />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="signup-ref-input"
              autoComplete="email"
              aria-label="Email address"
            />
            <input
              type="password"
              placeholder="Password(min. 10 characters)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="signup-ref-input"
              autoComplete="new-password"
              minLength={10}
              aria-label="Password (min. 10 characters)"
            />
            <div className="signup-ref-already">
              <span>Already started? </span>
              <Link to="/login" className="signup-ref-link">
                Login to complete your application
              </Link>
            </div>
            <div className="signup-ref-divider" />
            <div className="signup-ref-agreement">
              By continuing, you agree to the{" "}
              <a href="#" className="signup-ref-link">
                EDSM User account Agreement
              </a>{" "}
              and{" "}
              <a href="#" className="signup-ref-link">
                Privacy policy
              </a>
              .
            </div>
            <div className="signup-ref-btn-row">
              <button type="submit" className="signup-ref-btn primary">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default SignUpForm