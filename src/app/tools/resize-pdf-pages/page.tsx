"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useOrganizer } from "@/lib/useOrganizer";
import { PdfDropzone } from "@/components/tool/PdfDropzone";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { formatBytes } from "@/lib/format";

type SizeMode = "scale" | "center" | "canvas";

interface PagePreset {
  label: string;
  width: number;
  height: number;
}

const PRESETS: PagePreset[] = [
  { label: "A4 (210 x 297 mm)", width: 595.28, height: 841.89 },
  { label: "A3 (297 x 420 mm)", width: 841.89, height: 1190.55 },
  { label: "A5 (148 x 210 mm)", width: 419.53, height: 595.28 },
  { label: "Letter (216 x 279 mm)", width: 612, height: 792 },
  { label: "Legal (216 x 356 mm)", width: 612, height: 1008 },
  { label: "Custom", width: 0, height: 0 },
];

export default function ResizePdfPagesPage() {
  const {
    state, loadFiles, reset,
    executeResize, cancelProcessing,
  } = useOrganizer();

  const [filename, setFilename] = useState("resized.pdf");
  const [presetIndex, setPresetIndex] = useState(0);
  const [customWidth, setCustomWidth] = useState(595);
  const [customHeight, setCustomHeight] = useState(842);
  const [mode, setMode] = useState<SizeMode>("scale");
  const [unit, setUnit] = useState<"pt" | "mm">("mm");

  const handleResize = useCallback(() => {
    let w: number;
    let h: number;

    if (presetIndex === PRESETS.length - 1) {
      w = unit === "mm" ? customWidth * 2.83465 : customWidth;
      h = unit === "mm" ? customHeight * 2.83465 : customHeight;
    } else {
      w = PRESETS[presetIndex]!.width;
      h = PRESETS[presetIndex]!.height;
    }

    executeResize(
      Math.round(w),
      Math.round(h),
      mode,
      filename.endsWith(".pdf") ? filename : `${filename}.pdf`
    );
  }, [presetIndex, customWidth, customHeight, unit, mode, filename, executeResize]);

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
        <h1 className="tool-title">Resize PDF Pages Locally</h1>
        <p className="tool-subtitle">
          Change the page size of your PDF — scale to fit, center without scaling, or set exact dimensions. No upload, no signup.
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="Resize PDF pages tool">
        {state.phase.phase === "empty" && (
          <PdfDropzone onFilesSelected={loadFiles} multiple={false} label="Select a PDF to resize" description="Click or drag and drop a PDF file here" />
        )}

        {state.phase.phase === "loading" && (
          <div className="validating-state" role="status" aria-live="polite"><div className="spinner" aria-hidden="true" /><p>Reading your file...</p></div>
        )}

        {state.phase.phase === "editing" && (
          <div className="editor-layout">
            <div className="editor-pages">
              <div className="editor-header">
                <h2 className="editor-title">{state.pages.length} {state.pages.length === 1 ? "page" : "pages"} — ready to resize</h2>
                <div className="editor-header-actions">
                  <button className="btn btn--secondary btn--sm" onClick={reset} type="button">Start over</button>
                </div>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "var(--space-4)" }}>
                Current page size will be detected automatically. Choose a target size and resize mode.
              </p>
            </div>
            <div className="editor-settings">
              <div className="setting-group">
                <label htmlFor="rs-preset">Target page size</label>
                <select id="rs-preset" value={presetIndex} onChange={(e) => setPresetIndex(parseInt(e.target.value, 10))}>
                  {PRESETS.map((p, i) => (
                    <option key={p.label} value={i}>{p.label}</option>
                  ))}
                </select>
              </div>
              {presetIndex === PRESETS.length - 1 && (
                <>
                  <div className="setting-group">
                    <label htmlFor="rs-unit">Unit</label>
                    <select id="rs-unit" value={unit} onChange={(e) => setUnit(e.target.value as "pt" | "mm")}>
                      <option value="mm">Millimeters (mm)</option>
                      <option value="pt">Points (pt)</option>
                    </select>
                  </div>
                  <div className="setting-group">
                    <label htmlFor="rs-width">Width ({unit === "mm" ? "mm" : "pt"})</label>
                    <input id="rs-width" type="number" value={unit === "mm" ? customWidth : Math.round(customWidth * 2.83465)} onChange={(e) => {
                      const val = parseInt(e.target.value, 10) || 0;
                      setCustomWidth(unit === "mm" ? Math.max(1, val) : Math.max(1, Math.round(val / 2.83465)));
                    }} min={1} />
                  </div>
                  <div className="setting-group">
                    <label htmlFor="rs-height">Height ({unit === "mm" ? "mm" : "pt"})</label>
                    <input id="rs-height" type="number" value={unit === "mm" ? customHeight : Math.round(customHeight * 2.83465)} onChange={(e) => {
                      const val = parseInt(e.target.value, 10) || 0;
                      setCustomHeight(unit === "mm" ? Math.max(1, val) : Math.max(1, Math.round(val / 2.83465)));
                    }} min={1} />
                  </div>
                </>
              )}
              <div className="setting-group">
                <label htmlFor="rs-mode">Fit mode</label>
                <select id="rs-mode" value={mode} onChange={(e) => setMode(e.target.value as SizeMode)}>
                  <option value="scale">Scale to fit (stretch content)</option>
                  <option value="center">Center without scaling</option>
                  <option value="canvas">Extend canvas (keep original size)</option>
                </select>
              </div>
              <div className="setting-group">
                <label htmlFor="rs-filename">Output filename</label>
                <input id="rs-filename" type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
              </div>
              <button className="btn btn--primary btn--large btn--full" onClick={handleResize} type="button" disabled={state.pages.length === 0}>
                Resize PDF
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {state.phase.phase === "processing" && (
          <div className="conversion-progress">
            <div className="conversion-progress-inner">
              <div className="spinner" aria-hidden="true" />
              <p className="conversion-progress-text">{state.phase.progress?.label ?? "Resizing pages..."}</p>
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
              <h2 className="success-title">PDF resized successfully</h2>
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
                {state.phase.recoverable && <button className="btn btn--primary" onClick={handleResize} type="button">Try again</button>}
                <button className="btn btn--secondary" onClick={reset} type="button">Start over</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="how-it-works">
        <h2>How to resize PDF pages</h2>
        <ol className="steps">
          <li className="step"><span className="step-number">1</span><div><h3>Select your PDF</h3><p>Choose the PDF file you want to resize.</p></div></li>
          <li className="step"><span className="step-number">2</span><div><h3>Choose target size &amp; mode</h3><p>Pick a preset (A4, Letter, etc.) or enter custom dimensions. Choose scale-to-fit, center, or extend canvas.</p></div></li>
          <li className="step"><span className="step-number">3</span><div><h3>Download resized PDF</h3><p>Click "Resize PDF" and download — all processing happens in your browser.</p></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item"><summary>What does "Scale to fit" do?</summary><p>Content scaling behavior depends on the selected mode. &apos;Scale to fit&apos; preserves aspect ratio. &apos;Stretch&apos; changes it. Some modes only change the page size without repositioning content.</p></details>
          <details className="faq-item"><summary>What does "Center without scaling" do?</summary><p>Content keeps its original size and is centered on the new page. If the new page is smaller, content may be clipped. All resize modes change the PDF page dimensions. Content positioning and scaling is applied at the page level only.</p></details>
        </div>
      </section>

      <section className="tool-seo">
        <h2>Related PDF Tools</h2>
        <p>
          <Link href="/tools/crop-pdf">Crop PDF</Link> |{" "}
          <Link href="/tools/n-up-pdf">N-Up PDF</Link> |{" "}
          <Link href="/tools/add-page-numbers-to-pdf">Add Page Numbers</Link>
        </p>
      </section>
    </main>
    </ErrorBoundary>
  );
}
