import { useState } from "react";
import StepCreateLogin from "./StepCreateLogin";
import StepKYCVerification from "./StepKYCVerification";
import StepVerifyIdentity from "./StepVerifyIdentity";
import StepIncludePhoto from "./StepIncludePhoto";
import StepVerifyPhone from "./StepVerifyPhone";
import StepVerificationPending from "./StepVerificationPending";

const steps = [
  { key: "CreateLogin", title: "Create your Login" },
  { key: "KYCVerification", title: "KYC Verification" },
  { key: "VerifyIdentity", title: "Verify your Identity" },
  { key: "IncludePhoto", title: "Include a Photo" },
  { key: "VerifyPhone", title: "Verify your Phone Number" },
  { key: "VerificationPending", title: "Verification Pending" },
];

export default function KYCWizard() {
  const [step, setStep] = useState(0);
  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  if (step === 0) {
    // Render only the new login card for step 0
    return <StepCreateLogin onNext={goNext} step={step} totalSteps={steps.length} title={steps[step].title} />;
  }

  // For all other steps, use the existing wizard/card layout
  const StepComponent = [
    null, // step 0 handled above
    <StepKYCVerification onNext={goNext} onBack={goBack} step={step} totalSteps={steps.length} title={steps[step].title} key={step} />,
    <StepVerifyIdentity onNext={goNext} onBack={goBack} step={step} totalSteps={steps.length} title={steps[step].title} key={step} />,
    <StepIncludePhoto onNext={goNext} onBack={goBack} step={step} totalSteps={steps.length} title={steps[step].title} key={step} />,
    <StepVerifyPhone onNext={goNext} onBack={goBack} step={step} totalSteps={steps.length} title={steps[step].title} key={step} />,
    <StepVerificationPending step={step} totalSteps={steps.length} title={steps[step].title} key={step} />,
  ][step];

  return (
    <div className="kyc-wizard-container">
      <div className="kyc-card">
        <div className="kyc-card-header">
          <img src="/logo192.png" alt="EDSM Logo" className="kyc-logo" />
          <span className="kyc-brand">EDSM</span>
        </div>
        <div className="kyc-card-title">{steps[step].title}</div>
        <div className="kyc-card-content">
          {StepComponent}
        </div>
        <hr className="kyc-divider" />
        <div className="kyc-step-indicator" style={{ textAlign: 'right', padding: '18px 40px 12px 0' }}>
          Step {step + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
} 