"use client";

import { useReducer, useCallback, useRef, useEffect } from "react";
import {
  organizerReducer,
  createEmptyOrganizer,
  loadPdfsAndBuildOrganizer,
} from "@/features/pdf-tools/organizer-state";
import {
  mergePdfs,
  splitPdfAllPages,
  splitPdfByRanges,
  splitPdfEveryN,
  rotatePdfPages,
  deletePdfPages,
  extractPdfPages,
  addPageNumbers,
  resizePdfPages,
  nUpPdf,
  compressPdf,
  parsePageRanges,
} from "@/features/pdf-tools/pdf-operations";
import { renderPagesToCanvas, canvasToBlob, extractPdfText } from "@/features/pdf-tools/pdf-renderer";
import type { OrganizerPage, PdfToImageSettings } from "@/features/pdf-tools/types";

export function useOrganizer() {
  const [state, dispatch] = useReducer(organizerReducer, null, createEmptyOrganizer);
  const abortRef = useRef<AbortController | null>(null);

  const loadFiles = useCallback(async (files: FileList | File[]) => {
    if (processingRef.current) return;
    processingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    try {
    dispatch({ type: "SET_LOADING" });
    const { documents, pages, warnings } = await loadPdfsAndBuildOrganizer(Array.from(files));
    if (controller.signal.aborted) return;
    if (documents.length === 0) {
      dispatch({ type: "SET_ERROR", message: "No valid PDF files could be loaded.", recoverable: false });
      return;
    }
    dispatch({ type: "SET_EDITING", documents, pages, warnings: warnings.length > 0 ? warnings : undefined });
    } catch {
      if (controller.signal.aborted) return;
      dispatch({ type: "SET_ERROR", message: "Failed to load PDF files. The file may be corrupted or unsupported.", recoverable: false });
    } finally {
      processingRef.current = false;
    }
  }, []);

  const movePage = useCallback((from: number, to: number) => dispatch({ type: "MOVE_PAGE", fromIndex: from, toIndex: to }), []);
  const rotatePage = useCallback((id: string, deg: 90 | -90 | 180) => dispatch({ type: "ROTATE_PAGE", pageId: id, degrees: deg }), []);
  const toggleSelect = useCallback((id: string) => dispatch({ type: "TOGGLE_SELECT", pageId: id }), []);
  const selectAll = useCallback(() => dispatch({ type: "SELECT_ALL" }), []);
  const deselectAll = useCallback(() => dispatch({ type: "DESELECT_ALL" }), []);
  const removeDocument = useCallback((idx: number) => dispatch({ type: "REMOVE_DOCUMENT", index: idx }), []);
  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    processingRef.current = false;
    if (state.phase.phase === "success") URL.revokeObjectURL(state.phase.objectUrl);
    dispatch({ type: "RESET" });
  }, [state.phase]);

  const processingRef = useRef(false);
  const successUrlRef = useRef<string | null>(null);

  useEffect(() => {
    successUrlRef.current = state.phase.phase === "success" ? state.phase.objectUrl : null;
  }, [state.phase]);

  const revokePreviousSuccess = () => {
    if (successUrlRef.current) { URL.revokeObjectURL(successUrlRef.current); successUrlRef.current = null; }
  };

  const executeMerge = useCallback(async (filename: string) => {
    if (processingRef.current || state.documents.length === 0) return;
    processingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    revokePreviousSuccess();
    dispatch({ type: "SET_PROCESSING" });

    try {
      const pdfBytes = await mergePdfs(state.documents, state.pages, (c, t) => {
        dispatch({ type: "SET_PROGRESS", progress: { current: c, total: t, label: "Merging PDFs..." } });
      });

      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }

      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const objectUrl = URL.createObjectURL(blob);
      dispatch({ type: "SET_SUCCESS", blob, objectUrl, bytes: blob.size, filename, warnings: [] });
      processingRef.current = false;
    } catch (err) {
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      dispatch({ type: "SET_ERROR", message: `Merge failed: ${err instanceof Error ? err.message : "Unknown error"}`, recoverable: true });
      processingRef.current = false;
    }
  }, [state.documents, state.pages]);

  const executeSplit = useCallback(async (
    mode: "all-pages" | "custom-ranges" | "every-n-pages",
    filename: string,
    extra?: { ranges?: string; n?: number }
  ) => {
    if (processingRef.current || state.documents.length === 0) return;
    processingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    revokePreviousSuccess();
    dispatch({ type: "SET_PROCESSING" });

    try {
      const doc = state.documents[0]!;
      let results: Array<{ bytes: Uint8Array; filename: string }>;

      if (mode === "all-pages") {
        results = await splitPdfAllPages(doc, (c, t) => {
          dispatch({ type: "SET_PROGRESS", progress: { current: c, total: t, label: "Splitting pages..." } });
        });
      } else if (mode === "every-n-pages") {
        results = await splitPdfEveryN(doc, extra?.n ?? 2, (c, t) => {
          dispatch({ type: "SET_PROGRESS", progress: { current: c, total: t, label: "Splitting pages..." } });
        });
      } else {
        const rangeStr = extra?.ranges ?? "";
        const rangeParts = rangeStr.split(/[;,\n]+/).filter(Boolean);
        if (rangeParts.length === 0) {
          dispatch({ type: "SET_ERROR", message: "Please enter valid page ranges (e.g. 1-3,5,8-10).", recoverable: true });
          processingRef.current = false;
          return;
        }
        const ranges = rangeParts.map((part, i) => {
          const [startStr, endStr] = part.includes("-") ? part.split("-") : [part, part];
          return { start: parseInt(startStr!, 10), end: parseInt(endStr!, 10), label: `part-${i + 1}` };
        });
        results = await splitPdfByRanges(doc, ranges, (c, t) => {
          dispatch({ type: "SET_PROGRESS", progress: { current: c, total: t, label: "Splitting by ranges..." } });
        });
      }

      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }

      if (results.length === 1) {
        const r = results[0]!;
        const blob = new Blob([r.bytes as unknown as BlobPart], { type: "application/pdf" });
        const objectUrl = URL.createObjectURL(blob);
        dispatch({ type: "SET_SUCCESS", blob, objectUrl, bytes: blob.size, filename: r.filename, warnings: [] });
      } else {
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();
        for (const r of results) zip.file(r.filename, r.bytes);
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const objectUrl = URL.createObjectURL(zipBlob);
        dispatch({ type: "SET_SUCCESS", blob: zipBlob, objectUrl, bytes: zipBlob.size, filename: `${filename}.zip`, warnings: [] });
      }

      processingRef.current = false;
    } catch (err) {
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      dispatch({ type: "SET_ERROR", message: `Split failed: ${err instanceof Error ? err.message : "Unknown error"}`, recoverable: true });
      processingRef.current = false;
    }
  }, [state.documents]);

  const executeRotate = useCallback(async (filename: string) => {
    if (processingRef.current || state.documents.length === 0) return;
    processingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    revokePreviousSuccess();
    dispatch({ type: "SET_PROCESSING" });

    try {
      const docZeroPages = state.pages.filter((p) => p.sourceDocIndex === 0);
      const pdfBytes = await rotatePdfPages(state.documents[0]!, docZeroPages, (c, t) => {
        dispatch({ type: "SET_PROGRESS", progress: { current: c, total: t, label: "Rotating pages..." } });
      });
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const objectUrl = URL.createObjectURL(blob);
      dispatch({ type: "SET_SUCCESS", blob, objectUrl, bytes: blob.size, filename, warnings: [] });
      processingRef.current = false;
    } catch (err) {
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      dispatch({ type: "SET_ERROR", message: `Rotate failed: ${err instanceof Error ? err.message : "Unknown error"}`, recoverable: true });
      processingRef.current = false;
    }
  }, [state.documents, state.pages]);

  const executeDelete = useCallback(async (filename: string) => {
    if (processingRef.current || state.documents.length === 0) return;
    processingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    revokePreviousSuccess();
    dispatch({ type: "SET_PROCESSING" });

    try {
      const selectedPages = state.pages.filter(p => p.selected && p.sourceDocIndex === 0);
      if (selectedPages.length === 0 || selectedPages.length >= state.pages.filter(p => p.sourceDocIndex === 0).length) {
        dispatch({ type: "SET_ERROR", message: "A PDF must contain at least one page. Deselect at least one page to keep.", recoverable: true });
        processingRef.current = false;
        return;
      }
      const pagesToRemove = new Set<number>();
      for (const p of selectedPages) {
        pagesToRemove.add(p.sourcePageNumber - 1);
      }
      const pdfBytes = await deletePdfPages(state.documents[0]!, pagesToRemove, () => {
        dispatch({ type: "SET_PROGRESS", progress: { current: 1, total: 1, label: "Removing pages..." } });
      });
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const objectUrl = URL.createObjectURL(blob);
      dispatch({ type: "SET_SUCCESS", blob, objectUrl, bytes: blob.size, filename, warnings: [] });
      processingRef.current = false;
    } catch (err) {
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      dispatch({ type: "SET_ERROR", message: `Delete failed: ${err instanceof Error ? err.message : "Unknown error"}`, recoverable: true });
      processingRef.current = false;
    }
  }, [state.documents, state.pages]);

  const executeExtract = useCallback(async (filename: string, combine: boolean) => {
    if (processingRef.current || state.documents.length === 0) return;
    processingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    revokePreviousSuccess();
    dispatch({ type: "SET_PROCESSING" });

    try {
      const pageIndices = state.pages
        .filter((p) => p.selected && p.sourceDocIndex === 0)
        .map((p) => p.sourcePageNumber - 1);
      if (pageIndices.length === 0) {
        dispatch({ type: "SET_ERROR", message: "No pages selected for extraction.", recoverable: true });
        processingRef.current = false;
        return;
      }

      const result = await extractPdfPages(state.documents[0]!, pageIndices, combine, (c, t) => {
        dispatch({ type: "SET_PROGRESS", progress: { current: c, total: t, label: "Extracting pages..." } });
      });

      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }

      if (result instanceof Uint8Array) {
        const blob = new Blob([result as unknown as BlobPart], { type: "application/pdf" });
        const objectUrl = URL.createObjectURL(blob);
        dispatch({ type: "SET_SUCCESS", blob, objectUrl, bytes: blob.size, filename, warnings: [] });
      } else if (result.length === 1) {
        const r = result[0]!;
        const blob = new Blob([r.bytes as unknown as BlobPart], { type: "application/pdf" });
        const objectUrl = URL.createObjectURL(blob);
        dispatch({ type: "SET_SUCCESS", blob, objectUrl, bytes: blob.size, filename: r.filename, warnings: [] });
      } else {
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();
        for (const r of result) zip.file(r.filename, r.bytes);
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const objectUrl = URL.createObjectURL(zipBlob);
        dispatch({ type: "SET_SUCCESS", blob: zipBlob, objectUrl, bytes: zipBlob.size, filename: `${filename}.zip`, warnings: [] });
      }
      processingRef.current = false;
    } catch (err) {
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      dispatch({ type: "SET_ERROR", message: `Extract failed: ${err instanceof Error ? err.message : "Unknown error"}`, recoverable: true });
      processingRef.current = false;
    }
  }, [state.documents, state.pages]);

  const executePdfToImage = useCallback(async (
    format: "jpeg" | "png",
    settings: PdfToImageSettings,
    filename: string,
    onlySelected?: boolean
  ) => {
    if (processingRef.current || state.documents.length === 0) return;
    processingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    revokePreviousSuccess();
    dispatch({ type: "SET_PROCESSING" });

    try {
      const buf = await state.documents[0]!.file.arrayBuffer();
      const scale = settings.dpi / 72;
      const pages = onlySelected
        ? state.pages.filter((p) => p.selected && p.sourceDocIndex === 0).map((p) => p.sourcePageNumber)
        : state.pages.filter((p) => p.sourceDocIndex === 0).map((p) => p.sourcePageNumber);
      const { renderPagesToBlobs } = await import("@/features/pdf-tools/pdf-renderer");
      const blobs = await renderPagesToBlobs(buf, pages, `image/${format}` as "image/jpeg" | "image/png", scale, settings.jpegQuality, (c, t) => {
        dispatch({ type: "SET_PROGRESS", progress: { current: c, total: t, label: "Rendering pages..." } });
      });

      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }

      if (blobs.length === 0) {
        dispatch({ type: "SET_ERROR", message: "No pages could be rendered.", recoverable: false });
        processingRef.current = false;
        return;
      }

      if (blobs.length === 1) {
        const b = blobs[0]!;
        const objectUrl = URL.createObjectURL(b.blob);
        dispatch({ type: "SET_SUCCESS", blob: b.blob, objectUrl, bytes: b.blob.size, filename: `${filename}.${format}`, warnings: [] });
      } else {
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();
        for (const b of blobs) zip.file(`${filename}-page-${b.pageNumber}.${format}`, b.blob);
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const objectUrl = URL.createObjectURL(zipBlob);
        dispatch({ type: "SET_SUCCESS", blob: zipBlob, objectUrl, bytes: zipBlob.size, filename: `${filename}.zip`, warnings: [] });
      }

      processingRef.current = false;
    } catch (err) {
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      dispatch({ type: "SET_ERROR", message: `Conversion failed: ${err instanceof Error ? err.message : "Unknown error"}`, recoverable: true });
      processingRef.current = false;
    }
  }, [state.documents, state.pages]);

  const executePdfToText = useCallback(async (filename: string) => {
    if (processingRef.current || state.documents.length === 0) return;
    processingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    revokePreviousSuccess();
    dispatch({ type: "SET_PROCESSING" });

    try {
      const buf = await state.documents[0]!.file.arrayBuffer();
      const results = await extractPdfText(buf);

      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }

      let text = "";
      for (const r of results) {
        text += `--- Page ${r.pageNumber} ---\n${r.text}\n\n`;
      }

      const blob = new Blob([text], { type: "text/plain" });
      const objectUrl = URL.createObjectURL(blob);
      dispatch({ type: "SET_SUCCESS", blob, objectUrl, bytes: blob.size, filename, warnings: results.length === 0 ? ["No text content found in PDF."] : [] });
      processingRef.current = false;
    } catch (err) {
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      dispatch({ type: "SET_ERROR", message: `Text extraction failed: ${err instanceof Error ? err.message : "Unknown error"}`, recoverable: true });
      processingRef.current = false;
    }
  }, [state.documents]);

  const executeAddPageNumbers = useCallback(async (
    settings: {
      position: "top" | "bottom";
      align: "left" | "center" | "right";
      format: string;
      fontSize: number;
      margin: number;
      startPage: number;
      startNumber: number;
      color: string;
    },
    filename: string
  ) => {
    if (processingRef.current || state.documents.length === 0) return;
    processingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    revokePreviousSuccess();
    dispatch({ type: "SET_PROCESSING" });

    try {
      const pdfBytes = await addPageNumbers(state.documents[0]!, settings, (c, t) => {
        dispatch({ type: "SET_PROGRESS", progress: { current: c, total: t, label: "Adding page numbers..." } });
      });
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const objectUrl = URL.createObjectURL(blob);
      dispatch({ type: "SET_SUCCESS", blob, objectUrl, bytes: blob.size, filename, warnings: [] });
      processingRef.current = false;
    } catch (err) {
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      dispatch({ type: "SET_ERROR", message: `Failed: ${err instanceof Error ? err.message : "Unknown error"}`, recoverable: true });
      processingRef.current = false;
    }
  }, [state.documents]);

  const executeResize = useCallback(async (
    targetWidth: number,
    targetHeight: number,
    mode: "scale" | "center" | "canvas",
    filename: string
  ) => {
    if (processingRef.current || state.documents.length === 0) return;
    processingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    revokePreviousSuccess();
    dispatch({ type: "SET_PROCESSING" });

    try {
      const pdfBytes = await resizePdfPages(state.documents[0]!, targetWidth, targetHeight, mode, (c, t) => {
        dispatch({ type: "SET_PROGRESS", progress: { current: c, total: t, label: "Resizing pages..." } });
      });
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const objectUrl = URL.createObjectURL(blob);
      dispatch({ type: "SET_SUCCESS", blob, objectUrl, bytes: blob.size, filename, warnings: [] });
      processingRef.current = false;
    } catch (err) {
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      dispatch({ type: "SET_ERROR", message: `Failed: ${err instanceof Error ? err.message : "Unknown error"}`, recoverable: true });
      processingRef.current = false;
    }
  }, [state.documents]);

  const executeNUp = useCallback(async (
    cols: number,
    rows: number,
    outW: number,
    outH: number,
    padding: number,
    filename: string
  ) => {
    if (processingRef.current || state.documents.length === 0) return;
    processingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    revokePreviousSuccess();
    dispatch({ type: "SET_PROCESSING" });

    try {
      const pdfBytes = await nUpPdf(state.documents[0]!, cols, rows, outW, outH, padding, (c, t) => {
        dispatch({ type: "SET_PROGRESS", progress: { current: c, total: t, label: "Creating N-up layout..." } });
      });
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const objectUrl = URL.createObjectURL(blob);
      dispatch({ type: "SET_SUCCESS", blob, objectUrl, bytes: blob.size, filename, warnings: [] });
      processingRef.current = false;
    } catch (err) {
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      dispatch({ type: "SET_ERROR", message: `Failed: ${err instanceof Error ? err.message : "Unknown error"}`, recoverable: true });
      processingRef.current = false;
    }
  }, [state.documents]);

  const executeCompress = useCallback(async (filename: string) => {
    if (processingRef.current || state.documents.length === 0) return;
    processingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    revokePreviousSuccess();
    dispatch({ type: "SET_PROCESSING" });

    try {
      const { bytes, originalSize } = await compressPdf(state.documents[0]!, "safe", 0.8, (c, t) => {
        dispatch({ type: "SET_PROGRESS", progress: { current: c, total: t, label: "Compressing..." } });
      });
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      const blob = new Blob([bytes as unknown as BlobPart], { type: "application/pdf" });
      const objectUrl = URL.createObjectURL(blob);
      const reduction = Math.round((1 - bytes.length / originalSize) * 100);
      dispatch({
        type: "SET_SUCCESS",
        blob, objectUrl, bytes: blob.size, filename,
        warnings: reduction <= 0 ? ["This PDF was already efficiently compressed. The file size did not change significantly."] : [],
      });
      processingRef.current = false;
    } catch (err) {
      if (controller.signal.aborted) { if (abortRef.current === controller) processingRef.current = false; return; }
      dispatch({ type: "SET_ERROR", message: `Compression failed: ${err instanceof Error ? err.message : "Unknown error"}`, recoverable: true });
      processingRef.current = false;
    }
  }, [state.documents]);

  const cancelProcessing = useCallback(() => {
    if (!abortRef.current) return;
    abortRef.current.abort();
    abortRef.current = null;
    processingRef.current = false;
    dispatch({ type: "SET_ERROR", message: "Operation cancelled.", recoverable: false });
  }, []);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (successUrlRef.current) URL.revokeObjectURL(successUrlRef.current);
    };
  }, []);

  return {
    state,
    loadFiles,
    movePage,
    rotatePage,
    toggleSelect,
    selectAll,
    deselectAll,
    removeDocument,
    reset,
    executeMerge,
    executeSplit,
    executeRotate,
    executeDelete,
    executeExtract,
    executePdfToImage,
    executePdfToText,
    executeAddPageNumbers,
    executeResize,
    executeNUp,
    executeCompress,
    cancelProcessing,
    selectedCount: state.pages.filter((p) => p.selected).length,
  };
}
