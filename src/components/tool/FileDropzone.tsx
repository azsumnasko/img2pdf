"use client";

import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";

type FileDropzoneProps = {
  onFilesSelected: (files: FileList | File[]) => void;
  maxPages: number;
  disabled?: boolean;
};

export function FileDropzone({ onFilesSelected, maxPages, disabled }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    dragCounter.current += 1;
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault(); e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) { dragCounter.current = 0; setIsDragging(false); }
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    if (disabled) return;
    if (e.dataTransfer.files?.length) onFilesSelected(e.dataTransfer.files);
  }, [onFilesSelected, disabled]);

  const handleClick = useCallback(() => inputRef.current?.click(), []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) { onFilesSelected(e.target.files); e.target.value = ""; }
  }, [onFilesSelected]);

  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      if (disabled) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
      const items = e.clipboardData?.items;
      if (!items) return;
      const imageFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item?.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) imageFiles.push(file);
        }
      }
      if (imageFiles.length > 0) onFilesSelected(imageFiles);
    };
    document.addEventListener("paste", handler);
    return () => document.removeEventListener("paste", handler);
  }, [onFilesSelected, disabled]);

  return (
    <div
      className={`file-dropzone${isDragging ? " file-dropzone--active" : ""}${disabled ? " file-dropzone--disabled" : ""}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
      role="button"
      tabIndex={0}
      aria-label={`Select up to ${maxPages} images. Click, drag and drop, or paste from clipboard.`}
    >
      <input ref={inputRef} type="file" className="sr-only" accept="image/jpeg,image/png,image/webp,image/heic,.jpg,.jpeg,.png,.webp,.heic,.heif" multiple onChange={handleInputChange} tabIndex={-1} aria-hidden="true" disabled={disabled} />
      <div className="file-dropzone-icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2" /><circle cx="16" cy="18" r="3" fill="currentColor" /><path d="M4 34l10-10 8 8 6-6 16 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
      </div>
      <p className="file-dropzone-title">Choose up to {maxPages} images</p>
      <p className="file-dropzone-formats">JPG, PNG, WebP, HEIC</p>
      <p className="file-dropzone-privacy">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ verticalAlign: "middle", marginRight: 4 }}>
          <path d="M8 1L2 4v4c0 3.3 2.5 6.4 6 7 3.5-.6 6-3.7 6-7V4L8 1z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M6 8l1.5 1.5L10 7" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        Your files stay on this device
      </p>
    </div>
  );
}
