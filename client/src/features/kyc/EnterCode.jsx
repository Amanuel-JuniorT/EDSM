import { useState, useRef, useEffect } from "react";
import "./EnterCode.css";
import PropTypes from "prop-types";

const CODE_LENGTH = 6;

function EnterCode({ phone, method, onBack, onVerify, onResend }) {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const inputs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleChange = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newCode = [...code];
    newCode[i] = val;
    setCode(newCode);
    setError("");
    if (val && i < CODE_LENGTH - 1) {
      inputs.current[i + 1].focus();
    }
    if (newCode.every(d => d.length === 1)) {
      // Optionally auto-submit here
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      const newCode = [...code];
      newCode[i - 1] = "";
      setCode(newCode);
      inputs.current[i - 1].focus();
      e.preventDefault();
    }
  };

  const handlePaste = e => {
    const val = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (val.length === CODE_LENGTH) {
      setCode(val.split(""));
      inputs.current[CODE_LENGTH - 1].focus();
    }
    e.preventDefault();
  };

  const handleVerify = () => {
    if (code.some(d => d === "")) {
      setError("Please enter the 6-digit code.");
      return;
    }
    // Accept any 6-digit code for demo
    setError("");
    onVerify && onVerify(code.join(""));
  };

  const handleResend = () => {
    setTimer(30);
    setCode(Array(CODE_LENGTH).fill(""));
    setError("");
    onResend && onResend();
  };

  return (
    <div className="signup-ref-bg">
      <div className="signup-ref-logo">EDSM</div>
      <div className="signup-ref-card refined">
        <h1 className="signup-ref-title">Enter the code we sent</h1>
        <div className="signup-ref-subtitle">
          <span className="signup-ref-info-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign:'middle'}}><circle cx="10" cy="10" r="10" fill="#1976d2"/><text x="10" y="15" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="Arial" fontWeight="bold">i</text></svg>
          </span>
          <span>
            {method === 'call'
              ? <>We will call you with a 6-digit code at <b>{phone}</b>.</>
              : <>We sent a 6-digit code to <b>{phone}</b> by text.</>
            }
          </span>
        </div>
        <form className="code-form" autoComplete="off" onSubmit={e => { e.preventDefault(); handleVerify(); }}>
          <div className="code-input-row" onPaste={handlePaste}>
            {code.map((digit, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className="code-input-box"
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                ref={el => (inputs.current[i] = el)}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>
          {error && <div className="code-error" role="alert">{error}</div>}
          <div className="code-resend-row">
            <button
              type="button"
              className="code-resend-btn"
              onClick={handleResend}
              disabled={timer > 0}
              aria-disabled={timer > 0}
            >
              {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
            </button>
          </div>
          <hr className="signup-ref-divider" />
          <div className="signup-ref-btn-row kyc-btn-row">
            <button type="button" className="signup-ref-btn secondary" onClick={onBack}>Back</button>
            <button type="submit" className="signup-ref-btn primary">Verify</button>
          </div>
        </form>
      </div>
    </div>
  );
}

EnterCode.propTypes = {
  phone: PropTypes.string,
  method: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
};

export default EnterCode; 