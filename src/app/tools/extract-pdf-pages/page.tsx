"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PdfPageGrid } from "@/components/tool/PdfPageGrid";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";

export default function ExtractPdfPagesPage() {
  const {
    state, loadFiles, movePage, rotatePage, toggleSelect,
    selectAll, deselectAll, reset,
    executeExtract, cancelProcessing, selectedCount,
  } = useOrganizer();

  const [filename, setFilename] = useState("extracted");
  const [combinePages, setCombinePages] = useState(true);

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
        <h1 className="tool-title">Extract PDF Pages Locally</h1>
        <p className="tool-subtitle">
          Extract specific pages from a PDF into a new file. No upload, no signup — your file stays on your device.
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="Extract PDF pages tool">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} multiple={false} label="Select a PDF file to extract from" description="Click or drag and drop a PDF file here" />
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

              {selectedCount > 0 && (
                <p style={{ marginTop: "var(--space-4)", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  {selectedCount} page{selectedCount !== 1 ? "s" : ""} selected for extraction.
                </p>
              )}
            </div>
            <div className="editor-settings">
              <fieldset className="setting-group">
                <legend style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem" }}>Output format</legend>
                <label className="page-card-check" style={{ cursor: "pointer", gap: "0.5rem" }}>
                  <input type="radio" name="extract-mode" checked={combinePages} onChange={() => setCombinePages(true)} />
                  Combine into one PDF
                </label>
                <label className="page-card-check" style={{ cursor: "pointer", gap: "0.5rem" }}>
                  <input type="radio" name="extract-mode" checked={!combinePages} onChange={() => setCombinePages(false)} />
                  Extract as separate files
                </label>
              </fieldset>
              <div className="setting-group">
                <label htmlFor="extract-filename">Output filename{!combinePages ? " prefix" : ""}</label>
                <input id="extract-filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
              </div>
              <button className="btn btn--primary btn--large btn--full" onClick={() => executeExtract(filename.endsWith(".pdf") ? filename : `${filename}.pdf`, combinePages)} type="button" disabled={selectedCount === 0}>
                Extract Selected Pages
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">{state.phase.progress?.label ?? "Extracting pages..."}</p>
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
              <h2 className="success-title">Pages extracted successfully</h2>
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
                {state.phase.recoverable && <button className="btn btn--primary" onClick={() => executeExtract(filename.endsWith(".pdf") ? filename : `${filename}.pdf`, combinePages)} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="how-it-works">
        <h2>How to extract PDF pages</h2>
        <ol className="steps">
          <li className="step"><span className="step-number">1</span><div><h3>Select your PDF</h3><p>Click or drag and drop the PDF you want to extract pages from.</p></div></li>
          <li className="step"><span className="step-number">2</span><div><h3>Choose pages to extract</h3><p>Check the pages you want to extract. Select one or many.</p></div></li>
          <li className="step"><span className="step-number">3</span><div><h3>Download the result</h3><p>Choose to combine into one PDF or get separate files. Then download — all done in your browser.</p></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item"><summary>Can I extract pages into separate files?</summary><p>Yes. Choose "Extract as separate files" to get each selected page as its own PDF, or as a ZIP archive.</p></details>
          <details className="faq-item"><summary>Is the original file modified?</summary><p>No. Your original PDF stays untouched. You download a new file with only the extracted pages.</p></details>
        </div>
      </section>

      <section className="tool-seo">
        <h2>Related PDF Tools</h2>
        <p>
          <Link href="/tools/split-pdf">Split PDF</Link> |{" "}
          <Link href="/tools/delete-pdf-pages">Delete PDF Pages</Link> |{" "}
          <Link href="/tools/merge-pdf">Merge PDF</Link>
        </p>
      </section>

      <section className="how-it-works">
        <h2>When to Use Extract PDF Pages</h2>
        <ul className="use-cases">
          <li className="use-case"><h3>Pulling out specific forms</h3><p>Extract a single form from a large document packet so you can fill it out and submit it independently.</p></li>
          <li className="use-case"><h3>Extracting a signed page</h3><p>Isolate a signature or approval page from a contract to include as a standalone record.</p></li>
          <li className="use-case"><h3>Saving selected chapters as separate documents</h3><p>Pull out only the chapters or sections you need from a lengthy PDF, leaving the rest behind.</p></li>
        </ul>
      </section>

      <section>
        <h2>Limitations</h2>
        <ul>
          <li><strong>Extracted pages maintain original quality.</strong> Pages are copied as-is from the source PDF with no re-compression or quality loss.</li>
          <li><strong>Combine mode creates one PDF from selected pages.</strong> When combining, the original page order is preserved in the output file.</li>
          <li><strong>Separate files come as a ZIP for multiple pages.</strong> When extracting as separate files, selecting more than one page produces a ZIP archive rather than triggering multiple downloads.</li>
        </ul>
      </section>

      <section>
        <h2>Extract vs Split vs Delete</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Extract</th>
              <th>Delete</th>
              <th>Split</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>What it does</strong></td>
              <td>Choose pages you <strong>want</strong> to keep as a new PDF</td>
              <td>Remove pages you <strong>don&apos;t want</strong> (modifies the original)</td>
              <td>Produce multiple separate files from one PDF</td>
            </tr>
            <tr>
              <td><strong>Best for</strong></td>
              <td>Saving a few pages you need from a large document</td>
              <td>Cleaning up a document by removing unwanted pages</td>
              <td>Breaking one PDF into many individual files</td>
            </tr>
            <tr>
              <td><strong>Output</strong></td>
              <td>One new PDF (or ZIP for separate files)</td>
              <td>One modified PDF</td>
              <td>Multiple PDFs (or one ZIP)</td>
            </tr>
            <tr>
              <td><strong>Original file</strong></td>
              <td>Unchanged</td>
              <td>Unchanged (you download the modified copy)</td>
              <td>Unchanged</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Browser / Device Support</h2>
        <p>Works in all modern browsers. Extracted pages maintain original quality without rasterization. ZIP downloads for multiple files work in all modern browsers.</p>
      </section>
    </main>
    </ErrorBoundary>
  );
}
