"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PdfPageGrid } from "@/components/tool/PdfPageGrid";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";

export default function CropPdfPage() {
  const {
    state, loadFiles, movePage, rotatePage, toggleSelect,
    selectAll, deselectAll, reset,
    executeResize, cancelProcessing, selectedCount,
  } = useOrganizer();

  const [filename, setFilename] = useState("cropped.pdf");
  const [top, setTop] = useState(0);
  const [right, setRight] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);

  const POINTS_PER_MM = 72 / 25.4;

  const handleCrop = useCallback(() => {
    const firstPage = state.pages[0];
    if (!firstPage) return;
    const cropLeft = left * POINTS_PER_MM;
    const cropRight = right * POINTS_PER_MM;
    const cropTop = top * POINTS_PER_MM;
    const cropBottom = bottom * POINTS_PER_MM;
    const targetW = Math.max(10, firstPage.width - cropLeft - cropRight);
    const targetH = Math.max(10, firstPage.height - cropTop - cropBottom);
    executeResize(targetW, targetH, "canvas", filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
  }, [state.pages, left, right, top, bottom, filename, executeResize]);

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
        <h1 className="tool-title">Crop PDF Pages Locally</h1>
        <p className="tool-subtitle">
          Trim margins from your PDF pages. Visual crop is coming soon — right now you can remove margins by resizing.
          <br /><span className="beta-badge" style={{ display: "inline-block", marginTop: "0.5rem", padding: "0.125rem 0.5rem", fontSize: "0.75rem", background: "var(--color-accent)", color: "#fff", borderRadius: "999px", fontWeight: 600 }}>Beta</span>
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="Crop PDF tool">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} multiple={false} label="Select a PDF file to crop" description="Click or drag and drop a PDF file here" />
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

              <div className="toast toast--info" style={{ marginBottom: "1rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                Visual crop (selecting areas directly on the page preview) is coming soon. For now, enter margin values to trim sides.
              </div>

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
              <p style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem" }}>Trim margins (mm)</p>
              <div className="setting-group">
                <label htmlFor="crop-top">Top</label>
                <input id="crop-top" type="number" value={top} onChange={(e) => setTop(Math.max(0, parseInt(e.target.value, 10) || 0))} min={0} />
              </div>
              <div className="setting-group">
                <label htmlFor="crop-right">Right</label>
                <input id="crop-right" type="number" value={right} onChange={(e) => setRight(Math.max(0, parseInt(e.target.value, 10) || 0))} min={0} />
              </div>
              <div className="setting-group">
                <label htmlFor="crop-bottom">Bottom</label>
                <input id="crop-bottom" type="number" value={bottom} onChange={(e) => setBottom(Math.max(0, parseInt(e.target.value, 10) || 0))} min={0} />
              </div>
              <div className="setting-group">
                <label htmlFor="crop-left">Left</label>
                <input id="crop-left" type="number" value={left} onChange={(e) => setLeft(Math.max(0, parseInt(e.target.value, 10) || 0))} min={0} />
              </div>
              <div className="setting-group">
                <label htmlFor="crop-filename">Output filename</label>
                <input id="crop-filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
              </div>
              <button className="btn btn--primary btn--large btn--full" onClick={handleCrop} type="button" disabled={state.pages.length === 0}>
                Apply Crop
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">{state.phase.progress?.label ?? "Cropping pages..."}</p>
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
              <h2 className="success-title">PDF cropped successfully</h2>
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
                {state.phase.recoverable && <button className="btn btn--primary" onClick={handleCrop} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="how-it-works">
        <h2>How to crop PDF pages</h2>
        <ol className="steps">
          <li className="step"><span className="step-number">1</span><div><h3>Select your PDF</h3><p>Choose the PDF file you want to trim margins from.</p></div></li>
          <li className="step"><span className="step-number">2</span><div><h3>Set margin values</h3><p>Enter the amount to trim from the top, right, bottom, and left of each page in millimeters.</p></div></li>
          <li className="step"><span className="step-number">3</span><div><h3>Download cropped PDF</h3><p>Click "Apply Crop" and download your trimmed PDF — all processing stays on your device.</p></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item"><summary>Is visual crop selection available?</summary><p>Not yet — visual crop (dragging to select crop area on the page preview) is planned for a future update. Currently, you enter numeric margin values.</p></details>
          <details className="faq-item"><summary>Does cropping affect PDF quality?</summary><p>No. Pages are resized while keeping content at its original quality. The trimmed areas are simply removed from the page boundary.</p></details>
        </div>
      </section>

      <section className="tool-seo">
        <h2>Related PDF Tools</h2>
        <p>
          <Link href="/tools/resize-pdf-pages">Resize PDF Pages</Link> |{" "}
          <Link href="/tools/rotate-pdf">Rotate PDF</Link> |{" "}
          <Link href="/tools/n-up-pdf">N-Up PDF</Link>
        </p>
      </section>

      <section className="how-it-works">
        <h2>When to Use Crop PDF</h2>
        <ul className="use-cases">
          <li className="use-case"><h3>Removing scanner margins</h3><p>Trim away the black borders, shadows, and excess margins that scanners add around document pages.</p></li>
          <li className="use-case"><h3>Cropping shipping labels</h3><p>Isolate shipping labels from a full-page PDF for cleaner printing or digital record-keeping.</p></li>
          <li className="use-case"><h3>Trimming excess whitespace</h3><p>Remove unnecessary white space around content to produce a tighter, more professional-looking document.</p></li>
        </ul>
      </section>

      <section>
        <h2>Limitations</h2>
        <ul>
          <li><strong>All pages receive the same trim values.</strong> Visual crop selection is under development. Cropped content is permanently removed from the output. Content is not reflowed — cropping only changes page dimensions.</li>
        </ul>
      </section>
    </main>
    </ErrorBoundary>
  );
}
