export type SupportedImageFormat = "jpeg" | "png" | "webp" | "heic";

export type PageSizePreset = "a4" | "a3" | "a5" | "letter" | "legal" | "image" | "custom";
export type PageOrientation = "auto" | "portrait" | "landscape";
export type FitMode = "contain" | "cover";
export type QualityPreset = "original" | "balanced" | "small";
export type MarginPreset = "none" | "small" | "normal" | "large";

export type RotationDegrees = 0 | 90 | 180 | 270;

export type CropRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ProjectPage = {
  id: string;
  file: File;
  format: SupportedImageFormat;
  sourceWidth: number;
  sourceHeight: number;
  sourceBytes: number;
  exifOrientation?: number;
  rotationDegrees: RotationDegrees;
  selected: boolean;
  orientationOverride?: PageOrientation;
  crop?: CropRect;
  thumbnailUrl: string;
  status: "ready" | "invalid" | "processing" | "error";
  localErrorCode?: string;
};

export type PdfSettings = {
  pageSize: PageSizePreset;
  customWidthMm?: number;
  customHeightMm?: number;
  orientation: PageOrientation;
  fitMode: FitMode;
  marginsMm: { top: number; right: number; bottom: number; left: number };
  background: string;
  quality: QualityPreset;
  jpegQuality?: number;
  stripMetadata: boolean;
};

export type ConversionResult = {
  blob: Blob;
  objectUrl: string;
  bytes: number;
  pageCount: number;
  durationMs: number;
  warnings: string[];
};

export type ValidationError = {
  fileIndex: number;
  fileName: string;
  errorCode: string;
  message: string;
};

export type ConversionProgress = {
  current: number;
  total: number;
  phase: string;
};

export type ToolState =
  | { phase: "empty" }
  | { phase: "validating" }
  | { phase: "editing"; validationWarnings?: ValidationError[] }
  | { phase: "converting"; jobId: string; cancelled: boolean; progress?: ConversionProgress }
  | { phase: "success"; result: ConversionResult }
  | { phase: "error"; errors: ValidationError[]; recoverable: boolean };

export type Project = {
  pages: ProjectPage[];
  settings: PdfSettings;
  outputFilename: string;
  state: ToolState;
  activePageIndex: number | null;
};

export type AppConfig = {
  maxPagesPerJob: number;
  maxFileBytes: number;
  maxTotalInputBytes: number;
  maxSourcePixels: number;
  maxOutputPdfBytesSoft: number;
  maxOutputPdfBytesHard: number;
  enableHeic: boolean;
  enableCrop: boolean;
  enableClipboard: boolean;
  enablePwa: boolean;
  enableNativeShare: boolean;
  enableAds: boolean;
  enableAnalytics: boolean;
  defaultQuality: QualityPreset;
  defaultPageSize: PageSizePreset;
  defaultOrientation: PageOrientation;
  defaultFitMode: FitMode;
  defaultMargins: MarginPreset;
  locale: string;
};

export type WorkerMessage =
  | { type: "convert"; jobId: string; pages: ProjectPage[]; settings: PdfSettings; signal?: AbortSignal }
  | { type: "cancel"; jobId: string };

export type WorkerProgress = {
  type: "progress";
  jobId: string;
  current: number;
  total: number;
  phase: string;
};

export type WorkerResult = {
  type: "result";
  jobId: string;
  pdfBytes: ArrayBuffer;
  pageCount: number;
  warnings: string[];
};

export type WorkerError = {
  type: "error";
  jobId: string;
  errorCode: string;
  message: string;
};
