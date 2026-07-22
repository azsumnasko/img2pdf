"use client";

import { useState, useEffect } from "react";
import type { PageSizePreset, PageOrientation, FitMode, QualityPreset, MarginPreset } from "@/features/image-to-pdf/types";
import { CUSTOM_PAGE_MIN_MM, CUSTOM_PAGE_MAX_MM } from "@/features/image-to-pdf/config";
import { formatBytes } from "@/lib/format";

type OutputSettingsProps = {
  pageSize: PageSizePreset;
  customWidthMm?: number;
  customHeightMm?: number;
  orientation: PageOrientation;
  fitMode: FitMode;
  marginPreset: MarginPreset;
  quality: QualityPreset;
  filename: string;
  estimatedSize: { minBytes: number; maxBytes: number } | null;
  onPageSizeChange: (v: PageSizePreset) => void;
  onCustomSizeChange: (w: number, h: number) => void;
  onOrientationChange: (v: PageOrientation) => void;
  onFitModeChange: (v: FitMode) => void;
  onMarginChange: (v: MarginPreset) => void;
  onQualityChange: (v: QualityPreset) => void;
  onFilenameChange: (v: string) => void;
};

const PAGE_SIZES: { value: PageSizePreset; label: string }[] = [
  { value: "a4", label: "A4 (210 x 297 mm)" },
  { value: "a3", label: "A3 (297 x 420 mm)" },
  { value: "a5", label: "A5 (148 x 210 mm)" },
  { value: "letter", label: "US Letter (8.5 x 11 in)" },
  { value: "legal", label: "US Legal (8.5 x 14 in)" },
  { value: "image", label: "Fit to image" },
  { value: "custom", label: "Custom size..." },
];

const ORIENTATIONS: { value: PageOrientation; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "portrait", label: "Portrait" },
  { value: "landscape", label: "Landscape" },
];

const FIT_MODES: { value: FitMode; label: string }[] = [
  { value: "contain", label: "Contain (full image visible)" },
  { value: "cover", label: "Cover (fill page, may crop)" },
];

const MARGIN_OPTIONS: { value: MarginPreset; label: string }[] = [
  { value: "none", label: "None (0 mm)" },
  { value: "small", label: "Small (5 mm)" },
  { value: "normal", label: "Normal (10 mm)" },
  { value: "large", label: "Large (20 mm)" },
];

const QUALITY_OPTIONS: { value: QualityPreset; label: string; desc: string }[] = [
  { value: "balanced", label: "Balanced", desc: "Good quality, reasonable size" },
  { value: "original", label: "Original", desc: "Highest quality, larger file" },
  { value: "small", label: "Small file", desc: "Smallest file, may reduce quality" },
];

export function OutputSettings({
  pageSize, customWidthMm, customHeightMm, orientation, fitMode, marginPreset, quality, filename, estimatedSize,
  onPageSizeChange, onCustomSizeChange, onOrientationChange, onFitModeChange, onMarginChange, onQualityChange, onFilenameChange,
}: OutputSettingsProps) {
  const [showCustom, setShowCustom] = useState(pageSize === "custom");

  useEffect(() => {
    setShowCustom(pageSize === "custom");
  }, [pageSize]);

  return (
    <div className="output-settings" role="region" aria-label="Output settings">
      <h3 className="settings-title">Output Settings</h3>
      <div className="settings-grid">
        <div className="setting-group">
          <label htmlFor="page-size">Page Size</label>
          <select id="page-size" value={pageSize} onChange={(e) => {
            const v = e.target.value as PageSizePreset;
            onPageSizeChange(v);
            setShowCustom(v === "custom");
          }}>
            {PAGE_SIZES.map((ps) => <option key={ps.value} value={ps.value}>{ps.label}</option>)}
          </select>
        </div>

        {showCustom && (
          <div className="setting-group setting-group--row">
            <div>
              <label htmlFor="custom-w">Width (mm)</label>
              <input id="custom-w" type="number" min={CUSTOM_PAGE_MIN_MM} max={CUSTOM_PAGE_MAX_MM} value={customWidthMm ?? 210}
                onChange={(e) => onCustomSizeChange(Math.min(CUSTOM_PAGE_MAX_MM, Math.max(CUSTOM_PAGE_MIN_MM, Number(e.target.value) || CUSTOM_PAGE_MIN_MM)), customHeightMm ?? 297)} />
            </div>
            <div>
              <label htmlFor="custom-h">Height (mm)</label>
              <input id="custom-h" type="number" min={CUSTOM_PAGE_MIN_MM} max={CUSTOM_PAGE_MAX_MM} value={customHeightMm ?? 297}
                onChange={(e) => onCustomSizeChange(customWidthMm ?? 210, Math.min(CUSTOM_PAGE_MAX_MM, Math.max(CUSTOM_PAGE_MIN_MM, Number(e.target.value) || CUSTOM_PAGE_MIN_MM)))} />
            </div>
          </div>
        )}

        <div className="setting-group"><label htmlFor="orientation">Orientation</label>
          <select id="orientation" value={orientation} onChange={(e) => onOrientationChange(e.target.value as PageOrientation)}>
            {ORIENTATIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select></div>
        <div className="setting-group"><label htmlFor="fit-mode">Fit</label>
          <select id="fit-mode" value={fitMode} onChange={(e) => onFitModeChange(e.target.value as FitMode)}>
            {FIT_MODES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select></div>
        <div className="setting-group"><label htmlFor="margins">Margins</label>
          <select id="margins" value={marginPreset} onChange={(e) => onMarginChange(e.target.value as MarginPreset)}>
            {MARGIN_OPTIONS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select></div>
        <div className="setting-group"><label htmlFor="filename">Filename</label>
          <input id="filename" type="text" value={filename} onChange={(e) => onFilenameChange(e.target.value)} maxLength={80} />
        </div>
        <div className="setting-group"><label htmlFor="quality">Quality</label>
          <select id="quality" value={quality} onChange={(e) => onQualityChange(e.target.value as QualityPreset)}>
            {QUALITY_OPTIONS.map((q) => <option key={q.value} value={q.value}>{q.label}</option>)}
          </select></div>

        {estimatedSize && (
          <div className="size-estimate" aria-live="polite">
            <span className="size-estimate-label">Estimated output:</span>
            <span className="size-estimate-value">{formatBytes(estimatedSize.minBytes)} – {formatBytes(estimatedSize.maxBytes)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
