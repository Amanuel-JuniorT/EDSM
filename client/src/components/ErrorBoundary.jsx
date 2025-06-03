/*
  ErrorBoundary.jsx - React error boundary for EDSM
  ------------------------------------------------
  - Catches and displays errors in child components.
  - For backend/frontend devs: Add error logging or custom fallback UI here as needed.
*/
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="signup-ref-bg">
          <div className="signup-ref-card">
            <h1 className="signup-ref-title">Something went wrong</h1>
            <p className="signup-ref-subtitle">
              We're sorry, but there was an error loading this page.
            </p>
            <button 
              className="signup-ref-btn primary"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 