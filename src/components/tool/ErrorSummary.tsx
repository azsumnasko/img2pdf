"use client";

import type { ValidationError } from "@/features/image-to-pdf/types";

type ErrorSummaryProps = {
  errors: ValidationError[];
  recoverable: boolean;
  onRetry?: () => void;
  onReset: () => void;
};

export function ErrorSummary({ errors, recoverable, onRetry, onReset }: ErrorSummaryProps) {
  return (
    <div className="error-summary" role="alert" aria-live="assertive">
      <div className="error-summary-inner">
        <div className="error-icon" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="var(--color-error)" strokeWidth="2" />
            <path d="M24 14v14M24 32v2" stroke="var(--color-error)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="error-title">
          {recoverable ? "Some issues occurred" : "Cannot convert files"}
        </h3>
        <ul className="error-list">
          {errors.map((err, i) => (
            <li key={i} className="error-item">
              {err.message}
            </li>
          ))}
        </ul>
        <div className="error-actions">
          {recoverable && onRetry && (
            <button className="btn btn--primary" onClick={onRetry} type="button">
              Try again
            </button>
          )}
          <button className="btn btn--secondary" onClick={onReset} type="button">
            Start over
          </button>
        </div>
      </div>
    </div>
  );
}
