"use client";

import type { ProjectPage, PageOrientation } from "@/features/image-to-pdf/types";
import { formatBytes } from "@/lib/format";

type PageCardProps = {
  page: ProjectPage;
  index: number;
  total: number;
  onRemove: (id: string) => void;
  onRotateCw: (id: string) => void;
  onRotateCcw: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragOver: (index: number, clientY: number, rect: DOMRect) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  showDropIndicator: boolean;
  onToggleSelect: (id: string, selected: boolean) => void;
  onSetOrientation: (id: string, orientation: PageOrientation) => void;
};

export function PageCard({
  page, index, total, onRemove, onRotateCw, onRotateCcw, onMoveUp, onMoveDown,
  onDragStart, onDragOver, onDrop, onDragEnd, isDragging, showDropIndicator,
  onToggleSelect, onSetOrientation,
}: PageCardProps) {
  return (
    <div role="group" aria-label={`Page ${index + 1} of ${total}`}>
      {showDropIndicator && <div className="page-card-drop-indicator" />}
      <div className={`page-card${isDragging ? " page-card--dragging" : ""}${page.selected ? " page-card--selected" : ""}`}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", String(index));
          const dragImg = document.createElement("div");
          dragImg.style.cssText = "width:1px;height:1px;position:absolute;top:-9999px";
          document.body.appendChild(dragImg);
          e.dataTransfer.setDragImage(dragImg, 0, 0);
          setTimeout(() => dragImg.remove(), 0);
          onDragStart(index);
        }}
        onDragOver={(e) => {
          e.preventDefault(); e.stopPropagation();
          e.dataTransfer.dropEffect = "move";
          const rect = e.currentTarget.getBoundingClientRect();
          onDragOver(index, e.clientY, rect);
        }}
        onDrop={(e) => { e.stopPropagation(); onDrop(e); }}
        onDragEnd={onDragEnd}
      >
        <label className="page-card-check" onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" checked={page.selected} onChange={(e) => onToggleSelect(page.id, e.target.checked)} aria-label={`Select page ${index + 1}`} />
        </label>

        <div className="page-card-drag-handle" aria-hidden="true" title="Drag to reorder">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="3" r="1.25" fill="currentColor" /><circle cx="10" cy="3" r="1.25" fill="currentColor" /><circle cx="6" cy="8" r="1.25" fill="currentColor" /><circle cx="10" cy="8" r="1.25" fill="currentColor" /><circle cx="6" cy="13" r="1.25" fill="currentColor" /><circle cx="10" cy="13" r="1.25" fill="currentColor" /></svg>
        </div>

        <div className="page-card-number" aria-hidden="true">{index + 1}</div>
        <div className="page-card-thumb">
          <img src={page.thumbnailUrl} alt={`Page ${index + 1} preview`} style={{ transform: page.rotationDegrees ? `rotate(${page.rotationDegrees}deg)` : undefined }} />
        </div>
        <div className="page-card-info">
          <span className="page-card-format">{page.format.toUpperCase()}</span>
          <span className="page-card-size">{formatBytes(page.sourceBytes)}</span>
          <span className="page-card-dims">{page.sourceWidth} x {page.sourceHeight}</span>
          {page.orientationOverride && <span className="page-card-orientation">Orientation: {page.orientationOverride}</span>}
        </div>
        <div className="page-card-actions">
          <button className="btn-icon" onClick={() => onMoveUp(page.id)} disabled={index === 0} aria-label={`Move page ${index + 1} up`} title="Move up">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
          </button>
          <button className="btn-icon" onClick={() => onMoveDown(page.id)} disabled={index === total - 1} aria-label={`Move page ${index + 1} down`} title="Move down">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
          </button>
          <button className="btn-icon" onClick={() => onRotateCcw(page.id)} aria-label={`Rotate page ${index + 1} left`} title="Rotate left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8a5 5 0 015-5M3 8h3M3 8V5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /><path d="M1 13A7 7 0 101 9" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
          </button>
          <button className="btn-icon" onClick={() => onRotateCw(page.id)} aria-label={`Rotate page ${index + 1} right`} title="Rotate right">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8a5 5 0 01-5 5M13 8h-3m3 0v3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /><path d="M15 3A7 7 0 1015 7" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
          </button>
          <button className="btn-icon btn-icon--danger" onClick={() => onRemove(page.id)} aria-label={`Remove page ${index + 1}`} title="Remove">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
