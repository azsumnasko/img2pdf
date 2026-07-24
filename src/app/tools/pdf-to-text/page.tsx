"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";
import { PDF_TOOL_META } from "@/features/pdf-tools/config";

export default function PdfToTextPage() {
  const { state, loadFiles, reset, executePdfToText, cancelProcessing } = useOrganizer();
  const [extractedText, setExtractedText] = useState("");

  useEffect(() => {
    if (state.phase.phase !== "success") { setExtractedText(""); return; }
    const controller = new AbortController();
    fetch(state.phase.objectUrl, { signal: controller.signal })
      .then((r) => r.text())
      .then(setExtractedText)
      .catch(() => { if (!controller.signal.aborted) setExtractedText(""); });
    return () => controller.abort();
  }, [state.phase]);

  const handleExtract = useCallback(() => {
    const baseName = state.documents[0]?.name?.replace(/\.pdf$/i, "") || "extracted";
    executePdfToText(`${baseName}.txt`);
  }, [state.documents, executePdfToText]);

  const handleDownload = useCallback(() => {
    if (state.phase.phase !== "success") return;
    const a = document.createElement("a");
    a.href = state.phase.objectUrl;
    a.download = state.phase.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [state]);

  const meta = PDF_TOOL_META["pdf-to-text"];

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

      <div className="tool-workspace" role="region" aria-label="PDF to Text extractor">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} label="Select PDF file" description="Click or drag and drop your PDF here" multiple={false} />
        )}

        {state.phase.phase === "loading" && (
          <div className="validating-state" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <p>Reading your PDF...</p>
          </div>
        )}

        {state.phase.phase === "editing" && (
          <div className="editor-layout" style={{ gridTemplateColumns: "1fr" }}>
            <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)" }}>
              <div style={{ textAlign: "center" }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-3)" }}>
                  <rect x="8" y="4" width="32" height="40" rx="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M28 4v10h10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M14 22h12M14 28h10M14 34h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <h2 className="editor-title" style={{ marginBottom: "var(--space-1)" }}>{state.documents[0]?.name}</h2>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  {state.pages.length} {state.pages.length === 1 ? "page" : "pages"} &middot; Text-based PDFs work best
                </p>
              </div>
              <button className="btn btn--primary btn--large" onClick={handleExtract} type="button">
                Extract Text
              </button>
              <button className="btn btn--secondary btn--sm" onClick={reset} type="button">Select a different PDF</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress" role="status" aria-live="polite">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">Extracting text...</p>
              <p className="conversion-progress-note">This may take a moment for large documents</p>
              <button className="btn btn--secondary btn--sm" onClick={cancelProcessing} type="button">Cancel</button>
            </div>
          </div>
        )}

        {state.phase.phase === "success" && (
          <div style={{ padding: "var(--space-6)" }}>
            <div className="success-panel" style={{ padding: "var(--space-6) 0 0 0" }}>
              <div className="success-panel-inner">
                <div className="success-icon" aria-hidden="true">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3" />
                    <path d="M20 32l8 8 16-16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="success-title">Text extracted</h2>
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
                  <button className="btn btn--primary btn--large" onClick={handleDownload} type="button">Download .txt</button>
                  <button className="btn btn--secondary btn--large" onClick={reset} type="button">Extract another PDF</button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "var(--space-6)" }}>
              <h3 style={{ marginBottom: "var(--space-3)", fontSize: "1rem" }}>Extracted Text Preview</h3>
              <pre style={{
                maxHeight: "400px", overflow: "auto", padding: "var(--space-4)",
                backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)", fontSize: "0.8125rem", lineHeight: "1.6",
                whiteSpace: "pre-wrap", wordBreak: "break-word",
              }}><code>{extractedText || "(no text content found in PDF)"}</code></pre>
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
              <h3 className="error-title">Text extraction failed</h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>{state.phase.message}</p>
              <div className="error-actions">
                {state.phase.recoverable && <button className="btn btn--primary" onClick={handleExtract} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="tool-seo" style={{ marginTop: "var(--space-10)", maxWidth: "var(--tool-max)", marginLeft: "auto", marginRight: "auto" }}>
        <h2>How to Extract Text from PDF</h2>
        <ol>
          <li><strong>Select your PDF file</strong> — click or drag and drop your PDF onto the dropzone.</li>
          <li><strong>Click Extract Text</strong> — the tool reads the text layer embedded in your PDF.</li>
          <li><strong>View the extracted text</strong> — text appears in the preview area below with page separators.</li>
          <li><strong>Download as .txt</strong> — save the extracted text as a plain text file for further use.</li>
        </ol>

        <h2>Important: Scanned PDFs vs Text-Based PDFs</h2>
        <p>This tool extracts selectable text embedded in PDF documents — the kind generated by word processors, spreadsheets, and other software. Scanned documents that consist only of images will not produce any text output. For scanned PDFs, you need an OCR (Optical Character Recognition) tool.</p>

        <h2>Privacy and Security</h2>
        <p>Your PDF never leaves your device. All text extraction happens locally in your browser. No files are uploaded to any server — your data stays private and secure.</p>

        <p style={{ marginTop: "var(--space-6)" }}>
          <Link href="/tools/pdf-to-jpg">PDF to JPG</Link> |{" "}
          <Link href="/tools/pdf-to-png">PDF to PNG</Link> |{" "}
          <Link href="/pdf-tools">All PDF tools</Link>
        </p>
      </section>

      <section>
        <h2>Browser / Device Support</h2>
        <p>Works in all modern browsers. Text extraction uses the PDF&apos;s built-in text layer. Scanned/image-only PDFs will produce no text — this is a PDF limitation, not a browser limitation.</p>
      </section>
    </main>
    </ErrorBoundary>
  );
}
