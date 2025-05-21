import React from 'react';
import { STEPS, STEP_NAMES } from '../constants/steps';
import './ProgressBar.css';

const TOTAL_STEPS = 7; // Total number of steps in the flow

function ProgressBar({ currentStep }) {
  // Convert current step to a number for progress calculation
  const getStepNumber = (step) => {
    if (typeof step === 'string') {
      return step === STEPS.SIGNUP ? 0 : -1;
    }
    return step;
  };

  const currentStepNumber = getStepNumber(currentStep);
  const progress = ((currentStepNumber + 1) / TOTAL_STEPS) * 100;

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
          const stepNumber = getStepNumber(value);
          const isActive = stepNumber === currentStepNumber;
          const isCompleted = stepNumber < currentStepNumber;
          const isUpcoming = stepNumber > currentStepNumber;
          
          return (
            <div 
              key={key}
              className={`progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <div className="step-dot">
                {isCompleted && (
                  <svg viewBox="0 0 24 24" className="check-icon">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </div>
              <span className="step-label">{STEP_NAMES[value]}</span>
              {!isUpcoming && (
                <div className="step-connector" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar; 