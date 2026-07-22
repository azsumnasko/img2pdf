"use client";

import type { OrganizerPage } from "@/features/pdf-tools/types";

type Props = {
  pages: OrganizerPage[];
  onMovePage: (from: number, to: number) => void;
  onRotatePage: (id: string, deg: 90 | -90 | 180) => void;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  selectedCount: number;
  showActions?: boolean;
  actionLabel?: string;
};

export function PdfPageGrid({
  pages,
  onMovePage,
  onRotatePage,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  selectedCount,
  showActions = true,
  actionLabel,
}: Props) {
  if (pages.length === 0) return null;

  return (
    <div className="pdf-page-grid-container">
      {selectedCount > 0 && (
        <div className="batch-toolbar" role="toolbar" aria-label="Batch operations">
          <span className="batch-count">{selectedCount} selected</span>
          <button className="btn btn--secondary btn--sm" onClick={() => { for (const p of pages) { if (p.selected) onRotatePage(p.id, -90); } }} type="button">Rotate left</button>
          <button className="btn btn--secondary btn--sm" onClick={() => { for (const p of pages) { if (p.selected) onRotatePage(p.id, 90); } }} type="button">Rotate right</button>
          <button className="btn btn--secondary btn--sm" onClick={() => { for (const p of pages) { if (p.selected) onRotatePage(p.id, 180); } }} type="button">Rotate 180°</button>
          <button className="btn btn--secondary btn--sm" onClick={onDeselectAll} type="button">Clear selection</button>
        </div>
      )}

      <div className="batch-toolbar">
        <span className="batch-count">{pages.length} {pages.length === 1 ? "page" : "pages"}</span>
        <button className="btn btn--secondary btn--sm" onClick={onSelectAll} type="button">Select all</button>
        <button className="btn btn--secondary btn--sm" onClick={onDeselectAll} type="button">Deselect all</button>
      </div>

      <div className="pdf-page-grid">
        {pages.map((page, idx) => (
          <div
            key={page.id}
            className={`pdf-page-card ${page.selected ? "pdf-page-card--selected" : ""}`}
            onClick={(e) => {
              if (e.shiftKey) onToggleSelect(page.id);
            }}
          >
            <div className="pdf-page-card-header">
              <label className="pdf-page-card-check">
                <input
                  type="checkbox"
                  checked={page.selected}
                  onChange={() => onToggleSelect(page.id)}
                  aria-label={`Select page ${idx + 1}`}
                />
                <span className="pdf-page-number">Page {idx + 1}</span>
              </label>
            </div>

            <div className={`pdf-page-thumbnail ${page.rotation !== 0 ? `rotated-${page.rotation}` : ""}`}>
              {page.thumbnailUrl ? (
                <img src={page.thumbnailUrl} alt={`Page ${idx + 1} preview`} loading="lazy" />
              ) : (
                <div className="pdf-page-thumbnail-placeholder">
                  <span>Loading...</span>
                </div>
              )}
            </div>

            {showActions && (
              <div className="pdf-page-card-actions">
                <button
                  className="btn btn--secondary btn--xs"
                  onClick={() => onRotatePage(page.id, -90)}
                  type="button"
                  aria-label={`Rotate page ${idx + 1} left`}
                  title="Rotate left 90°"
                >
                  ↺
                </button>
                <button
                  className="btn btn--secondary btn--xs"
                  onClick={() => onRotatePage(page.id, 90)}
                  type="button"
                  aria-label={`Rotate page ${idx + 1} right`}
                  title="Rotate right 90°"
                >
                  ↻
                </button>
                <button
                  className="btn btn--secondary btn--xs"
                  onClick={() => onRotatePage(page.id, 180)}
                  type="button"
                  aria-label={`Rotate page ${idx + 1} 180°`}
                  title="Rotate 180°"
                >
                  ↕
                </button>
                {idx > 0 && (
                  <button
                    className="btn btn--secondary btn--xs"
                    onClick={() => onMovePage(idx, idx - 1)}
                    type="button"
                    aria-label={`Move page ${idx + 1} left`}
                    title="Move left"
                  >
                    ←
                  </button>
                )}
                {idx < pages.length - 1 && (
                  <button
                    className="btn btn--secondary btn--xs"
                    onClick={() => onMovePage(idx, idx + 1)}
                    type="button"
                    aria-label={`Move page ${idx + 1} right`}
                    title="Move right"
                  >
                    →
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
