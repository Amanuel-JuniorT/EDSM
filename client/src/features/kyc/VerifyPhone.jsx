import PropTypes from "prop-types";
import "./VerifyPhone.css";

export default function StepVerifyPhone({ onNext, onBack, phone }) {
  return (
    <div className="signup-ref-bg">
      <div className="signup-ref-logo">EDSM</div>
      <div className="signup-ref-card refined">
        <div className="signup-ref-card-header">
          <button
            type="button"
            className="signup-ref-btn back top-left"
            onClick={onBack}
            aria-label="Back"
          >
            &larr; Back
          </button>
        </div>
        <h1 className="signup-ref-title">Verify your phone number</h1>
        <div className="signup-ref-subtitle">
          <span className="signup-ref-info-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign:'middle'}}><circle cx="10" cy="10" r="10" fill="#1976d2"/><text x="10" y="15" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="Arial" fontWeight="bold">i</text></svg>
          </span>
          <span>We&apos;ll send you a six-digit code. It expires 10 minutes after you request.</span>
        </div>
        <label className="signup-ref-phone-label" id="phone-label">Phone number</label>
        <div className="signup-ref-phone-pill" aria-labelledby="phone-label">
          <b>{phone ? phone : "[phone number]"}</b>
        </div>
        <hr className="signup-ref-divider" />
        <div className="signup-ref-btn-row kyc-btn-row">
          <button type="button" className="signup-ref-btn action" onClick={() => onNext('call')}>Send by call</button>
          <button type="button" className="signup-ref-btn action" onClick={() => onNext('text')}>Send by text</button>
        </div>
      </div>
    </div>
  );
}

StepVerifyPhone.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
}; 