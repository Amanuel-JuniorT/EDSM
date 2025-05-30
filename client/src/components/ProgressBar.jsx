/*
  ProgressBar.jsx - KYC/Auth progress bar for EDSM
  -----------------------------------------------
  - Shows progress through the authentication and KYC steps.
  - For backend/frontend devs: Update steps or styling here as needed.
*/
import React from 'react';
import { STEPS, STEP_NAMES } from '../constants/steps';
import './ProgressBar.css';

export const ProgressBar = ({ currentStep }) => {
  const TOTAL_STEPS = Object.keys(STEPS).length;
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
        {Object.entries(STEP_NAMES).map(([key, label], idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          const isUpcoming = idx > currentStep;
          return (
            <div 
              key={key}
              className={`progress-step ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''} ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <div className="step-dot">
                {isCompleted && (
                  <svg viewBox="0 0 24 24" className="check-icon">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </div>
              <span className="step-label">{label}</span>
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


