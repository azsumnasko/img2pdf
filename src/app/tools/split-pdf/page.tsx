"use client";

import { useCallback, useState } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PdfPageGrid } from "@/components/tool/PdfPageGrid";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";

type SplitMode = "all-pages" | "custom-ranges" | "every-n-pages";

export default function SplitPdfPage() {
  const {
    state, loadFiles, movePage, rotatePage, toggleSelect,
    selectAll, deselectAll, reset,
    executeSplit, cancelProcessing, selectedCount,
  } = useOrganizer();

  const [filename, setFilename] = useState("split");
  const [splitMode, setSplitMode] = useState<SplitMode>("all-pages");
  const [customRanges, setCustomRanges] = useState("");
  const [everyN, setEveryN] = useState(2);

  const handleDownload = useCallback(() => {
    if (state.phase.phase !== "success") return;
    const a = document.createElement("a");
    a.href = state.phase.objectUrl;
    a.download = state.phase.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [state]);

  const handleSplit = useCallback(() => {
    const outFilename = filename.endsWith(".pdf") ? filename : filename;
    if (splitMode === "all-pages") {
      executeSplit("all-pages", outFilename);
    } else if (splitMode === "custom-ranges") {
      executeSplit("custom-ranges", outFilename, { ranges: customRanges });
    } else {
      executeSplit("every-n-pages", outFilename, { n: everyN });
    }
  }, [splitMode, customRanges, everyN, filename, executeSplit]);

  const warnings = state.phase.phase === "editing" && state.phase.warnings?.length ? state.phase.warnings : null;

  return (
    <ErrorBoundary>
    <main className="tool-page">
      <div className="tool-hero">
        <h1 className="tool-title">Split PDF Files Locally</h1>
        <p className="tool-subtitle">
          Separate a PDF into individual pages or custom ranges. No upload, no signup — all processing stays on your device.
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="Split PDF tool">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} multiple={false} label="Select a PDF file to split" description="Click or drag and drop a PDF file here" />
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
            </div>
            <div className="editor-settings">
              <fieldset className="setting-group">
                <legend style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem" }}>Split mode</legend>
                <label className="page-card-check" style={{ cursor: "pointer", gap: "0.5rem" }}>
                  <input type="radio" name="split-mode" checked={splitMode === "all-pages"} onChange={() => setSplitMode("all-pages")} />
                  Every page
                </label>
                <label className="page-card-check" style={{ cursor: "pointer", gap: "0.5rem" }}>
                  <input type="radio" name="split-mode" checked={splitMode === "custom-ranges"} onChange={() => setSplitMode("custom-ranges")} />
                  Custom ranges
                </label>
                {splitMode === "custom-ranges" && (
                  <input type="text" value={customRanges} onChange={(e) => setCustomRanges(e.target.value)} placeholder="e.g. 1-3,5,8-10" style={{ marginTop: "0.25rem", marginLeft: "1.5rem" }} />
                )}
                <label className="page-card-check" style={{ cursor: "pointer", gap: "0.5rem" }}>
                  <input type="radio" name="split-mode" checked={splitMode === "every-n-pages"} onChange={() => setSplitMode("every-n-pages")} />
                  Every N pages
                </label>
                {splitMode === "every-n-pages" && (
                  <input type="number" value={everyN} onChange={(e) => setEveryN(Math.max(1, parseInt(e.target.value, 10) || 1))} min={1} style={{ marginTop: "0.25rem", marginLeft: "1.5rem", width: "80px" }} />
                )}
              </fieldset>
              <div className="setting-group">
                <label htmlFor="split-filename">Output filename prefix</label>
                <input id="split-filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
              </div>
              <button className="btn btn--primary btn--large btn--full" onClick={handleSplit} type="button" disabled={state.pages.length === 0}>
                Split PDF
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">{state.phase.progress?.label ?? "Splitting PDF..."}</p>
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
              <h2 className="success-title">PDF split successfully</h2>
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
                {state.phase.recoverable && <button className="btn btn--primary" onClick={handleSplit} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="how-it-works">
        <h2>How to split PDF files</h2>
        <ol className="steps">
          <li className="step"><span className="step-number">1</span><div><h3>Select your PDF</h3><p>Select the PDF you want to split — it stays in your browser.</p></div></li>
          <li className="step"><span className="step-number">2</span><div><h3>Choose split mode</h3><p>Split every page, by custom ranges, or every N pages.</p></div></li>
          <li className="step"><span className="step-number">3</span><div><h3>Download your files</h3><p>Download individual PDFs or a ZIP archive with all split pages.</p></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item"><summary>Is my PDF uploaded to any server?</summary><p>No. Splitting happens entirely in your browser. Your file never leaves your device.</p></details>
          <details className="faq-item"><summary>Can I split by custom page ranges?</summary><p>Yes. Use ranges like "1-3,5,8-10" to extract specific pages into separate files.</p></details>
        </div>
      </section>
    </main>
    </ErrorBoundary>
  );
}
