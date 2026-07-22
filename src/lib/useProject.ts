import { useReducer, useCallback, useRef } from "react";
import {
  projectReducer,
  createEmptyProject,
  computeOutputFilename,
  estimatePdfSize,
} from "@/features/image-to-pdf/state";
import { generateThumbnail, revokeThumbnail } from "@/features/image-to-pdf/image-processor";
import { validateFile } from "@/features/image-to-pdf/file-validator";
import { buildPdf } from "@/features/image-to-pdf/pdf-builder";
import type {
  ProjectPage,
  ValidationError,
  MarginPreset,
  PageSizePreset,
  PageOrientation,
  FitMode,
  QualityPreset,
} from "@/features/image-to-pdf/types";
import { DEFAULT_CONFIG } from "@/features/image-to-pdf/config";

const MAX_PAGES = DEFAULT_CONFIG.maxPagesPerJob;

export function useProject() {
  const [project, dispatch] = useReducer(projectReducer, null, createEmptyProject);
  const abortRef = useRef<AbortController | null>(null);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    dispatch({ type: "SET_VALIDATING" });

    const fileArray = Array.from(files);
    const validPages: ProjectPage[] = [];
    const errors: ValidationError[] = [];
    let totalBytes = 0;

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i]!;
      const { result, error } = await validateFile(file, i, totalBytes);

      if (error) {
        errors.push(error);
      } else if (result) {
        if (validPages.length < MAX_PAGES) {
          const thumb = await generateThumbnail(file);
          if (!thumb) {
            errors.push({ fileIndex: i, fileName: file.name, errorCode: "DECODE_FAILED", message: "Could not generate preview." });
            continue;
          }
          validPages.push({
            id: `page-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            file,
            format: result.format,
            sourceWidth: result.width,
            sourceHeight: result.height,
            sourceBytes: file.size,
            rotationDegrees: 0,
            selected: false,
            thumbnailUrl: thumb.objectUrl,
            status: "ready",
          });
          totalBytes += file.size;
        } else {
          errors.push({ fileIndex: i, fileName: file.name, errorCode: "TOO_MANY_FILES", message: `Up to ${MAX_PAGES} pages per conversion.` });
        }
      }
    }

    if (validPages.length === 0 && errors.length > 0) {
      dispatch({ type: "SET_ERROR", errors, recoverable: false });
      return;
    }

    dispatch({ type: "SET_EDITING", pages: validPages, validationErrors: errors });
  }, []);

  const addMoreFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validPages: ProjectPage[] = [];
    const errors: ValidationError[] = [];
    let totalBytes = project.pages.reduce((s, p) => s + p.sourceBytes, 0);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i]!;
      const { result, error } = await validateFile(file, i, totalBytes);
      if (error) { errors.push(error); }
      else if (result) {
        if (project.pages.length + validPages.length < MAX_PAGES) {
          const thumb = await generateThumbnail(file);
          if (!thumb) { errors.push({ fileIndex: i, fileName: file.name, errorCode: "DECODE_FAILED", message: "Could not generate preview." }); continue; }
          validPages.push({
            id: `page-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            file, format: result.format, sourceWidth: result.width, sourceHeight: result.height, sourceBytes: file.size,
            rotationDegrees: 0, selected: false, thumbnailUrl: thumb.objectUrl, status: "ready",
          });
          totalBytes += file.size;
        } else {
          errors.push({ fileIndex: i, fileName: file.name, errorCode: "TOO_MANY_FILES", message: `Up to ${MAX_PAGES} pages.` });
        }
      }
    }

    if (validPages.length > 0) {
      dispatch({ type: "ADD_PAGES", pages: validPages, validationWarnings: errors.length > 0 ? errors : undefined });
    } else if (errors.length > 0) {
      dispatch({ type: "ADD_PAGES", pages: [], validationWarnings: errors });
    }
  }, [project.pages]);

  const dismissWarnings = useCallback(() => dispatch({ type: "DISMISS_WARNINGS" }), []);

  const setPageSize = useCallback((v: PageSizePreset) => dispatch({ type: "SET_PAGE_SIZE", pageSize: v }), []);
  const setCustomPageSize = useCallback((w: number, h: number) => dispatch({ type: "SET_CUSTOM_PAGE", widthMm: w, heightMm: h }), []);
  const setOrientation = useCallback((v: PageOrientation) => dispatch({ type: "SET_ORIENTATION", orientation: v }), []);
  const setFitMode = useCallback((v: FitMode) => dispatch({ type: "SET_FIT_MODE", fitMode: v }), []);
  const setMargins = useCallback((v: MarginPreset) => dispatch({ type: "SET_MARGINS", marginPreset: v }), []);
  const setQuality = useCallback((v: QualityPreset) => dispatch({ type: "SET_QUALITY", quality: v }), []);
  const setFilename = useCallback((n: string) => dispatch({ type: "SET_FILENAME", filename: computeOutputFilename(n) }), []);

  const removePage = useCallback((id: string) => {
    const page = project.pages.find((p) => p.id === id);
    if (page) revokeThumbnail(page.thumbnailUrl);
    dispatch({ type: "REMOVE_PAGE", pageId: id });
  }, [project.pages]);

  const movePage = useCallback((id: string, idx: number) => dispatch({ type: "MOVE_PAGE", pageId: id, newIndex: idx }), []);
  const reorderPages = useCallback((from: number, to: number) => dispatch({ type: "REORDER_PAGES", fromIndex: from, toIndex: to }), []);
  const rotatePage = useCallback((id: string, d: "cw" | "ccw") => dispatch({ type: "ROTATE_PAGE", pageId: id, direction: d }), []);

  const toggleSelect = useCallback((id: string, selected: boolean) => dispatch({ type: "SELECT_PAGE", pageId: id, selected }), []);
  const selectAll = useCallback(() => dispatch({ type: "SELECT_ALL" }), []);
  const deselectAll = useCallback(() => dispatch({ type: "DESELECT_ALL" }), []);
  const removeSelected = useCallback(() => {
    for (const p of project.pages) { if (p.selected) revokeThumbnail(p.thumbnailUrl); }
    dispatch({ type: "REMOVE_SELECTED" });
  }, [project.pages]);
  const rotateSelected = useCallback((d: "cw" | "ccw") => dispatch({ type: "ROTATE_SELECTED", direction: d }), []);
  const setPageOrientation = useCallback((id: string, o: PageOrientation) => dispatch({ type: "SET_PAGE_ORIENTATION", pageId: id, orientation: o }), []);

  const convertingRef = useRef(false);

  const startConversion = useCallback(async () => {
    if (convertingRef.current) return;
    convertingRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    const jobId = `job-${Date.now()}`;
    dispatch({ type: "SET_CONVERTING", jobId });
    const startTime = performance.now();

    try {
      const { pdfBytes, warnings, actualPageCount } = await buildPdf(
        project.pages, project.settings, controller.signal,
        (current, total, phase) => {
          dispatch({ type: "SET_PROGRESS", progress: { current, total, phase } });
        }
      );

      if (controller.signal.aborted) { convertingRef.current = false; return; }

      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const objectUrl = URL.createObjectURL(blob);
      const duration = Math.round(performance.now() - startTime);

      dispatch({ type: "SET_SUCCESS", blob, objectUrl, bytes: blob.size, pageCount: actualPageCount, durationMs: duration, warnings });
      convertingRef.current = false;
    } catch (err) {
      if (controller.signal.aborted) { convertingRef.current = false; return; }
      dispatch({
        type: "SET_ERROR",
        errors: [{ fileIndex: -1, fileName: "", errorCode: "CONVERSION_FAILED", message: err instanceof Error ? err.message : "Unexpected error." }],
        recoverable: true,
      });
      convertingRef.current = false;
    }
  }, [project.pages, project.settings]);

  const cancelConversion = useCallback(() => {
    abortRef.current?.abort();
    dispatch({ type: "CANCEL_CONVERSION" });
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    for (const page of project.pages) revokeThumbnail(page.thumbnailUrl);
    if (project.state.phase === "success") URL.revokeObjectURL(project.state.result.objectUrl);
    dispatch({ type: "RESET" });
  }, [project.pages, project.state]);

  const retry = useCallback(() => dispatch({ type: "SET_EDITING", pages: project.pages, validationErrors: [] }), [project.pages]);

  const estimatedSize = estimatePdfSize(project.pages, project.settings);
  const selectedCount = project.pages.filter((p) => p.selected).length;

  return {
    project, addFiles, addMoreFiles, dismissWarnings,
    setPageSize, setCustomPageSize, setOrientation, setFitMode, setMargins, setQuality, setFilename,
    removePage, movePage, reorderPages, rotatePage,
    toggleSelect, selectAll, deselectAll, removeSelected, rotateSelected,
    setPageOrientation,
    startConversion, cancelConversion, reset, retry,
    estimatedSize, selectedCount,
  };
}
