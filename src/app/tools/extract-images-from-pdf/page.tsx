"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PdfPageGrid } from "@/components/tool/PdfPageGrid";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";
import type { PdfToImageDpi, PdfToImageSettings } from "@/features/pdf-tools/types";

const DPI_OPTIONS: { value: PdfToImageDpi; label: string }[] = [
  { value: 96, label: "96 DPI (web)" },
  { value: 150, label: "150 DPI (standard)" },
  { value: 200, label: "200 DPI (high)" },
  { value: 300, label: "300 DPI (print)" },
];

export default function ExtractImagesFromPdfPage() {
  const {
    state, loadFiles, movePage, rotatePage, toggleSelect,
    selectAll, deselectAll, reset,
    executePdfToImage, cancelProcessing, selectedCount,
  } = useOrganizer();

  const [dpi, setDpi] = useState<PdfToImageDpi>(300);

  const handleExtract = useCallback(() => {
    const settings: PdfToImageSettings = { dpi, jpegQuality: 1, background: "#ffffff" };
    const baseName = state.documents[0]?.name?.replace(/\.pdf$/i, "") || "extracted";
    executePdfToImage("png", settings, baseName, true);
  }, [dpi, state.documents, executePdfToImage]);

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
        <h1 className="tool-title">Render PDF Pages as Images (Beta)</h1>
        <p className="tool-subtitle">
          Render PDF pages to high-resolution PNGs right in your browser. No upload, no signup — your file stays on your device.
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="Extract images from PDF tool">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} multiple={false} label="Select a PDF file to extract images from" description="Click or drag and drop a PDF file here" />
        )}

        {state.phase.phase === "loading" && (
          <div className="validating-state" role="status" aria-live="polite"><div className="spinner" aria-hidden="true" /><p>Reading your file...</p></div>
        )}

        {state.phase.phase === "editing" && (
          <div className="editor-layout">
            <div className="editor-pages">
              <div className="editor-header">
                <h2 className="editor-title">{state.pages.length} {state.pages.length === 1 ? "page" : "pages"} — select pages to extract</h2>
                <div className="editor-header-actions">
                  <button className="btn btn--secondary btn--sm" onClick={reset} type="button">Start over</button>
                </div>
              </div>

              {warnings && (
                <div className="toast toast--warning" role="alert">
                  <span>{warnings.length} warning{warnings.length !== 1 ? "s" : ""}.</span>
                </div>
              )}

              <div className="toast toast--warning" role="alert" style={{ marginBottom: "1rem", fontSize: "0.8125rem" }}>
                This tool renders PDF pages as images. True embedded image extraction is coming soon. For single pages, use PDF to PNG instead.
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

              {selectedCount > 0 && (
                <p style={{ marginTop: "var(--space-4)", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  {selectedCount} page{selectedCount !== 1 ? "s" : ""} selected for extraction.
                </p>
              )}
            </div>
            <div className="editor-settings">
              <div className="settings-group">
                <label className="settings-label">Resolution (DPI)</label>
                <div className="settings-radio-group">
                  {DPI_OPTIONS.map((opt) => (
                    <label key={opt.value} className={`settings-radio ${dpi === opt.value ? "settings-radio--active" : ""}`}>
                      <input type="radio" name="dpi" value={opt.value} checked={dpi === opt.value} onChange={() => setDpi(opt.value)} />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button className="btn btn--primary btn--large btn--full" onClick={handleExtract} type="button" disabled={selectedCount === 0}>
                Extract Images
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">{state.phase.progress?.label ?? "Extracting images..."}</p>
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
              <h2 className="success-title">Images extracted successfully</h2>
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
                {state.phase.recoverable && <button className="btn btn--primary" onClick={handleExtract} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="how-it-works">
        <h2>How to extract images from PDF</h2>
        <ol className="steps">
          <li className="step"><span className="step-number">1</span><div><h3>Select your PDF</h3><p>Click or drag and drop the PDF you want to extract images from.</p></div></li>
          <li className="step"><span className="step-number">2</span><div><h3>Choose pages &amp; resolution</h3><p>Select the pages and pick a DPI — 300 DPI is best for print-quality extraction.</p></div></li>
          <li className="step"><span className="step-number">3</span><div><h3>Download images</h3><p>Extract and download high-resolution PNGs — all done in your browser.</p></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item"><summary>How does image extraction work here?</summary><p>This tool renders each PDF page to a high-resolution PNG using the browser's PDF engine. True embedded image extraction (which would pull out the original JPEG/PNG data) is more complex and may be added in a future update.</p></details>
          <details className="faq-item"><summary>Is the extracted image lossless?</summary><p>PNG output is lossless — text and graphics stay sharp. For photos compressed inside the PDF, rendering quality depends on the original image resolution.</p></details>
        </div>
      </section>

      <section className="tool-seo">
        <h2>Related PDF Tools</h2>
        <p>
          <Link href="/tools/pdf-to-png">PDF to PNG</Link> |{" "}
          <Link href="/tools/pdf-to-jpg">PDF to JPG</Link> |{" "}
          <Link href="/tools/image-to-pdf">Image to PDF</Link>
        </p>
      </section>
    </main>
    </ErrorBoundary>
  );
}
