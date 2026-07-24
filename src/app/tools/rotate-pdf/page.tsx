"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PdfPageGrid } from "@/components/tool/PdfPageGrid";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";

export default function RotatePdfPage() {
  const {
    state, loadFiles, movePage, rotatePage, toggleSelect,
    selectAll, deselectAll, reset,
    executeRotate, cancelProcessing, selectedCount,
  } = useOrganizer();

  const [filename, setFilename] = useState("rotated.pdf");

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
        <h1 className="tool-title">Rotate PDF Pages Locally</h1>
        <p className="tool-subtitle">
          Rotate individual or all pages in a PDF. No upload, no signup — your file stays on your device.
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="Rotate PDF tool">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} multiple={false} label="Select a PDF file to rotate" description="Click or drag and drop a PDF file here" />
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
                actionLabel="Rotate"
              />
            </div>
            <div className="editor-settings">
              <div className="setting-group">
                <label htmlFor="rotate-filename">Output filename</label>
                <input id="rotate-filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
              </div>
              <button className="btn btn--primary btn--large btn--full" onClick={() => executeRotate(filename.endsWith(".pdf") ? filename : `${filename}.pdf`)} type="button" disabled={state.pages.length === 0}>
                Save Rotated PDF
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">{state.phase.progress?.label ?? "Rotating pages..."}</p>
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
              <h2 className="success-title">PDF rotated successfully</h2>
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
                {state.phase.recoverable && <button className="btn btn--primary" onClick={() => executeRotate(filename.endsWith(".pdf") ? filename : `${filename}.pdf`)} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="how-it-works">
        <h2>How to rotate PDF pages</h2>
        <ol className="steps">
          <li className="step"><span className="step-number">1</span><div><h3>Select your PDF</h3><p>Click or drag and drop the PDF you want to rotate.</p></div></li>
          <li className="step"><span className="step-number">2</span><div><h3>Rotate pages</h3><p>Use the rotate buttons on each page or select multiple pages to rotate in batch.</p></div></li>
          <li className="step"><span className="step-number">3</span><div><h3>Save your PDF</h3><p>Download the rotated PDF — all done in your browser.</p></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item"><summary>Can I rotate only certain pages?</summary><p>Yes. Click individual pages or select multiple to rotate only those you want.</p></details>
          <details className="faq-item"><summary>Is rotation lossless?</summary><p>Yes. Rotations are applied at the PDF metadata level so quality is preserved.</p></details>
        </div>
      </section>

      <section className="tool-seo">
        <h2>Related PDF Tools</h2>
        <p>
          <Link href="/tools/reorder-pdf-pages">Reorder PDF Pages</Link> |{" "}
          <Link href="/tools/crop-pdf">Crop PDF</Link> |{" "}
          <Link href="/tools/merge-pdf">Merge PDF</Link>
        </p>
      </section>

      <section className="how-it-works">
        <h2>When to Use Rotate PDF</h2>
        <ul className="use-cases">
          <li className="use-case"><h3>Fixing sideways scans</h3><p>Correct pages that were scanned in the wrong orientation (e.g. landscape instead of portrait) so all pages face the same direction.</p></li>
          <li className="use-case"><h3>Correcting phone-captured documents</h3><p>Phone cameras often capture documents at odd angles. Rotate pages to the correct reading orientation in one click.</p></li>
          <li className="use-case"><h3>Preparing landscape pages for printing</h3><p>Ensure landscape-oriented tables, charts, or diagrams are oriented correctly so they print properly in a mixed-orientation document.</p></li>
        </ul>
      </section>

      <section>
        <h2>Limitations</h2>
        <ul>
          <li><strong>Rotation is applied at the PDF metadata level.</strong> The rotation setting is added to the page metadata — the actual page content is not re-rendered or rasterized. This preserves quality but means the effect is a flag, not a pixel-level transformation.</li>
          <li><strong>Some PDF viewers may ignore rotation metadata.</strong> Most modern viewers (Chrome, Edge, Adobe Acrobat) respect the rotation flag, but some older or minimal PDF viewers may display pages in their original orientation.</li>
        </ul>
      </section>
    </main>
    </ErrorBoundary>
  );
}
