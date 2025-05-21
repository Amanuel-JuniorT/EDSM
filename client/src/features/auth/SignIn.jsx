import { useState } from "react";
import "./SignIn.css";
import PropTypes from "prop-types";

function SignIn({ onSignIn, onBackToSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);

  return (
    <div className="signup-ref-bg">
      <div className="signup-ref-logo">EDSM</div>
      <div className="signup-ref-card">
        <form
          className="signup-ref-form"
          onSubmit={e => {
            e.preventDefault();
            onSignIn({ ...form, remember });
          }}
          autoComplete="off"
        >
          <div className="signup-ref-title">Sign in to EDSM</div>
          <div className="signup-ref-subtitle">Enter your email and password to continue your application.</div>
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
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            className="signup-ref-input"
            autoComplete="current-password"
            aria-label="Password"
          />
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="remember-me"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            <label htmlFor="remember-me" style={{ fontSize: '1rem', color: '#444', cursor: 'pointer' }}>
              Remember me
            </label>
          </div>
          <div className="signup-ref-already">
            <span>New to EDSM? </span>
            <a href="#" className="signup-ref-link" onClick={e => { e.preventDefault(); onBackToSignup(); }}>Create an account</a>
          </div>
          <div className="signup-ref-divider" />
          <div className="signup-ref-btn-row">
            <button type="submit" className="signup-ref-btn primary">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onBackToSignup: PropTypes.func.isRequired,
};

export default SignIn; 