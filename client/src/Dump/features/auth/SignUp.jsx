import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";

function getInitialTheme() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      return "dark";
  }
  return "light";
}

function SignUp({ onNext, onShowSignIn }) {
  const [theme, setTheme] = useState(getInitialTheme());
  const { signup, isSigningUp } = useAuthStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 10) return toast.error("Password must be at least 10 characters long");
    if(!/\S+@\S+\.\S+/.test(form.email)) return toast.error("Invalid email address");
    signup(form)
    onNext();
  };

  return (
    <div className="signup-ref-bg">
      {isSigningUp && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
      <button
        className="theme-toggle-btn"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <span className="theme-icon" role="img" aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
          {theme === 'dark' ? '🌞' : '🌙'}
        </span>
      </button>
      <div className="signup-ref-logo">EDSM</div>
      <div className="signup-ref-card">
        <form
          className="signup-ref-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="signup-ref-title">Sign up for EDSM</div>
          <div className="signup-ref-subtitle">
            Enter your first and last name as they appear on your government ID.
          </div>
          <div className="signup-ref-names-row">
            <input
              type="text"
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              required
              className="signup-ref-input"
              autoComplete="given-name"
              aria-label="First name"
            />
            <input
              type="text"
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
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
            required
            className="signup-ref-input"
            autoComplete="email"
            aria-label="Email address"
          />
          <input
            type="password"
            placeholder="Password(min. 10 characters)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="signup-ref-input"
            autoComplete="new-password"
            minLength={10}
            aria-label="Password (min. 10 characters)"
          />
          <div className="signup-ref-already">
            <span>Already started? </span>
            <a
              href="#"
              className="signup-ref-link"
              onClick={(e) => {
                e.preventDefault();
                if (typeof onShowSignIn === "function") onShowSignIn();
              }}
            >
              Login to complete your application
            </a>
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
  );
}

SignUp.propTypes = {
  onNext: PropTypes.func.isRequired,
  onShowSignIn: PropTypes.func.isRequired,
};

export default SignUp;
