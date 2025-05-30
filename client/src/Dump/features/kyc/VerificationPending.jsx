import PropTypes from "prop-types";

export default function VerificationPending({ onContact, onDashboard }) {
  return (
    <div className="signup-ref-bg">
      <div className="signup-ref-logo">EDSM</div>
      <div className="signup-ref-card refined kyc-card" style={{ alignItems: 'center', maxWidth: 480, margin: '60px auto' }}>
        <div style={{
          width: 96,
          height: 96,
          borderRadius: '50%',
          background: '#19a7f2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem auto',
        }}>
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="27" cy="27" r="26" fill="#19a7f2" stroke="#fff" strokeWidth="2" />
            <path d="M18 16h18M18 38h18M21 16v4.5c0 2.5 2 4.5 6 7 4-2.5 6-4.5 6-7V16M21 38v-4.5c0-2.5 2-4.5 6-7 4 2.5 6 4.5 6 7V38" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="kyc-title" style={{ marginBottom: 12, fontSize: '2.1rem', fontWeight: 700 }}>Verification Pending</div>
        <div style={{ color: '#444', marginBottom: 28, fontSize: '1.08rem', maxWidth: 420, textAlign: 'center', lineHeight: 1.6 }}>
          Your verification is being processed. We will notify you once it&apos;s complete.<br />If you have questions, contact our support team.
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, width: '100%' }}>
          <button className="signup-ref-btn secondary" style={{ minWidth: 140 }} onClick={onContact}>Contact Us</button>
          <button className="signup-ref-btn primary" style={{ minWidth: 140 }} onClick={onDashboard}>Dashboard</button>
        </div>
      </div>
    </div>
  );
}

VerificationPending.propTypes = {
  onContact: PropTypes.func,
  onDashboard: PropTypes.func,
};