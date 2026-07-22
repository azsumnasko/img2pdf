"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    console.error("LocalPDF error boundary caught:", error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="error-summary" role="alert">
            <div className="error-summary-inner">
              <div className="error-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="var(--color-error)" strokeWidth="2" />
                  <path d="M24 14v14M24 32v2" stroke="var(--color-error)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="error-title">Something went wrong</h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>
                Your files are safe — they were never uploaded.
                Please refresh the page to try again.
              </p>
              <button className="btn btn--primary" onClick={() => window.location.reload()} type="button">
                Refresh page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
