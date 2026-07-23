"use client";

import { useCallback, useState } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";

type Position = "top" | "bottom";
type Alignment = "left" | "center" | "right";

interface PageNumberFormat {
  value: string;
  label: string;
}

const FORMATS: PageNumberFormat[] = [
  { value: "{page}", label: "1" },
  { value: "Page {page}", label: "Page 1" },
  { value: "{page} of {total}", label: "1 of N" },
  { value: "Page {page} of {total}", label: "Page 1 of N" },
];

export default function AddPageNumbersToPdfPage() {
  const {
    state, loadFiles, reset,
    executeAddPageNumbers, cancelProcessing,
  } = useOrganizer();

  const [filename, setFilename] = useState("numbered.pdf");
  const [position, setPosition] = useState<Position>("bottom");
  const [align, setAlign] = useState<Alignment>("center");
  const [format, setFormat] = useState("{page} of {total}");
  const [fontSize, setFontSize] = useState(10);
  const [margin, setMargin] = useState(15);
  const [startPage, setStartPage] = useState(1);
  const [startNumber, setStartNumber] = useState(1);
  const [color, setColor] = useState("#000000");

  const handleGenerate = useCallback(() => {
    executeAddPageNumbers(
      {
        position,
        align,
        format,
        fontSize,
        margin,
        startPage,
        startNumber,
        color,
      },
      filename.endsWith(".pdf") ? filename : `${filename}.pdf`
    );
  }, [position, align, format, fontSize, margin, startPage, startNumber, color, filename, executeAddPageNumbers]);

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
        <h1 className="tool-title">Add Page Numbers to PDF Locally</h1>
        <p className="tool-subtitle">
          Insert page numbers into your PDF with full control over position, format, and style. No upload, no signup.
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="Add page numbers to PDF tool">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} multiple={false} label="Select a PDF to add page numbers" description="Click or drag and drop a PDF file here" />
        )}

        {state.phase.phase === "loading" && (
          <div className="validating-state" role="status" aria-live="polite"><div className="spinner" aria-hidden="true" /><p>Reading your file...</p></div>
        )}

        {state.phase.phase === "editing" && (
          <div className="editor-layout">
            <div className="editor-pages">
              <div className="editor-header">
                <h2 className="editor-title">{state.pages.length} {state.pages.length === 1 ? "page" : "pages"} — ready for numbering</h2>
                <div className="editor-header-actions">
                  <button className="btn btn--secondary btn--sm" onClick={reset} type="button">Start over</button>
                </div>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "var(--space-4)" }}>
                Configure page number settings in the panel, then click "Add Page Numbers" to generate a new numbered PDF.
              </p>
            </div>
            <div className="editor-settings">
              <div className="setting-group">
                <label htmlFor="pn-position">Position</label>
                <select id="pn-position" value={position} onChange={(e) => setPosition(e.target.value as Position)}>
                  <option value="top">Top of page</option>
                  <option value="bottom">Bottom of page</option>
                </select>
              </div>
              <div className="setting-group">
                <label htmlFor="pn-align">Alignment</label>
                <select id="pn-align" value={align} onChange={(e) => setAlign(e.target.value as Alignment)}>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <div className="setting-group">
                <label htmlFor="pn-format">Number format</label>
                <select id="pn-format" value={format} onChange={(e) => setFormat(e.target.value)}>
                  {FORMATS.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
              <div className="setting-group">
                <label htmlFor="pn-font-size">Font size (pt)</label>
                <input id="pn-font-size" type="number" value={fontSize} onChange={(e) => setFontSize(Math.max(6, Math.min(48, parseInt(e.target.value, 10) || 10)))} min={6} max={48} />
              </div>
              <div className="setting-group">
                <label htmlFor="pn-margin">Margin (mm)</label>
                <input id="pn-margin" type="number" value={margin} onChange={(e) => setMargin(Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 15)))} min={0} max={100} />
              </div>
              <div className="setting-group">
                <label htmlFor="pn-start-page">Start page (first page to number)</label>
                <input id="pn-start-page" type="number" value={startPage} onChange={(e) => setStartPage(Math.max(1, parseInt(e.target.value, 10) || 1))} min={1} />
              </div>
              <div className="setting-group">
                <label htmlFor="pn-start-number">Start number</label>
                <input id="pn-start-number" type="number" value={startNumber} onChange={(e) => setStartNumber(Math.max(0, parseInt(e.target.value, 10) || 1))} min={0} />
              </div>
              <div className="setting-group">
                <label htmlFor="pn-color">Color</label>
                <input id="pn-color" type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: "100%", height: "36px", padding: "2px", cursor: "pointer" }} />
              </div>
              <div className="setting-group">
                <label htmlFor="pn-filename">Output filename</label>
                <input id="pn-filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
              </div>
              <button className="btn btn--primary btn--large btn--full" onClick={handleGenerate} type="button" disabled={state.pages.length === 0}>
                Add Page Numbers
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">{state.phase.progress?.label ?? "Adding page numbers..."}</p>
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
              <h2 className="success-title">Page numbers added successfully</h2>
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
                {state.phase.recoverable && <button className="btn btn--primary" onClick={handleGenerate} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="how-it-works">
        <h2>How to add page numbers to a PDF</h2>
        <ol className="steps">
          <li className="step"><span className="step-number">1</span><div><h3>Select your PDF</h3><p>Select the PDF file you want to add page numbers to.</p></div></li>
          <li className="step"><span className="step-number">2</span><div><h3>Customize numbering</h3><p>Choose position, alignment, format, font size, color, and start page.</p></div></li>
          <li className="step"><span className="step-number">3</span><div><h3>Download the result</h3><p>Download your PDF with page numbers added — all done in your browser.</p></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item"><summary>Can I skip numbering the first page?</summary><p>Yes. Set "Start page" to 2 or any page number — pages before that will not be numbered.</p></details>
          <details className="faq-item"><summary>What formats are available?</summary><p>Plain numbers (1, 2, 3), "Page 1", "1 of N", and "Page 1 of N" — with customizable color and font size.</p></details>
        </div>
      </section>
    </main>
    </ErrorBoundary>
  );
}
