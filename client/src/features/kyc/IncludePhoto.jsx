import { useRef, useState } from "react";
import PropTypes from "prop-types";

const kycTypeLabels = {
  "ID Card": "Upload or take a photo of your ID card",
  "Driving License": "Upload or take a photo of your Driving License",
  "Passport": "Upload or take a photo of your Passport",
};

function IncludePhoto({ kycType = "ID Card", onNext, onBack }) {
  const [photo, setPhoto] = useState(null);
  const fileInput = useRef();

  const handleFile = e => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="signup-ref-bg">
      <div className="signup-ref-logo">EDSM</div>
      <div className="signup-ref-card refined kyc-card">
        <div className="kyc-title">Include a Photo</div>
        <div className="kyc-photo-label">{kycTypeLabels[kycType] || kycTypeLabels["ID Card"]}</div>
        <div className="kyc-photo-area" onClick={() => fileInput.current.click()} style={{ cursor: "pointer" }}>
          {photo ? (
            <img src={photo} alt="Uploaded" style={{ width: 320, height: 180, objectFit: "cover", borderRadius: 12 }} />
          ) : (
            <div style={{ width: 320, height: 180, background: "#d1d1d1", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa", position: 'relative' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
                <circle cx="40" cy="40" r="36" fill="#e0e0e0" />
                <line x1="20" y1="40" x2="60" y2="40" stroke="#bbb" strokeWidth="2" />
                <line x1="40" y1="20" x2="40" y2="60" stroke="#bbb" strokeWidth="2" />
              </svg>
            </div>
          )}
          <input type="file" accept="image/*" ref={fileInput} style={{ display: "none" }} onChange={handleFile} />
        </div>
        <div style={{ marginTop: 24, display: "flex", gap: 16, justifyContent: "center" }}>
          <button type="button" className="signup-ref-btn secondary" onClick={() => fileInput.current.click()}>Upload photo</button>
          <button type="button" className="signup-ref-btn secondary" onClick={() => alert('Camera not implemented in demo')}>Take photo</button>
        </div>
        <div className="signup-ref-btn-row kyc-btn-row">
          <button type="button" className="signup-ref-btn secondary" onClick={onBack}>&larr; Back</button>
          <button type="button" className="signup-ref-btn primary" onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

IncludePhoto.propTypes = {
  kycType: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
};

export default IncludePhoto; 