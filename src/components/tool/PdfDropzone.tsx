"use client";

import { useCallback, useState, useRef } from "react";

type Props = {
  onFilesSelected: (files: FileList | File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
};

export function PdfDropzone({ onFilesSelected, accept = ".pdf", multiple = true, disabled, label, description }: Props) {
  const [dragging, setDragging] = useState(false);
  const counter = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    counter.current++;
    if (!disabled) setDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    counter.current--;
    if (counter.current <= 0) {
      counter.current = 0;
      setDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    counter.current = 0;
    if (disabled) return;
    const ext = accept.replace(/\./g, "").toLowerCase();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.name.toLowerCase().endsWith(`.${ext}`)
    );
    if (files.length > 0) onFilesSelected(files);
  }, [disabled, accept, onFilesSelected]);

  const handleClick = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
      e.target.value = "";
    }
  }, [onFilesSelected]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <div
      className={`dropzone ${dragging ? "dropzone--active" : ""} ${disabled ? "dropzone--disabled" : ""}`}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={label || "Select PDF files"}
      aria-disabled={disabled ? true : undefined}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="dropzone-input"
        onChange={handleChange}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div className="dropzone-content">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect x="8" y="4" width="32" height="40" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M28 4v10h10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M16 22h16M16 28h12M16 34h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="dropzone-label">{label || "Select PDF files"}</p>
        <p className="dropzone-desc">
          {description || "Click or drag and drop PDF files here"}
        </p>
      </div>
    </div>
  );
}
