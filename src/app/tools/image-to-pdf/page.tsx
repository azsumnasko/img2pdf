"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { useProject } from "@/lib/useProject";
import { revokeThumbnail } from "@/features/image-to-pdf/image-processor";
import { FileDropzone } from "@/components/tool/FileDropzone";
import { PageList } from "@/components/tool/PageList";
import { OutputSettings } from "@/components/tool/OutputSettings";
import { ConversionProgress } from "@/components/tool/ConversionProgress";
import { SuccessPanel } from "@/components/tool/SuccessPanel";
import { ErrorSummary } from "@/components/tool/ErrorSummary";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { ErrorBoundary } from "@/components/tool/ErrorBoundary";
import { AdSlot } from "@/components/ads/AdSlot";
import { MakerPromo } from "@/components/content/MakerPromo";
import type { MarginPreset, PageOrientation } from "@/features/image-to-pdf/types";
import { MARGIN_PRESETS, DEFAULT_CONFIG } from "@/features/image-to-pdf/config";

const MAX_PAGES = DEFAULT_CONFIG.maxPagesPerJob;

function getMarginPreset(margins: { top: number; right: number; bottom: number; left: number }): MarginPreset {
  for (const [key, val] of Object.entries(MARGIN_PRESETS)) {
    if (val.top === margins.top && val.right === margins.right && val.bottom === margins.bottom && val.left === margins.left) return key as MarginPreset;
  }
  return "normal";
}

export default function ImageToPdfPage() {
  const {
    project, addFiles, addMoreFiles, dismissWarnings,
    setPageSize, setCustomPageSize, setOrientation, setFitMode, setMargins, setQuality, setFilename,
    removePage, movePage, reorderPages, rotatePage,
    toggleSelect, selectAll, deselectAll, removeSelected, rotateSelected,
    setPageOrientation, startConversion, cancelConversion, reset, retry,
    estimatedSize, selectedCount,
  } = useProject();

  const handleDownload = useCallback(() => {
    if (project.state.phase !== "success") return;
    const a = document.createElement("a");
    a.href = project.state.result.objectUrl;
    a.download = project.outputFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [project]);

  const handleMoveUp = useCallback((id: string) => {
    const idx = project.pages.findIndex((p) => p.id === id);
    if (idx > 0) movePage(id, idx - 1);
  }, [project.pages, movePage]);

  const handleMoveDown = useCallback((id: string) => {
    const idx = project.pages.findIndex((p) => p.id === id);
    if (idx < project.pages.length - 1) movePage(id, idx + 1);
  }, [project.pages, movePage]);

  const handleAddMore = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp,image/heic,.jpg,.jpeg,.png,.webp,.heic,.heif";
    input.multiple = true;
    input.onchange = (e) => { const files = (e.target as HTMLInputElement).files; if (files) addMoreFiles(files); };
    input.click();
  }, [addMoreFiles]);

  const warnings = project.state.phase === "editing" && project.state.validationWarnings?.length ? project.state.validationWarnings : null;

  const pagesRef = useRef(project.pages);
  pagesRef.current = project.pages;
  const stateRef = useRef(project.state);
  stateRef.current = project.state;

  useEffect(() => {
    return () => {
      for (const page of pagesRef.current) {
        revokeThumbnail(page.thumbnailUrl);
      }
      if (stateRef.current.phase === "success" && "result" in stateRef.current) {
        URL.revokeObjectURL(stateRef.current.result.objectUrl);
      }
    };
  }, []);

  return (
    <ErrorBoundary>
    <main className="tool-page">
      <div className="tool-hero">
        <h1 className="tool-title">Convert Images to PDF — Private and Free</h1>
        <p className="tool-subtitle">
          Combine up to {MAX_PAGES} JPG, PNG, WebP, or HEIC images into one PDF. No signup, no watermark, and no file uploads.
        </p>
        <div className="tool-hero-badges">
          <PrivacyBadge />
          <span className="limit-badge">Free: up to {MAX_PAGES} pages per conversion. Unlimited conversions.</span>
        </div>
      </div>

      <div className="tool-workspace" role="region" aria-label="Image to PDF converter">
        {project.state.phase === "empty" && <FileDropzone onFilesSelected={addFiles} maxPages={MAX_PAGES} />}

        {project.state.phase === "validating" && (
          <div className="validating-state" role="status" aria-live="polite"><div className="spinner" aria-hidden="true" /><p>Reading your files...</p></div>
        )}

        {project.state.phase === "editing" && (
          <div className="editor-layout">
            <div className="editor-pages">
              <div className="editor-header">
                <h2 className="editor-title">{project.pages.length} {project.pages.length === 1 ? "page" : "pages"} selected</h2>
                <div className="editor-header-actions">
                  {project.pages.length < MAX_PAGES && <button className="btn btn--secondary btn--sm" onClick={handleAddMore} type="button">Add more</button>}
                </div>
              </div>

              {warnings && (
                <div className="toast toast--warning" role="alert">
                  <span>{warnings.length} file{warnings.length !== 1 ? "s" : ""} could not be added.</span>
                  <button className="toast-dismiss" onClick={dismissWarnings} type="button" aria-label="Dismiss">&times;</button>
                </div>
              )}

              {selectedCount > 0 && (
                <div className="batch-toolbar" role="toolbar" aria-label="Batch operations">
                  <span className="batch-count">{selectedCount} selected</span>
                  <button className="btn btn--secondary btn--sm" onClick={() => rotateSelected("ccw")} type="button">Rotate left</button>
                  <button className="btn btn--secondary btn--sm" onClick={() => rotateSelected("cw")} type="button">Rotate right</button>
                  <button className="btn btn--secondary btn--sm" onClick={removeSelected} type="button">Remove</button>
                  <button className="btn btn--secondary btn--sm" onClick={deselectAll} type="button">Clear selection</button>
                </div>
              )}

              <PageList
                pages={project.pages}
                onRemove={removePage}
                onRotateCw={(id) => rotatePage(id, "cw")}
                onRotateCcw={(id) => rotatePage(id, "ccw")}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onReorder={reorderPages}
                onToggleSelect={toggleSelect}
                onSetOrientation={setPageOrientation}
              />
            </div>
            <div className="editor-settings">
              <OutputSettings
                pageSize={project.settings.pageSize}
                customWidthMm={project.settings.customWidthMm}
                customHeightMm={project.settings.customHeightMm}
                orientation={project.settings.orientation}
                fitMode={project.settings.fitMode}
                marginPreset={getMarginPreset(project.settings.marginsMm)}
                quality={project.settings.quality}
                filename={project.outputFilename}
                estimatedSize={estimatedSize}
                onPageSizeChange={setPageSize}
                onCustomSizeChange={setCustomPageSize}
                onOrientationChange={setOrientation}
                onFitModeChange={setFitMode}
                onMarginChange={setMargins}
                onQualityChange={setQuality}
                onFilenameChange={setFilename}
              />
              <button className="btn btn--primary btn--large btn--full" onClick={startConversion} type="button" disabled={project.pages.length === 0}>
                Convert to PDF
              </button>
              <button className="btn btn--secondary btn--sm btn--full" onClick={reset} type="button">Start over</button>
            </div>
          </div>
        )}

        {project.state.phase === "converting" && (
          <ConversionProgress progress={project.state.progress} cancelled={project.state.cancelled} onCancel={cancelConversion} />
        )}

        {project.state.phase === "success" && (
          <SuccessPanel result={project.state.result} filename={project.outputFilename} onDownload={handleDownload} onNewProject={reset} onEditSettings={retry} />
        )}

        {project.state.phase === "error" && (
          <ErrorSummary errors={project.state.errors} recoverable={project.state.recoverable} onRetry={project.state.recoverable ? retry : undefined} onReset={reset} />
        )}
      </div>

      {DEFAULT_CONFIG.enableAds && <AdSlot id="tool-content-1" />}

      <section className="faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>Are my images uploaded to Local2PDF servers?</summary>
            <p>No. All image processing happens entirely in your browser using local web APIs. Your files are never uploaded to our servers.</p>
          </details>
          <details className="faq-item">
            <summary>Which image formats can I convert to PDF?</summary>
            <p>Local2PDF supports JPEG, PNG, WebP, and HEIC images. You can convert up to 25 images at once into a single PDF.</p>
          </details>
          <details className="faq-item">
            <summary>Is Local2PDF free?</summary>
            <p>Yes. Local2PDF is completely free. There is no signup, no watermark, and unlimited conversions.</p>
          </details>
          <details className="faq-item">
            <summary>Can I convert images to PDF on my phone?</summary>
            <p>Yes. Local2PDF works on mobile browsers including iPhone Safari and Android Chrome.</p>
          </details>
        </div>
      </section>

      <MakerPromo />

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Drop images or paste from clipboard — JPG, PNG, WebP, and HEIC formats are all supported</li>
          <li>Arrange pages, choose paper size (A4, US Letter, or custom), adjust margins and quality settings</li>
          <li>Click Convert — your PDF is created entirely on your device, never uploaded to any server</li>
        </ol>
      </section>

      <section className="tool-seo">
        <h2>Related PDF Tools</h2>
        <p>
          <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
          <Link href="/tools/png-to-pdf">PNG to PDF</Link> |{" "}
          <Link href="/tools/webp-to-pdf">WebP to PDF</Link> |{" "}
          <Link href="/tools/heic-to-pdf">HEIC to PDF</Link> |{" "}
          <Link href="/tools/screenshot-to-pdf">Screenshot to PDF</Link> |{" "}
          <Link href="/tools/photos-to-pdf">Photos to PDF</Link> |{" "}
          <Link href="/tools/combine-images-to-pdf">Combine Images to PDF</Link>
        </p>
      </section>
    </main>
    </ErrorBoundary>
  );
}
