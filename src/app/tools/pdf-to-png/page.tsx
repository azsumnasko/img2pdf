"use client";

import { useState, useCallback } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PdfPageGrid } from "@/components/tool/PdfPageGrid";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";
import type { PdfToImageDpi, PdfToImageSettings } from "@/features/pdf-tools/types";
import { PDF_TOOL_META } from "@/features/pdf-tools/config";

const DPI_OPTIONS: { value: PdfToImageDpi; label: string }[] = [
  { value: 96, label: "96 DPI (web)" },
  { value: 150, label: "150 DPI (standard)" },
  { value: 200, label: "200 DPI (high)" },
  { value: 300, label: "300 DPI (print)" },
];

export default function PdfToPngPage() {
  const { state, loadFiles, movePage, rotatePage, toggleSelect, selectAll, deselectAll, reset, executePdfToImage, cancelProcessing, selectedCount } = useOrganizer();
  const [dpi, setDpi] = useState<PdfToImageDpi>(200);

  const handleConvert = useCallback(() => {
    const settings: PdfToImageSettings = { dpi, jpegQuality: 1, background: "#ffffff" };
    const baseName = state.documents[0]?.name?.replace(/\.pdf$/i, "") || "converted";
    executePdfToImage("png", settings, baseName);
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

  const meta = PDF_TOOL_META["pdf-to-png"];

  return (
    <ErrorBoundary>
    <main className="tool-page">
      <div className="tool-hero">
        <h1 className="tool-title">{meta.h1}</h1>
        <p className="tool-subtitle">{meta.description}</p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="PDF to PNG converter">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} label="Select PDF file" description="Click or drag and drop your PDF here" />
        )}

        {state.phase.phase === "loading" && (
          <div className="validating-state" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <p>Reading your PDF...</p>
          </div>
        )}

        {state.phase.phase === "editing" && (
          <div className="editor-layout">
            <div className="editor-pages">
              <div className="editor-header">
                <h2 className="editor-title">{state.pages.length} {state.pages.length === 1 ? "page" : "pages"}</h2>
              </div>
              {state.phase.warnings && state.phase.warnings.length > 0 && (
                <div className="toast toast--warning" role="alert">
                  <span>{state.phase.warnings.join(" ")}</span>
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
                showActions={false}
              />
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
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", margin: 0 }}>
                PNG output is lossless — images retain their full quality with no compression artifacts.
              </p>
              <button className="btn btn--primary btn--large btn--full" onClick={handleConvert} type="button" disabled={state.pages.length === 0}>
                Convert to PNG
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress" role="status" aria-live="polite">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              {state.phase.progress ? (
                <>
                  <p className="conversion-progress-text">{state.phase.progress.label}</p>
                  <div className="conversion-progress-bar-wrapper">
                    <div className="conversion-progress-bar" style={{ width: `${Math.round((state.phase.progress.current / state.phase.progress.total) * 100)}%` }} />
                  </div>
                  <p className="conversion-progress-page">Page {state.phase.progress.current} of {state.phase.progress.total}</p>
                </>
              ) : (
                <p className="conversion-progress-text">Rendering pages...</p>
              )}
              <button className="btn btn--secondary btn--sm" onClick={cancelProcessing} type="button">Cancel</button>
            </div>
          </div>
        )}

        {state.phase.phase === "success" && (
          <div className="success-panel">
            <div className="success-panel-inner">
              <div className="success-icon" aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3" />
                  <path d="M20 32l8 8 16-16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="success-title">Your PNG {state.phase.filename.endsWith(".zip") ? "files are" : "is"} ready</h2>
              <p className="success-meta">{state.phase.filename} &middot; {formatBytes(state.phase.bytes)}</p>
              <p className="success-privacy">No files were ever uploaded to our servers</p>
              {state.phase.warnings.length > 0 && (
                <div className="success-warnings">
                  <ul className="success-warnings-list">
                    {state.phase.warnings.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
              )}
              <div className="success-actions">
                <button className="btn btn--primary btn--large" onClick={handleDownload} type="button">Download</button>
                <button className="btn btn--secondary btn--large" onClick={reset} type="button">Convert another PDF</button>
              </div>
            </div>
          </div>
        )}

        {state.phase.phase === "error" && (
          <div className="error-summary" role="alert">
            <div className="error-summary-inner">
              <div className="error-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="var(--color-error)" strokeWidth="2" />
                  <path d="M24 14v14M24 32v2" stroke="var(--color-error)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="error-title">Conversion failed</h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>{state.phase.message}</p>
              <div className="error-actions">
                {state.phase.recoverable && <button className="btn btn--primary" onClick={handleConvert} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="tool-seo" style={{ marginTop: "var(--space-10)", maxWidth: "var(--tool-max)", marginLeft: "auto", marginRight: "auto" }}>
        <h2>How to Convert PDF to PNG</h2>
        <ol>
          <li><strong>Select your PDF file</strong> — click or drag and drop your PDF onto the dropzone.</li>
          <li><strong>Choose DPI resolution</strong> — 200 DPI delivers sharp results for diagrams and text.</li>
          <li><strong>Convert and download</strong> — click Convert to PNG. Multi-page PDFs download as a ZIP containing all pages.</li>
        </ol>

        <h2>When to Use PNG Instead of JPG</h2>
        <p>PNG is ideal for PDFs containing diagrams, charts, screenshots, text, or line art — anything where sharp edges matter. Unlike JPG, PNG uses lossless compression so text stays crisp. For photographs where file size is a priority, <a href="/tools/pdf-to-jpg">PDF to JPG</a> may be a better choice.</p>

        <h2>Privacy and Security</h2>
        <p>Your PDF never leaves your device. All page rendering happens locally in your browser using the Canvas API. No files are uploaded to any server — your data stays private and secure.</p>

        <p style={{ marginTop: "var(--space-6)" }}>
          <a href="/tools/pdf-to-jpg">PDF to JPG</a> |{" "}
          <a href="/tools/pdf-to-text">PDF to Text</a> |{" "}
          <a href="/pdf-tools">All PDF tools</a>
        </p>
      </section>
    </main>
    </ErrorBoundary>
  );
}
