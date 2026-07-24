"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PdfPageGrid } from "@/components/tool/PdfPageGrid";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";

export default function ReorderPdfPagesPage() {
  const {
    state, loadFiles, movePage, rotatePage, toggleSelect,
    selectAll, deselectAll, reset,
    executeMerge, cancelProcessing, selectedCount,
  } = useOrganizer();

  const [filename, setFilename] = useState("reordered.pdf");

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
        <h1 className="tool-title">Reorder PDF Pages Locally</h1>
        <p className="tool-subtitle">
          Drag pages into the desired order, or use the arrow buttons to move pages left or right. No upload, no signup — your file stays private.
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="Reorder PDF pages tool">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} multiple={false} label="Select a PDF file to reorder" description="Click or drag and drop a PDF file here" />
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
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>Drag pages into the desired order, or use the <strong>&larr; &rarr;</strong> buttons below each page to reorder. You can also select multiple pages and rotate in batch.</p>
              <div className="setting-group">
                <label htmlFor="reorder-filename">Output filename</label>
                <input id="reorder-filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
              </div>
              {/* executeMerge with a single document reorders pages: the merge logic reconstructs
                  the PDF with pages in the current order, which is exactly how reordering works. */}
              <button className="btn btn--primary btn--large btn--full" onClick={() => executeMerge(filename.endsWith(".pdf") ? filename : `${filename}.pdf`)} type="button" disabled={state.pages.length === 0}>
                Save Reordered PDF
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">{state.phase.progress?.label ?? "Saving PDF..."}</p>
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
              <h2 className="success-title">PDF reordered successfully</h2>
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
                {state.phase.recoverable && <button className="btn btn--primary" onClick={() => executeMerge(filename.endsWith(".pdf") ? filename : `${filename}.pdf`)} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="how-it-works">
        <h2>How to reorder PDF pages</h2>
        <ol className="steps">
          <li className="step"><span className="step-number">1</span><div><h3>Select your PDF</h3><p>Click or drag and drop the PDF whose pages you want to reorder.</p></div></li>
          <li className="step"><span className="step-number">2</span><div><h3>Rearrange pages</h3><p>Drag pages into the desired order, or use the arrow buttons to move pages left or right.</p></div></li>
          <li className="step"><span className="step-number">3</span><div><h3>Save your PDF</h3><p>Download the reordered PDF — all done privately in your browser.</p></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item"><summary>Can I rotate pages while reordering?</summary><p>Yes. You can rotate individual pages using the rotate buttons on each page thumbnail.</p></details>
          <details className="faq-item"><summary>Is the reorder permanent?</summary><p>The original file is not modified. You download a new PDF with your preferred page order.</p></details>
        </div>
      </section>

      <section className="tool-seo">
        <h2>Related PDF Tools</h2>
        <p>
          <Link href="/tools/merge-pdf">Merge PDF</Link> |{" "}
          <Link href="/tools/rotate-pdf">Rotate PDF</Link> |{" "}
          <Link href="/tools/delete-pdf-pages">Delete PDF Pages</Link>
        </p>
      </section>

      <section className="how-it-works">
        <h2>When to Use Reorder PDF Pages</h2>
        <ul className="use-cases">
          <li className="use-case"><h3>Fixing scanner order mistakes</h3><p>When pages were scanned or inserted in the wrong sequence, reorder them to the correct reading order without rescanning.</p></li>
          <li className="use-case"><h3>Organizing presentation handouts</h3><p>Arrange slides or handout pages in the optimal sequence for a meeting or presentation flow.</p></li>
          <li className="use-case"><h3>Arranging chapters</h3><p>Reorder book or report chapters into a logical structure when they were compiled or scanned out of order.</p></li>
          <li className="use-case"><h3>Moving appendices</h3><p>Relocate supplementary sections (appendices, references, glossaries) to the end of the document for cleaner layout.</p></li>
        </ul>
      </section>

      <section>
        <h2>Limitations</h2>
        <ul>
          <li><strong>Pages are moved individually.</strong> There is no multi-select drag to move several pages at once. Each page must be repositioned one at a time using drag-and-drop or arrow buttons.</li>
          <li><strong>Reordering is per-document.</strong> To reorder pages across multiple PDF files, merge the documents first using our <Link href="/tools/merge-pdf">Merge PDF</Link> tool, then return here to reorder.</li>
          <li><strong>Page quality is preserved.</strong> Reordering does not rasterize or reprocess page content — all original quality, fonts, and vector graphics remain intact.</li>
        </ul>
      </section>
    </main>
    </ErrorBoundary>
  );
}
