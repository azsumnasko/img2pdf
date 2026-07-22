"use client";

import type { ConversionResult } from "@/features/image-to-pdf/types";
import { formatBytes, formatDuration } from "@/lib/format";

type SuccessPanelProps = {
  result: ConversionResult;
  filename: string;
  onDownload: () => void;
  onNewProject: () => void;
  onEditSettings: () => void;
};

export function SuccessPanel({
  result, filename, onDownload, onNewProject, onEditSettings,
}: SuccessPanelProps) {
  const hasWarnings = result.warnings.length > 0;

  return (
    <div className="success-panel" role="region" aria-label="Conversion complete">
      <div className="success-panel-inner">
        <div className="success-icon" aria-hidden="true">
          {hasWarnings ? (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="var(--color-warning)" strokeWidth="3" />
              <path d="M32 18v16M32 42v2" stroke="var(--color-warning)" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="var(--color-success)" strokeWidth="3" />
              <path d="M20 32l8 8 16-16" stroke="var(--color-success)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <h2 className="success-title">{hasWarnings ? "Your PDF is ready (with warnings)" : "Your PDF is ready"}</h2>
        <p className="success-meta">
          {result.pageCount} {result.pageCount === 1 ? "page" : "pages"} &middot;{" "}
          {formatBytes(result.bytes)} &middot;{" "}
          {formatDuration(result.durationMs)}
        </p>
        <p className="success-privacy">
          The file was created on this device and has not been uploaded.
        </p>

        {hasWarnings && (
          <div className="success-warnings" role="alert">
            <ul className="success-warnings-list">
              {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        )}

        <div className="success-actions">
          <button className="btn btn--primary btn--large" onClick={onDownload} type="button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ verticalAlign: "middle", marginRight: 8 }}>
              <path d="M10 3v10m0 0l-4-4m4 4l4-4M3 15v2h14v-2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            Download PDF
          </button>
          <button className="btn btn--secondary" onClick={onEditSettings} type="button">
            Back to editor
          </button>
          <button className="btn btn--secondary" onClick={onNewProject} type="button">
            Convert more images
          </button>
        </div>
      </div>
    </div>
  );
}
