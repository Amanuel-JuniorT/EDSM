import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./VerifyPhone.css";

function getInitialTheme() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light';
}

const states = [
  '', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function StepVerifyIdentity({ onNext }) {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [form, setForm] = useState({
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
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
            onNext && onNext({ phone: form.phone });
          }}
          autoComplete="off"
        >
          <div className="signup-ref-title">Help us verify your identity</div>
          <div className="signup-ref-names-row" style={{marginBottom: '1rem'}}>
            <input
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              required
              className="signup-ref-input"
              autoComplete="tel"
              aria-label="Phone number"
            />
          </div>
          <div className="signup-ref-names-row" style={{marginBottom: '1rem'}}>
            <input
              type="text"
              placeholder="Residential address"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              required
              className="signup-ref-input"
              autoComplete="street-address"
              aria-label="Residential address"
            />
          </div>
          <div className="signup-ref-names-row" style={{marginBottom: '1rem'}}>
            <input
              type="text"
              placeholder="Apartment, Building, etc."
              value={form.apartment}
              onChange={e => setForm({ ...form, apartment: e.target.value })}
              className="signup-ref-input"
              autoComplete="address-line2"
              aria-label="Apartment, Building, etc."
            />
          </div>
          <div className="signup-ref-names-row">
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={e => setForm({ ...form, city: e.target.value })}
              required
              className="signup-ref-input"
              autoComplete="address-level2"
              aria-label="City"
            />
            <select
              value={form.state}
              onChange={e => setForm({ ...form, state: e.target.value })}
              required
              className="signup-ref-input"
              aria-label="State"
            >
              {states.map(s => (
                <option key={s} value={s}>{s ? s : 'State'}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Zip Code"
              value={form.zip}
              onChange={e => setForm({ ...form, zip: e.target.value })}
              required
              className="signup-ref-input"
              autoComplete="postal-code"
              aria-label="Zip Code"
            />
          </div>
          <div className="signup-ref-btn-row" style={{marginTop: '2.5rem'}}>
            <button type="submit" className="signup-ref-btn primary">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}

StepVerifyIdentity.propTypes = {
  onNext: PropTypes.func.isRequired,
};