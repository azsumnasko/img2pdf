import type { AppConfig } from "./types";

export const DEFAULT_CONFIG: AppConfig = {
  maxPagesPerJob: 25,
  maxFileBytes: 25_000_000,
  maxTotalInputBytes: 100_000_000,
  maxSourcePixels: 60_000_000,
  maxOutputPdfBytesSoft: 40_000_000,
  maxOutputPdfBytesHard: 100_000_000,
  enableHeic: true,
  enableCrop: false,
  enableClipboard: true,
  enablePwa: true,
  enableNativeShare: false,
  enableAds: false,
  enableAnalytics: false,
  defaultQuality: "balanced",
  defaultPageSize: "a4",
  defaultOrientation: "auto",
  defaultFitMode: "contain",
  defaultMargins: "normal",
  locale: "en",
};

export const SUPPORTED_MIME_TYPES: Record<string, string> = {
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heic",
};

export const SUPPORTED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".heif",
]);

export const PAGE_SIZE_DIMENSIONS: Record<string, { widthMm: number; heightMm: number }> = {
  a4: { widthMm: 210, heightMm: 297 },
  a3: { widthMm: 297, heightMm: 420 },
  a5: { widthMm: 148, heightMm: 210 },
  letter: { widthMm: 215.9, heightMm: 279.4 },
  legal: { widthMm: 215.9, heightMm: 355.6 },
};

export const MARGIN_PRESETS: Record<string, { top: number; right: number; bottom: number; left: number }> = {
  none: { top: 0, right: 0, bottom: 0, left: 0 },
  small: { top: 5, right: 5, bottom: 5, left: 5 },
  normal: { top: 10, right: 10, bottom: 10, left: 10 },
  large: { top: 20, right: 20, bottom: 20, left: 20 },
};

export const QUALITY_PRESETS = {
  original: { targetDpi: 300, jpegQuality: 0.92 },
  balanced: { targetDpi: 200, jpegQuality: 0.82 },
  small: { targetDpi: 130, jpegQuality: 0.68 },
};

export const MM_PER_INCH = 25.4;
export const POINTS_PER_INCH = 72;
export const POINTS_PER_MM = POINTS_PER_INCH / MM_PER_INCH;

export const THUMBNAIL_MAX_DIMENSION = 512;

export const CUSTOM_PAGE_MIN_MM = 10;
export const CUSTOM_PAGE_MAX_MM = 1000;
