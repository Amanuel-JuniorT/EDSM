import PropTypes from "prop-types";
import { useState } from "react";
import "./KYCVerification.css";

const options = [
  { label: "ID Card", desc: "Create your account with ID card", icon: "" },
  { label: "Driving License", desc: "Create your account with Driving License", icon: "" },
  { label: "Passport", desc: "Create your account with Passport", icon: "" },
];

function KYCVerification({ onNext, onBack }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="signup-ref-bg">
      <div className="signup-ref-logo">EDSM</div>
      <div className="signup-ref-card refined kyc-card">
        <div className="kyc-title">KYC verification</div>
        <div className="kyc-options">
          {options.map((opt, i) => (
            <div
              key={opt.label}
              className={`kyc-option${selected === i ? " selected" : ""}`}
              onClick={() => setSelected(i)}
              tabIndex={0}
              role="button"
              aria-pressed={selected === i}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setSelected(i)}
            >
              <div className="kyc-option-avatar" aria-hidden="true">
                <svg width="40" height="40"><circle cx="20" cy="20" r="20" fill="#ddd" /></svg>
              </div>
              <div className="kyc-option-content">
                <span className="kyc-option-label">{opt.label}</span>
                <span className="kyc-option-desc">{opt.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="signup-ref-btn-row kyc-btn-row">
          <button type="button" onClick={onBack} className="signup-ref-btn secondary">&larr; Back</button>
          <button type="button" onClick={() => onNext(options[selected].label)} className="signup-ref-btn primary">Next</button>
        </div>
      </div>
    </div>
  );
}

KYCVerification.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default KYCVerification; 