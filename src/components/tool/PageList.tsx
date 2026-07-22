"use client";

import { useState, useCallback } from "react";
import type { ProjectPage } from "@/features/image-to-pdf/types";
import { PageCard } from "./PageCard";

type PageListProps = {
  pages: ProjectPage[];
  onRemove: (id: string) => void;
  onRotateCw: (id: string) => void;
  onRotateCcw: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onToggleSelect: (id: string, selected: boolean) => void;
  onSetOrientation: (id: string, orientation: "auto" | "portrait" | "landscape") => void;
};

export function PageList({
  pages, onRemove, onRotateCw, onRotateCcw, onMoveUp, onMoveDown,
  onReorder, onToggleSelect, onSetOrientation,
}: PageListProps) {
  const [dragSourceIndex, setDragSourceIndex] = useState<number | null>(null);
  const [insertAtIndex, setInsertAtIndex] = useState<number | null>(null);

  const handleDragStart = useCallback((index: number) => { setDragSourceIndex(index); setInsertAtIndex(null); }, []);
  const handleDragOver = useCallback((index: number, clientY: number, rect: DOMRect) => {
    const mid = rect.top + rect.height / 2;
    setInsertAtIndex(clientY < mid ? index : index + 1);
  }, []);
  const handleDragOverContainer = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (dragSourceIndex === null) return;
    const listItems = e.currentTarget.querySelectorAll(".page-card");
    if (listItems.length === 0) return;
    const lastItem = listItems[listItems.length - 1];
    if (!lastItem) return;
    if (e.clientY > lastItem.getBoundingClientRect().bottom) setInsertAtIndex(pages.length);
  }, [dragSourceIndex, pages.length]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (dragSourceIndex === null || insertAtIndex === null) return;
    let targetIndex = insertAtIndex;
    if (insertAtIndex > dragSourceIndex) targetIndex = insertAtIndex - 1;
    if (targetIndex !== dragSourceIndex) onReorder(dragSourceIndex, targetIndex);
    setDragSourceIndex(null); setInsertAtIndex(null);
  }, [dragSourceIndex, insertAtIndex, onReorder]);

  const handleDragEnd = useCallback(() => { setDragSourceIndex(null); setInsertAtIndex(null); }, []);

  if (pages.length === 0) return null;

  return (
    <div className="page-list" role="list" aria-label="Selected pages" onDragOver={handleDragOverContainer} onDrop={handleDrop}>
      {insertAtIndex === 0 && <div className="page-card-drop-indicator" />}
      {pages.map((page, i) => (
        <div key={page.id}>
          <PageCard
            page={page} index={i} total={pages.length}
            onRemove={onRemove} onRotateCw={onRotateCw} onRotateCcw={onRotateCcw}
            onMoveUp={onMoveUp} onMoveDown={onMoveDown}
            onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={handleDragEnd}
            isDragging={dragSourceIndex === i} showDropIndicator={insertAtIndex === i + 1 && insertAtIndex !== pages.length}
            onToggleSelect={onToggleSelect} onSetOrientation={onSetOrientation}
          />
        </div>
      ))}
      {insertAtIndex === pages.length && <div className="page-card-drop-indicator" />}
    </div>
  );
}
