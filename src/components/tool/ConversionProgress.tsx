"use client";

import type { ConversionProgress as ConversionProgressType } from "@/features/image-to-pdf/types";

type ConversionProgressProps = {
  progress?: ConversionProgressType;
  cancelled: boolean;
  onCancel: () => void;
};

export function ConversionProgress({ progress, cancelled, onCancel }: ConversionProgressProps) {
  const pct = progress && progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;
  const phaseText = progress?.phase ?? "Converting images to PDF...";
  const pageText = progress ? `Processing page ${progress.current + 1} of ${progress.total}` : "";

  return (
    <div className="conversion-progress" role="status" aria-live="polite" aria-label={cancelled ? "Cancelling" : `Converting: ${pct}%`}>
      <div className="conversion-progress-inner">
        {!cancelled ? (
          <>
            <div className="conversion-progress-bar-wrapper" aria-hidden="true">
              <div className="conversion-progress-bar" style={{ width: `${pct}%` }} />
            </div>
            <p className="conversion-progress-text">{phaseText}</p>
            {pageText && <p className="conversion-progress-page">{pageText}</p>}
            <p className="conversion-progress-note">Processing on this device. No files are being uploaded.</p>
          </>
        ) : (
          <p className="conversion-progress-text">Cancelling...</p>
        )}
        {!cancelled && (
          <button className="btn btn--secondary" onClick={onCancel} type="button">Cancel</button>
        )}
      </div>
    </div>
  );
}
