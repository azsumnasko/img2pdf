import type {
  Project,
  ProjectPage,
  PdfSettings,
  ValidationError,
  MarginPreset,
  PageSizePreset,
  PageOrientation,
  FitMode,
  QualityPreset,
  RotationDegrees,
  CropRect,
  ConversionProgress,
} from "./types";
import { DEFAULT_CONFIG, MARGIN_PRESETS, PAGE_SIZE_DIMENSIONS, QUALITY_PRESETS } from "./config";

export function createDefaultSettings(): PdfSettings {
  const marginPreset = MARGIN_PRESETS[DEFAULT_CONFIG.defaultMargins]!;
  return {
    pageSize: DEFAULT_CONFIG.defaultPageSize,
    orientation: DEFAULT_CONFIG.defaultOrientation,
    fitMode: DEFAULT_CONFIG.defaultFitMode,
    marginsMm: { ...marginPreset },
    background: "#ffffff",
    quality: DEFAULT_CONFIG.defaultQuality,
    stripMetadata: true,
  };
}

export function createEmptyProject(): Project {
  return {
    pages: [],
    settings: createDefaultSettings(),
    outputFilename: `images-to-pdf-${new Date().toISOString().split("T")[0]}.pdf`,
    state: { phase: "empty" },
    activePageIndex: null,
  };
}

export type ProjectAction =
  | { type: "SET_VALIDATING" }
  | { type: "SET_EDITING"; pages: ProjectPage[]; validationErrors: ValidationError[] }
  | { type: "DISMISS_WARNINGS" }
  | { type: "ADD_PAGES"; pages: ProjectPage[]; validationWarnings?: ValidationError[] }
  | { type: "REMOVE_PAGE"; pageId: string }
  | { type: "REMOVE_SELECTED" }
  | { type: "MOVE_PAGE"; pageId: string; newIndex: number }
  | { type: "REORDER_PAGES"; fromIndex: number; toIndex: number }
  | { type: "ROTATE_PAGE"; pageId: string; direction: "cw" | "ccw" }
  | { type: "ROTATE_SELECTED"; direction: "cw" | "ccw" }
  | { type: "SELECT_PAGE"; pageId: string; selected: boolean }
  | { type: "SELECT_ALL" }
  | { type: "DESELECT_ALL" }
  | { type: "SET_PAGE_ORIENTATION"; pageId: string; orientation: PageOrientation }
  | { type: "CROP_PAGE"; pageId: string; crop: CropRect | undefined }
  | { type: "SET_ACTIVE_PAGE"; pageId: string | null }
  | { type: "UPDATE_SETTINGS"; settings: Partial<PdfSettings> }
  | { type: "SET_PAGE_SIZE"; pageSize: PageSizePreset }
  | { type: "SET_CUSTOM_PAGE"; widthMm: number; heightMm: number }
  | { type: "SET_ORIENTATION"; orientation: PageOrientation }
  | { type: "SET_FIT_MODE"; fitMode: FitMode }
  | { type: "SET_MARGINS"; marginPreset: MarginPreset }
  | { type: "SET_QUALITY"; quality: QualityPreset }
  | { type: "SET_FILENAME"; filename: string }
  | { type: "SET_CONVERTING"; jobId: string }
  | { type: "SET_PROGRESS"; progress: ConversionProgress }
  | { type: "CANCEL_CONVERSION" }
  | { type: "SET_SUCCESS"; blob: Blob; objectUrl: string; bytes: number; pageCount: number; durationMs: number; warnings: string[] }
  | { type: "SET_ERROR"; errors: ValidationError[]; recoverable: boolean }
  | { type: "RESET" };

export function projectReducer(project: Project, action: ProjectAction): Project {
  switch (action.type) {
    case "SET_VALIDATING":
      return { ...project, state: { phase: "validating" } };

    case "SET_EDITING":
      return {
        ...project,
        pages: action.pages,
        state: { phase: "editing", validationWarnings: action.validationErrors.length > 0 ? action.validationErrors : undefined },
        activePageIndex: project.activePageIndex ?? (action.pages.length > 0 ? 0 : null),
      };

    case "DISMISS_WARNINGS":
      if (project.state.phase === "editing") {
        return { ...project, state: { phase: "editing", validationWarnings: undefined } };
      }
      return project;

    case "ADD_PAGES":
      return {
        ...project,
        pages: [...project.pages, ...action.pages],
        activePageIndex: project.pages.length,
        state: { phase: "editing", validationWarnings: action.validationWarnings },
      };

    case "REMOVE_PAGE": {
      const filtered = project.pages.filter((p) => p.id !== action.pageId);
      let ai = project.activePageIndex;
      if (filtered.length === 0) ai = null;
      else if (ai !== null && ai >= filtered.length) ai = filtered.length - 1;
      return {
        ...project,
        pages: filtered,
        activePageIndex: ai,
        state: filtered.length === 0 && project.state.phase === "editing" ? { phase: "empty" } : project.state,
      };
    }

    case "REMOVE_SELECTED": {
      const filtered = project.pages.filter((p) => !p.selected);
      let ai = project.activePageIndex;
      if (filtered.length === 0) ai = null;
      else if (ai !== null && ai >= filtered.length) ai = filtered.length - 1;
      return {
        ...project,
        pages: filtered,
        activePageIndex: ai,
        state: filtered.length === 0 && project.state.phase === "editing" ? { phase: "empty" } : project.state,
      };
    }

    case "MOVE_PAGE": {
      const idx = project.pages.findIndex((p) => p.id === action.pageId);
      if (idx === -1) return project;
      const pages = [...project.pages];
      const [moved] = pages.splice(idx, 1);
      if (!moved) return project;
      pages.splice(action.newIndex, 0, moved);
      return { ...project, pages, activePageIndex: action.newIndex };
    }

    case "REORDER_PAGES": {
      const pages = [...project.pages];
      const [moved] = pages.splice(action.fromIndex, 1);
      if (!moved) return project;
      pages.splice(action.toIndex, 0, moved);
      return { ...project, pages };
    }

    case "ROTATE_PAGE":
      return {
        ...project,
        pages: project.pages.map((p) => {
          if (p.id !== action.pageId) return p;
          const delta = action.direction === "cw" ? 90 : -90;
          const next = (((p.rotationDegrees + delta) % 360) + 360) % 360;
          return { ...p, rotationDegrees: next as RotationDegrees };
        }),
      };

    case "ROTATE_SELECTED":
      return {
        ...project,
        pages: project.pages.map((p) => {
          if (!p.selected) return p;
          const delta = action.direction === "cw" ? 90 : -90;
          const next = (((p.rotationDegrees + delta) % 360) + 360) % 360;
          return { ...p, rotationDegrees: next as RotationDegrees };
        }),
      };

    case "SELECT_PAGE":
      return {
        ...project,
        pages: project.pages.map((p) => (p.id === action.pageId ? { ...p, selected: action.selected } : p)),
      };

    case "SELECT_ALL":
      return { ...project, pages: project.pages.map((p) => ({ ...p, selected: true })) };

    case "DESELECT_ALL":
      return { ...project, pages: project.pages.map((p) => ({ ...p, selected: false })) };

    case "SET_PAGE_ORIENTATION":
      return {
        ...project,
        pages: project.pages.map((p) =>
          p.id === action.pageId ? { ...p, orientationOverride: action.orientation } : p
        ),
      };

    case "CROP_PAGE":
      return { ...project, pages: project.pages.map((p) => (p.id === action.pageId ? { ...p, crop: action.crop } : p)) };

    case "SET_ACTIVE_PAGE":
      return {
        ...project,
        activePageIndex: action.pageId
          ? Math.max(0, project.pages.findIndex((p) => p.id === action.pageId))
          : null,
      };

    case "UPDATE_SETTINGS":
      return { ...project, settings: { ...project.settings, ...action.settings } };

    case "SET_PAGE_SIZE":
      return { ...project, settings: { ...project.settings, pageSize: action.pageSize } };

    case "SET_CUSTOM_PAGE":
      return { ...project, settings: { ...project.settings, customWidthMm: action.widthMm, customHeightMm: action.heightMm } };

    case "SET_ORIENTATION":
      return { ...project, settings: { ...project.settings, orientation: action.orientation } };

    case "SET_FIT_MODE":
      return { ...project, settings: { ...project.settings, fitMode: action.fitMode } };

    case "SET_MARGINS": {
      const margins = MARGIN_PRESETS[action.marginPreset];
      if (!margins) return project;
      return { ...project, settings: { ...project.settings, marginsMm: { ...margins } } };
    }

    case "SET_QUALITY":
      return { ...project, settings: { ...project.settings, quality: action.quality } };

    case "SET_FILENAME":
      return { ...project, outputFilename: action.filename };

    case "SET_CONVERTING":
      return { ...project, state: { phase: "converting", jobId: action.jobId, cancelled: false } };

    case "SET_PROGRESS":
      if (project.state.phase !== "converting") return project;
      return { ...project, state: { ...project.state, progress: action.progress } };

    case "CANCEL_CONVERSION":
      if (project.state.phase !== "converting") return project;
      return { ...project, state: { ...project.state, cancelled: true } };

    case "SET_SUCCESS":
      return {
        ...project,
        state: {
          phase: "success",
          result: {
            blob: action.blob,
            objectUrl: action.objectUrl,
            bytes: action.bytes,
            pageCount: action.pageCount,
            durationMs: action.durationMs,
            warnings: action.warnings,
          },
        },
      };

    case "SET_ERROR":
      return { ...project, state: { phase: "error", errors: action.errors, recoverable: action.recoverable } };

    case "RESET": {
      const defaults = createDefaultSettings();
      return {
        ...createEmptyProject(),
        settings: {
          ...defaults,
          pageSize: (project.settings.pageSize === "image" || project.settings.pageSize === "custom")
            ? defaults.pageSize
            : project.settings.pageSize,
          customWidthMm: project.settings.customWidthMm,
          customHeightMm: project.settings.customHeightMm,
          orientation: project.settings.orientation,
          fitMode: project.settings.fitMode,
          marginsMm: project.settings.marginsMm,
          quality: project.settings.quality,
          background: project.settings.background,
        },
      };
    }

    default:
      return project;
  }
}

export function computeOutputFilename(base: string): string {
  const sanitized = base
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80)
    .replace(/\.pdf$/i, "");
  return sanitized ? `${sanitized}.pdf` : `images-to-pdf-${new Date().toISOString().split("T")[0]}.pdf`;
}

export function estimatePdfSize(pages: ProjectPage[], settings: PdfSettings): { minBytes: number; maxBytes: number } {
  const preset = QUALITY_PRESETS[settings.quality] ?? QUALITY_PRESETS.balanced;
  const overhead = pages.length * 5120;

  let totalMin = 0;
  let totalMax = 0;

  for (const page of pages) {
    const pixels = page.sourceWidth * page.sourceHeight;
    const bytesPerPixel = page.format === "png" ? 4 : 3;
    const rawBytes = pixels * bytesPerPixel;
    const compressionRatio = preset.jpegQuality * 0.15;
    const compressedBytes = rawBytes * compressionRatio;
    totalMin += compressedBytes * 0.4;
    totalMax += compressedBytes * 1.8;
  }

  return {
    minBytes: Math.round(totalMin + overhead),
    maxBytes: Math.round(totalMax + overhead),
  };
}
