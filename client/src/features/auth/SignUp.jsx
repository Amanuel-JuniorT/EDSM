import { useState, useEffect } from "react";
import "./SignUp.css";
import PropTypes from "prop-types";

function getInitialTheme() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light';
}

function SignUp({ onNext, onShowSignIn }) {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <div className="signup-ref-bg">
      <button
        className="theme-toggle-btn"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? (
          <span role="img" aria-label="Light mode">🌞</span>
        ) : (
          <span role="img" aria-label="Dark mode">🌙</span>
        )}
      </button>
      <div className="signup-ref-logo">EDSM</div>
      <div className="signup-ref-card">
        <form
          className="signup-ref-form"
          onSubmit={e => {
            e.preventDefault();
            onNext();
          }}
          autoComplete="off"
        >
          <div className="signup-ref-title">Sign up for EDSM</div>
          <div className="signup-ref-subtitle">Enter your first and last name as they appear on your government ID.</div>
          <div className="signup-ref-names-row">
            <input
              type="text"
              placeholder="First name"
              value={form.firstName}
              onChange={e => setForm({ ...form, firstName: e.target.value })}
              required
              className="signup-ref-input"
              autoComplete="given-name"
              aria-label="First name"
            />
            <input
              type="text"
              placeholder="Last name"
              value={form.lastName}
              onChange={e => setForm({ ...form, lastName: e.target.value })}
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
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            className="signup-ref-input"
            autoComplete="email"
            aria-label="Email address"
          />
          <input
            type="password"
            placeholder="Password(min. 10 characters)"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
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
              onClick={e => {
                e.preventDefault();
                if (typeof onShowSignIn === "function") onShowSignIn();
              }}
            >
              Login to complete your application
            </a>
          </div>
          <div className="signup-ref-divider" />
          <div className="signup-ref-agreement">
            By continuing, you agree to the <a href="#" className="signup-ref-link">EDSM User account Agreement</a> and <a href="#" className="signup-ref-link">Privacy policy</a>.
          </div>
          <div className="signup-ref-btn-row">
            <button type="submit" className="signup-ref-btn primary">Continue</button>
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