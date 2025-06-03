import { useState } from "react";
// import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {  toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

function Login() {

  const { user, isLoggingIn, login } = useAuthStore();

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  
  const handleSummit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const res = await login(form)

    if(!res){
      user.isVerified ? navigate("/dashboard") : navigate("/verify-email");
    }
    

    
  }

  return (
    <div className="signup-ref-bg">
      {isLoggingIn && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
      <div className="signup-ref-logo">EDSM</div>
      <div style={{ marginTop: "0rem" }} className="signup-ref-card">
        <form
          className="signup-ref-form"
          onSubmit={handleSummit}
          autoComplete="off"
        >
          <div className="signup-ref-title">Sign in to EDSM</div>
          <div className="signup-ref-subtitle">Enter your email and password to continue your application.</div>
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            
            className="signup-ref-input"
            autoComplete="email"
            aria-label="Email address"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="signup-ref-input"
            autoComplete="current-password"
            aria-label="Password"
          />
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="remember-me"
              checked={form.rememberMe}
              onChange={e => setForm({...form, rememberMe: e.target.checked})}
              style={{ marginRight: 8 }}
            />
            <label htmlFor="remember-me" style={{ fontSize: '1rem', color: '#444', cursor: 'pointer' }}>
              Remember me
            </label>
          </div>
          <div className="signup-ref-already">
            <span>New to EDSM? </span>
            <a href="#" className="signup-ref-link" onClick={e => { e.preventDefault(); navigate("/signup"); }}>Create an account</a>
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

Login.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onBackToSignup: PropTypes.func.isRequired,
};

export default Login; 