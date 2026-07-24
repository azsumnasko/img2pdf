"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PdfPageGrid } from "@/components/tool/PdfPageGrid";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";

export default function MergePdfPage() {
  const {
    state, loadFiles, movePage, rotatePage, toggleSelect,
    selectAll, deselectAll, removeDocument, reset,
    executeMerge, cancelProcessing, selectedCount,
  } = useOrganizer();

  const [filename, setFilename] = useState("merged.pdf");

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
        <h1 className="tool-title">Merge PDF Files Locally</h1>
        <p className="tool-subtitle">
          Combine multiple PDFs into a single file right in your browser. Your files stay private — no upload.
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="Merge PDF tool">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} label="Select PDF files to merge" description="Click or drag and drop multiple PDF files here" />
        )}

        {state.phase.phase === "loading" && (
          <div className="validating-state" role="status" aria-live="polite"><div className="spinner" aria-hidden="true" /><p>Reading your files...</p></div>
        )}

        {state.phase.phase === "editing" && (
          <div className="editor-layout">
            <div className="editor-pages">
              <div className="editor-header">
                <h2 className="editor-title">
                  {state.documents.length} {state.documents.length === 1 ? "document" : "documents"} — {state.pages.length} {state.pages.length === 1 ? "page" : "pages"} total
                </h2>
                <div className="editor-header-actions">
                  <button className="btn btn--secondary btn--sm" onClick={reset} type="button">Start over</button>
                </div>
              </div>

              {warnings && (
                <div className="toast toast--warning" role="alert">
                  <span>{warnings.length} warning{warnings.length !== 1 ? "s" : ""} — some files could not be fully loaded.</span>
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
              <div className="setting-group">
                <label htmlFor="merge-filename">Output filename</label>
                <input id="merge-filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
              </div>
              <button className="btn btn--primary btn--large btn--full" onClick={() => executeMerge(filename.endsWith(".pdf") ? filename : `${filename}.pdf`)} type="button" disabled={state.pages.length === 0}>
                Merge PDF
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">{state.phase.progress?.label ?? "Merging PDFs..."}</p>
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
              <h2 className="success-title">PDF merged successfully</h2>
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
        <h2>How to merge PDF files</h2>
        <ol className="steps">
          <li className="step"><span className="step-number">1</span><div><h3>Select your PDFs</h3><p>Click or drag and drop the PDF files you want to combine.</p></div></li>
          <li className="step"><span className="step-number">2</span><div><h3>Reorder your pages</h3><p>Drag and drop to rearrange pages. Rotate individual pages if needed.</p></div></li>
          <li className="step"><span className="step-number">3</span><div><h3>Download the merged PDF</h3><p>Click Merge and download your combined PDF — all done in your browser.</p></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item"><summary>Are my PDFs uploaded anywhere?</summary><p>No. Merging happens entirely in your browser. Your files never leave your device.</p></details>
          <details className="faq-item"><summary>Is there a limit on file size?</summary><p>There is no hard limit, but performance depends on your device and browser. Very large files may take longer.</p></details>
          <details className="faq-item"><summary>Can I rearrange pages across documents?</summary><p>Yes. You can reorder pages from all documents in any order before merging.</p></details>
        </div>
      </section>

      <section className="tool-seo">
        <h2>Related PDF Tools</h2>
        <p>
          <Link href="/tools/split-pdf">Split PDF</Link> |{" "}
          <Link href="/tools/extract-pdf-pages">Extract PDF Pages</Link> |{" "}
          <Link href="/tools/delete-pdf-pages">Delete PDF Pages</Link> |{" "}
          <Link href="/tools/reorder-pdf-pages">Reorder PDF Pages</Link>
        </p>
      </section>

      <section className="how-it-works">
        <h2>When to Use Merge PDF</h2>
        <ul className="use-cases">
          <li className="use-case"><h3>Combining invoices</h3><p>Merge multiple invoice PDFs into a single file for easier record-keeping and sharing with accountants or clients.</p></li>
          <li className="use-case"><h3>Merging scanned chapters</h3><p>Combine separately scanned book chapters or sections into one complete document for reading or printing.</p></li>
          <li className="use-case"><h3>Assembling reports</h3><p>Join cover pages, body content, and appendices from separate PDFs into a polished final report.</p></li>
          <li className="use-case"><h3>Combining contracts</h3><p>Merge signature pages, terms, and exhibits into one complete contract package before sending for review.</p></li>
        </ul>
      </section>

      <section>
        <h2>Limitations & Known Issues</h2>
        <ul>
          <li><strong>Large files may be slow.</strong> Merging very large or many PDFs can be memory-intensive and may slow down on older devices.</li>
          <li><strong>Password-protected PDFs need password removal first.</strong> Encrypted or locked PDFs cannot be read by the browser. Remove passwords before merging.</li>
          <li><strong>Digital signatures may be invalidated.</strong> Merging signed PDFs typically breaks digital signature verification since the document content changes.</li>
          <li><strong>Form fields may not merge correctly.</strong> Interactive form fields from different PDFs may conflict or be lost during the merge process.</li>
        </ul>
      </section>

      <section>
        <h2>Browser & Device Support</h2>
        <p>This tool works in all modern browsers: Chrome, Firefox, Edge, and Safari. Processing performance varies by device memory — larger files perform best on desktop with 8 GB RAM or more. Mobile devices may struggle with very large merges.</p>
      </section>
    </main>
    </ErrorBoundary>
  );
}
