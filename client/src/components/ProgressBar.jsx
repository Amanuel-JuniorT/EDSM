import "./ProgressBar.css";


export const ProgressBar = ({ currentStep }) => {

  
  const TOTAL_STEPS = 2; // Total number of steps in the flow

  const STEPS = {
    "Sign Up": 0,
    "Verify Identity": 1,
  };

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="progress-container">

      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          role="progressbar"
        />
      </div>

      <div className="progress-steps">
        {Object.entries(STEPS).map(([key, value]) => {
          const stepNumber = value;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isUpcoming = stepNumber > currentStep;
          
          return (
            <div 
              key={key}
              className={`progress-step ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''} ${isActive ? 'active' : ''}  `}
              aria-current={isActive ? 'step' : undefined}
            >
              <div className="step-dot">
                {isCompleted && (
                  <svg viewBox="0 0 24 24" className="check-icon">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </div>
              <span className="step-label">{key}</span>
              {!isUpcoming && !isActive && (
                <div className="step-connector" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


