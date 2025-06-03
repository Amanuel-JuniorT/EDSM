import { useState, useRef, useEffect } from "react";
import "./EnterCode.css";
import PropTypes from "prop-types";
import { useAuthStore } from "../store/useAuthStore";
import { usePageStore } from "../store/usePageStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CODE_LENGTH = 6;

function EnterCode({ purpose, onVerify }) {
  const navigate = useNavigate();
  const { isVerifyingEmail, user, sendOTP, isSendingOTP, verifyOTP, logout:clearToken } = useAuthStore(); 
  const { setPreviousStep } = usePageStore();
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const inputs = useRef([]);
  const timerIntervalRef = useRef(null);
  const firstMounted = useRef(true);

  useEffect(() => {
    return () => clearInterval(timerIntervalRef.current);
  }, []);


  const handleChange = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newCode = [...code];
    newCode[i] = val;
    setCode(newCode);
    setError("");
    if (val && i < CODE_LENGTH - 1) {
      inputs.current[i + 1].focus();
    }
    if (newCode.every((d) => d.length === 1)) {
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

  const handlePaste = (e) => {
    const val = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);
    if (val.length === CODE_LENGTH) {
      setCode(val.split(""));
      inputs.current[CODE_LENGTH - 1].focus();
    }
    e.preventDefault();
  };

  const handleVerify = async () => {
    console.log(user);

    if (code.some((d) => d === "")) {
      setError("Please enter the 6-digit code.");
      return;
    }
    // Accept any 6-digit code for demo
    setError("");

    const res = await verifyOTP(code.join(""), purpose);
    if (!res) {
      return toast.error("Verification failed. Please try again.");
    }

    toast.success("Verification successful!");
    // Redirect to the next step or home page
    navigate("/dashboard");

    onVerify && onVerify(code.join(""));
  };

  const handleResend = async () => {
    const res = await sendOTP(user, purpose);
    if (res) {
      firstMounted.current = false; // Set to false after first render
      setTimer(30); // Reset timer to 30 seconds
      setCode(Array(CODE_LENGTH).fill(""));
      setError("");

      // Clear any existing interval before starting a new one
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      // Start countdown
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      toast.error("Failed to send code. Please try again.");
    }
  };

  const handleReturnBack = () => {
    setPreviousStep();
    setCode(Array(CODE_LENGTH).fill(""));
    setError("");
    firstMounted.current = true; // Reset for the next use
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      setTimer(0);
    }

    clearToken(false);

  }

  return (
    <div className="signup-ref-bg">
      {!user && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
      <div className="signup-ref-logo">EDSM</div>
      <div className="signup-ref-card refined">
        <h1 className="signup-ref-title">Enter the code we sent</h1>
        <div className="signup-ref-subtitle">
          <span className="signup-ref-info-icon" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ verticalAlign: "middle" }}
            >
              <circle cx="10" cy="10" r="10" fill="#1976d2" />
              <text
                x="10"
                y="15"
                textAnchor="middle"
                fontSize="13"
                fill="#fff"
                fontFamily="Arial"
                fontWeight="bold"
              >
                i
              </text>
            </svg>
          </span>
          <span>
            {firstMounted.current ? (
              <>
                We will send a 6-digit code to <b>{user.email}</b> by email.
              </>
            ) : (
              <>
                We sent a 6-digit code to <b>{user.email}</b> by email.
              </>
            )}
          </span>
        </div>
        <form
          className="code-form"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify();
          }}
        >
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
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                ref={(el) => (inputs.current[i] = el)}
                aria-label={`Digit ${i + 1}`}
                disabled={firstMounted.current}
              />
            ))}
          </div>
          {error && (
            <div className="code-error" role="alert">
              {error}
            </div>
          )}
          <div className="code-resend-row">
            <button
              type="button"
              className="code-resend-btn"
              onClick={handleResend}
              disabled={timer > 0}
              aria-disabled={timer > 0}
            >
              {" "}
              { isSendingOTP ? (<div
                  style={{ width: 20, height: 20 }}
                  className="loading-spinner"
                />) : firstMounted.current
                ? "Send code"
                : timer > 0
                ? `Resend code in ${timer}s`
                : "Resend code"}
            </button>
          </div>
          <hr className="signup-ref-divider" />
          <div className="signup-ref-btn-row kyc-btn-row">
            <button
              type="button"
              className="signup-ref-btn secondary"
              onClick={handleReturnBack}
            >
              Back
            </button>
            <button
              type="submit"
              className="signup-ref-btn primary"
              disabled={isVerifyingEmail}
            >
              {isVerifyingEmail ? (
                <div
                  style={{ width: 20, height: 20 }}
                  className="loading-spinner"
                />
              ) : (
                "Verify Code"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EnterCode.propTypes = {
  email: PropTypes.string,
  purpose: PropTypes.oneOf(["signup", "login", "resetPassword"]).isRequired,
  onBack: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
};

export default EnterCode;
