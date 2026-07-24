"use client";

import Link from "next/link";
import { useCallback, useState, useMemo } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";

export default function CompressPdfPage() {
  const {
    state, loadFiles, reset,
    executeCompress, cancelProcessing,
  } = useOrganizer();

  const [filename, setFilename] = useState("compressed.pdf");

  const originalSize = useMemo(() => {
    if (state.phase.phase === "editing" || state.phase.phase === "processing" || state.phase.phase === "success") {
      return state.documents[0]?.file?.size ?? 0;
    }
    return 0;
  }, [state.phase, state.documents]);

  const compressedSize = state.phase.phase === "success" ? state.phase.bytes : null;
  const sizeReduction = originalSize && compressedSize
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : null;

  const handleCompress = useCallback(() => {
    executeCompress(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
  }, [filename, executeCompress]);

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
        <h1 className="tool-title">Compress PDF Locally</h1>
        <p className="tool-subtitle">
          Safe optimization reduces metadata overhead. Image-heavy mode re-renders pages which may change quality. Results vary by document.
          <br /><span className="beta-badge" style={{ display: "inline-block", marginTop: "0.5rem", padding: "0.125rem 0.5rem", fontSize: "0.75rem", background: "var(--color-accent)", color: "#fff", borderRadius: "999px", fontWeight: 600 }}>Beta</span>
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="Compress PDF tool">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} multiple={false} label="Select a PDF file to compress" description="Click or drag and drop a PDF file here" />
        )}

        {state.phase.phase === "loading" && (
          <div className="validating-state" role="status" aria-live="polite"><div className="spinner" aria-hidden="true" /><p>Reading your file...</p></div>
        )}

        {state.phase.phase === "editing" && (
          <div className="editor-layout">
            <div className="editor-pages">
              <div className="editor-header">
                <h2 className="editor-title">{state.pages.length} {state.pages.length === 1 ? "page" : "pages"} PDF — ready to compress</h2>
                <div className="editor-header-actions">
                  <button className="btn btn--secondary btn--sm" onClick={reset} type="button">Start over</button>
                </div>
              </div>

              <div className="file-info-card" style={{ padding: "var(--space-6)", background: "var(--color-surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", marginTop: "var(--space-4)" }}>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "var(--space-3)" }}>File information</h3>
                <div style={{ display: "flex", gap: "var(--space-8)", flexWrap: "wrap" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", display: "block" }}>Filename</span>
                    <span style={{ fontWeight: 500 }}>{state.documents[0]?.name ?? "—"}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", display: "block" }}>Original size</span>
                    <span style={{ fontWeight: 500 }}>{formatBytes(originalSize)}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", display: "block" }}>Pages</span>
                    <span style={{ fontWeight: 500 }}>{state.pages.length}</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", marginTop: "var(--space-4)" }}>
                Compression removes redundant metadata and optimizes internal structures. Your file never leaves your device.
              </p>
            </div>
            <div className="editor-settings">
              <div className="setting-group">
                <label htmlFor="comp-filename">Output filename</label>
                <input id="comp-filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
              </div>
              <button className="btn btn--primary btn--large btn--full" onClick={handleCompress} type="button" disabled={state.pages.length === 0}>
                Compress PDF
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">{state.phase.progress?.label ?? "Compressing..."}</p>
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
              <h2 className="success-title">PDF compressed successfully</h2>
              {compressedSize !== null && originalSize > 0 && (
                <div style={{ marginTop: "var(--space-4)" }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-8)", flexWrap: "wrap", marginBottom: "var(--space-3)" }}>
                    <div style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", display: "block" }}>Original</span>
                      <span style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-secondary)" }}>{formatBytes(originalSize)}</span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", display: "block" }}>Compressed</span>
                      <span style={{ fontSize: "1.125rem", fontWeight: 700 }}>{formatBytes(compressedSize)}</span>
                    </div>
                  </div>
                  {sizeReduction !== null && (
                    <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: sizeReduction > 0 ? "var(--color-success, #16a34a)" : "var(--color-text-secondary)", textAlign: "center" }}>
                      {sizeReduction > 0 ? (
                        <>{sizeReduction}% smaller</>
                      ) : sizeReduction === 0 ? (
                        "No size change — already optimized"
                      ) : (
                        <>{Math.abs(sizeReduction)}% larger — compression could not reduce size</>
                      )}
                    </p>
                  )}
                </div>
              )}
              <p className="success-privacy" style={{ marginTop: "var(--space-3)" }}>No file was uploaded to any server.</p>
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
                {state.phase.recoverable && <button className="btn btn--primary" onClick={handleCompress} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="how-it-works">
        <h2>How to compress a PDF</h2>
        <ol className="steps">
          <li className="step"><span className="step-number">1</span><div><h3>Select your PDF</h3><p>Choose the PDF file you want to compress — it stays in your browser.</p></div></li>
          <li className="step"><span className="step-number">2</span><div><h3>Compress</h3><p>Click "Compress PDF" and the tool optimizes internal structures to reduce file size.</p></div></li>
          <li className="step"><span className="step-number">3</span><div><h3>Compare &amp; download</h3><p>See the size difference and download the compressed PDF — all done locally.</p></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item"><summary>How much can a PDF be compressed?</summary><p>Results vary by content. PDFs with large images often see significant size reduction, while already well-compressed files may show little change. This tool is in beta — results will improve over time.</p></details>
          <details className="faq-item"><summary>Will compression reduce quality?</summary><p>Safe compression may produce only small savings. Image-heavy mode re-renders pages at lower quality which always changes the visual output.</p></details>
        </div>
      </section>

      <section className="tool-seo">
        <h2>Related PDF Tools</h2>
        <p>
          <Link href="/tools/resize-pdf-pages">Resize PDF Pages</Link> |{" "}
          <Link href="/tools/merge-pdf">Merge PDF</Link> |{" "}
          <Link href="/tools/crop-pdf">Crop PDF</Link>
        </p>
      </section>
    </main>
    </ErrorBoundary>
  );
}
