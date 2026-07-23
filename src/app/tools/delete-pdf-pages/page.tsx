"use client";

import { useCallback, useMemo, useState } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PdfPageGrid } from "@/components/tool/PdfPageGrid";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";

export default function DeletePdfPagesPage() {
  const {
    state, loadFiles, movePage, rotatePage, toggleSelect,
    selectAll, deselectAll, reset,
    executeDelete, cancelProcessing, selectedCount,
  } = useOrganizer();

  const [filename, setFilename] = useState("pages-removed.pdf");

  const allSelected = useMemo(() => selectedCount === state.pages.length && state.pages.length > 0, [selectedCount, state.pages.length]);
  const remainingCount = state.pages.length - selectedCount;

  const handleDownload = useCallback(() => {
    if (state.phase.phase !== "success") return;
    const a = document.createElement("a");
    a.href = state.phase.objectUrl;
    a.download = state.phase.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [state]);

  const warnings = state.phase.phase === "editing" && state.phase.warnings?.length ? state.phase.warnings : null;

  return (
    <ErrorBoundary>
    <main className="tool-page">
      <div className="tool-hero">
        <h1 className="tool-title">Delete PDF Pages Locally</h1>
        <p className="tool-subtitle">
          Remove unwanted pages from a PDF right in your browser. No upload, no signup — your file stays on your device.
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="Delete PDF pages tool">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} multiple={false} label="Select a PDF file" description="Click or drag and drop a PDF file to remove pages from" />
        )}

        {state.phase.phase === "loading" && (
          <div className="validating-state" role="status" aria-live="polite"><div className="spinner" aria-hidden="true" /><p>Reading your file...</p></div>
        )}

        {state.phase.phase === "editing" && (
          <div className="editor-layout">
            <div className="editor-pages">
              <div className="editor-header">
                <h2 className="editor-title">{state.pages.length} {state.pages.length === 1 ? "page" : "pages"}</h2>
                <div className="editor-header-actions">
                  <button className="btn btn--secondary btn--sm" onClick={reset} type="button">Start over</button>
                </div>
              </div>

              {warnings && (
                <div className="toast toast--warning" role="alert">
                  <span>{warnings.length} warning{warnings.length !== 1 ? "s" : ""}.</span>
                </div>
              )}

              <PdfPageGrid
                pages={state.pages}
                onMovePage={movePage}
                onRotatePage={rotatePage}
                onToggleSelect={toggleSelect}
                onSelectAll={selectAll}
                onDeselectAll={deselectAll}
                selectedCount={selectedCount}
                showActions
              />

              {allSelected && (
                <div className="toast toast--warning" role="alert" style={{ marginTop: "var(--space-4)" }}>
                  <span>You cannot delete all pages. A PDF must contain at least one page.</span>
                </div>
              )}
              {selectedCount > 0 && !allSelected && (
                <p style={{ marginTop: "var(--space-4)", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  {selectedCount} page{selectedCount !== 1 ? "s" : ""} selected for deletion — {remainingCount} page{remainingCount !== 1 ? "s" : ""} will remain.
                </p>
              )}
            </div>
            <div className="editor-settings">
              <div className="setting-group">
                <label htmlFor="delete-filename">Output filename</label>
                <input id="delete-filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
              </div>
              <button className="btn btn--primary btn--large btn--full" onClick={() => executeDelete(filename.endsWith(".pdf") ? filename : `${filename}.pdf`)} type="button" disabled={selectedCount === 0}>
                Delete Selected Pages
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">{state.phase.progress?.label ?? "Removing pages..."}</p>
              {state.phase.progress && (
                <>
                  <p className="conversion-progress-page">Processing page {state.phase.progress.current} of {state.phase.progress.total}</p>
                  <div className="conversion-progress-bar-wrapper">
                    <div className="conversion-progress-bar" style={{ width: `${Math.round((state.phase.progress.current / state.phase.progress.total) * 100)}%` }} />
                  </div>
                </>
              )}
              <button className="btn btn--secondary btn--sm" onClick={cancelProcessing} type="button">Cancel</button>
            </div>
          </div>
        )}

        {state.phase.phase === "success" && (
          <div className="success-panel">
            <div className="success-panel-inner">
              <div className="success-icon" aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" /><path d="M20 32l8 8 16-16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h2 className="success-title">Pages deleted successfully</h2>
              <p className="success-meta">{formatBytes(state.phase.bytes)} — ready to download</p>
              <p className="success-privacy">No file was uploaded to any server.</p>
              <div className="success-actions">
                <button className="btn btn--primary btn--large" onClick={handleDownload} type="button">Download {state.phase.filename}</button>
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
              {state.phase.warnings.length > 0 && (
                <div className="success-warnings"><ul className="success-warnings-list">{state.phase.warnings.map((w, i) => <li key={i}>{w}</li>)}</ul></div>
              )}
            </div>
          </div>
        )}

        {state.phase.phase === "error" && (
          <div className="error-summary">
            <div className="error-summary-inner">
              <div className="error-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" /><path d="M24 14v12M24 30v2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
              </div>
              <h2 className="error-title">Something went wrong</h2>
              <p className="error-item">{state.phase.message}</p>
              <div className="error-actions">
                {state.phase.recoverable && <button className="btn btn--primary" onClick={() => executeDelete(filename.endsWith(".pdf") ? filename : `${filename}.pdf`)} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="how-it-works">
        <h2>How to delete PDF pages</h2>
        <ol className="steps">
          <li className="step"><span className="step-number">1</span><div><h3>Select your PDF</h3><p>Click or drag and drop the PDF you want to remove pages from.</p></div></li>
          <li className="step"><span className="step-number">2</span><div><h3>Check pages to delete</h3><p>Select the pages you want to remove by checking their boxes. You can select all or individual pages.</p></div></li>
          <li className="step"><span className="step-number">3</span><div><h3>Download the edited PDF</h3><p>Click Delete and download your PDF without the removed pages — all in your browser.</p></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item"><summary>Can I undo a page deletion?</summary><p>Your original file is never modified. If you change your mind, click Start Over and select the file again.</p></details>
          <details className="faq-item"><summary>What happens if I delete all pages?</summary><p>Deleting all pages is blocked — a PDF must contain at least one page. Deselect at least one page before proceeding.</p></details>
        </div>
      </section>
    </main>
    </ErrorBoundary>
  );
}
