"use client";

import { useCallback, useState } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";

interface NUpLayout {
  label: string;
  cols: number;
  rows: number;
}

const NUP_LAYOUTS: NUpLayout[] = [
  { label: "2-up (1x2)", cols: 1, rows: 2 },
  { label: "4-up (2x2)", cols: 2, rows: 2 },
  { label: "6-up (2x3)", cols: 2, rows: 3 },
  { label: "8-up (2x4)", cols: 2, rows: 4 },
  { label: "9-up (3x3)", cols: 3, rows: 3 },
];

interface OutputSize {
  label: string;
  width: number;
  height: number;
}

const OUTPUT_SIZES: OutputSize[] = [
  { label: "A4 Portrait (210 x 297 mm)", width: 595.28, height: 841.89 },
  { label: "A4 Landscape (297 x 210 mm)", width: 841.89, height: 595.28 },
  { label: "Letter Portrait (216 x 279 mm)", width: 612, height: 792 },
  { label: "Letter Landscape (279 x 216 mm)", width: 792, height: 612 },
];

export default function NUpPdfPage() {
  const {
    state, loadFiles, reset,
    executeNUp, cancelProcessing,
  } = useOrganizer();

  const [filename, setFilename] = useState("n-up.pdf");
  const [layoutIndex, setLayoutIndex] = useState(1);
  const [outputIndex, setOutputIndex] = useState(0);
  const [padding, setPadding] = useState(5);

  const handleCreate = useCallback(() => {
    const layout = NUP_LAYOUTS[layoutIndex]!;
    const size = OUTPUT_SIZES[outputIndex]!;
    executeNUp(
      layout.cols,
      layout.rows,
      size.width,
      size.height,
      padding,
      filename.endsWith(".pdf") ? filename : `${filename}.pdf`
    );
  }, [layoutIndex, outputIndex, padding, filename, executeNUp]);

  const handleDownload = useCallback(() => {
    if (state.phase.phase !== "success") return;
    const a = document.createElement("a");
    a.href = state.phase.objectUrl;
    a.download = state.phase.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [state]);

  return (
    <ErrorBoundary>
    <main className="tool-page">
      <div className="tool-hero">
        <h1 className="tool-title">N-Up PDF Locally</h1>
        <p className="tool-subtitle">
          Fit multiple PDF pages onto a single sheet — great for handouts, proof sheets and paper-saving print layouts. No upload, no signup.
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="N-Up PDF tool">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} multiple={false} label="Select a PDF for N-up layout" description="Click or drag and drop a PDF file here" />
        )}

        {state.phase.phase === "loading" && (
          <div className="validating-state" role="status" aria-live="polite"><div className="spinner" aria-hidden="true" /><p>Reading your file...</p></div>
        )}

        {state.phase.phase === "editing" && (
          <div className="editor-layout">
            <div className="editor-pages">
              <div className="editor-header">
                <h2 className="editor-title">{state.pages.length} {state.pages.length === 1 ? "page" : "pages"} — {NUP_LAYOUTS[layoutIndex]!.label}</h2>
                <div className="editor-header-actions">
                  <button className="btn btn--secondary btn--sm" onClick={reset} type="button">Start over</button>
                </div>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "var(--space-4)" }}>
                Each output page will contain {NUP_LAYOUTS[layoutIndex]!.cols * NUP_LAYOUTS[layoutIndex]!.rows} original pages.
                {state.pages.length > 0 && (
                  <> The result will be approximately {Math.ceil(state.pages.length / (NUP_LAYOUTS[layoutIndex]!.cols * NUP_LAYOUTS[layoutIndex]!.rows))} output page{Math.ceil(state.pages.length / (NUP_LAYOUTS[layoutIndex]!.cols * NUP_LAYOUTS[layoutIndex]!.rows)) !== 1 ? "s" : ""}.</>
                )}
              </p>
            </div>
            <div className="editor-settings">
              <div className="setting-group">
                <label htmlFor="nu-layout">Pages per sheet</label>
                <select id="nu-layout" value={layoutIndex} onChange={(e) => setLayoutIndex(parseInt(e.target.value, 10))}>
                  {NUP_LAYOUTS.map((l, i) => (
                    <option key={l.label} value={i}>{l.label}</option>
                  ))}
                </select>
              </div>
              <div className="setting-group">
                <label htmlFor="nu-size">Output page size</label>
                <select id="nu-size" value={outputIndex} onChange={(e) => setOutputIndex(parseInt(e.target.value, 10))}>
                  {OUTPUT_SIZES.map((s, i) => (
                    <option key={s.label} value={i}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div className="setting-group">
                <label htmlFor="nu-padding">Padding between pages (pt)</label>
                <input id="nu-padding" type="number" value={padding} onChange={(e) => setPadding(Math.max(0, Math.min(50, parseInt(e.target.value, 10) || 0)))} min={0} max={50} />
              </div>
              <div className="setting-group">
                <label htmlFor="nu-filename">Output filename</label>
                <input id="nu-filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
              </div>
              <button className="btn btn--primary btn--large btn--full" onClick={handleCreate} type="button" disabled={state.pages.length === 0}>
                Create N-Up PDF
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">{state.phase.progress?.label ?? "Creating N-up layout..."}</p>
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
              <h2 className="success-title">N-Up PDF created successfully</h2>
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
                {state.phase.recoverable && <button className="btn btn--primary" onClick={handleCreate} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="how-it-works">
        <h2>How to create an N-Up PDF</h2>
        <ol className="steps">
          <li className="step"><span className="step-number">1</span><div><h3>Select your PDF</h3><p>Choose the PDF file you want to rearrange into an N-up layout.</p></div></li>
          <li className="step"><span className="step-number">2</span><div><h3>Choose layout &amp; settings</h3><p>Pick how many pages per sheet (2-up, 4-up, etc.), output size, and padding between pages.</p></div></li>
          <li className="step"><span className="step-number">3</span><div><h3>Download the result</h3><p>Click "Create N-Up PDF" and download — all processing happens in your browser.</p></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item"><summary>What is an N-up layout?</summary><p>N-up layouts fit multiple pages of a document onto each sheet. It&apos;s commonly used for printing slide handouts, proof sheets, or reducing page count for sharing.</p></details>
          <details className="faq-item"><summary>Can I change the page order?</summary><p>Pages are arranged in reading order (left to right, top to bottom). For custom ordering, use the <a href="/tools/reorder-pdf-pages">Reorder PDF pages</a> tool first.</p></details>
        </div>
      </section>
    </main>
    </ErrorBoundary>
  );
}
