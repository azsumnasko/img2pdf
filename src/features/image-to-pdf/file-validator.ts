import type { SupportedImageFormat, ValidationError } from "./types";
import { SUPPORTED_MIME_TYPES, SUPPORTED_EXTENSIONS, DEFAULT_CONFIG } from "./config";
import { checkMagicBytes } from "./magic-bytes";

export type ValidationResult = {
  format: SupportedImageFormat;
  width: number;
  height: number;
};

let cachedConfig = { ...DEFAULT_CONFIG };

export function setValidationConfig(config: typeof cachedConfig) {
  cachedConfig = { ...config };
}

function getExtension(filename: string): string {
  const idx = filename.lastIndexOf(".");
  if (idx === -1) return "";
  return filename.slice(idx).toLowerCase();
}

function getFormatFromMime(mime: string): SupportedImageFormat | null {
  const lowered = mime.toLowerCase();
  for (const [key, format] of Object.entries(SUPPORTED_MIME_TYPES)) {
    if (lowered === key) return format as SupportedImageFormat;
  }
  if (lowered === "image/jpg") return "jpeg";
  return null;
}

export async function validateFile(
  file: File,
  index: number,
  currentTotalBytes: number
): Promise<{ result?: ValidationResult; error?: ValidationError }> {
  const config = cachedConfig;

  if (file.size === 0) {
    return {
      error: {
        fileIndex: index,
        fileName: file.name,
        errorCode: "EMPTY_FILE",
        message: "This file is empty and cannot be converted.",
      },
    };
  }

  if (file.size > config.maxFileBytes) {
    return {
      error: {
        fileIndex: index,
        fileName: file.name,
        errorCode: "FILE_TOO_LARGE",
        message: `This file exceeds the ${Math.round(config.maxFileBytes / 1_000_000)}MB size limit.`,
      },
    };
  }

  if (currentTotalBytes + file.size > config.maxTotalInputBytes) {
    return {
      error: {
        fileIndex: index,
        fileName: file.name,
        errorCode: "TOTAL_INPUT_TOO_LARGE",
        message: "Adding this file would exceed the total size limit.",
      },
    };
  }

  const mime = file.type || "";
  let format = getFormatFromMime(mime);

  if (!format) {
    const ext = getExtension(file.name);
    if (ext === ".jpg" || ext === ".jpeg") format = "jpeg";
    else if (ext === ".png") format = "png";
    else if (ext === ".webp") format = "webp";
    else if (ext === ".heic" || ext === ".heif") format = "heic";
  }

  if (!format) {
    return {
      error: {
        fileIndex: index,
        fileName: file.name,
        errorCode: "UNSUPPORTED_MIME",
        message: "This file format is not supported. Please use JPG, PNG, WebP, or HEIC images.",
      },
    };
  }

  if (format === "heic" && !config.enableHeic) {
    return {
      error: {
        fileIndex: index,
        fileName: file.name,
        errorCode: "HEIC_DECODER_UNAVAILABLE",
        message: "HEIC images are not yet supported.",
      },
    };
  }

  const magicOk = await checkMagicBytes(file, format);
  if (!magicOk) {
    return {
      error: {
        fileIndex: index,
        fileName: file.name,
        errorCode: "SIGNATURE_MISMATCH",
        message: "This file does not match its expected image format.",
      },
    };
  }

  let width = 0;
  let height = 0;

  try {
    if (format === "heic") {
      // Try native Image() first (Safari). Fall back to placeholder (WASM path).
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      const loaded = await new Promise<boolean>((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = objectUrl;
      });
      URL.revokeObjectURL(objectUrl);

      if (loaded) {
        width = img.naturalWidth;
        height = img.naturalHeight;
      } else {
        return { error: { fileIndex: index, fileName: file.name, errorCode: "DECODE_FAILED", message: "Could not decode HEIC image. Try in Safari or convert to JPG/PNG first." } };
      }
    } else {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      const loaded = await new Promise<boolean>((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = objectUrl;
      });
      URL.revokeObjectURL(objectUrl);

      if (!loaded) {
        return {
          error: {
            fileIndex: index,
            fileName: file.name,
            errorCode: "DECODE_FAILED",
            message: "This image could not be decoded. It may be corrupted.",
          },
        };
      }

      width = img.naturalWidth;
      height = img.naturalHeight;
    }
  } catch {
    return {
      error: {
        fileIndex: index,
        fileName: file.name,
        errorCode: "DECODE_FAILED",
        message: "This image could not be decoded. It may be corrupted.",
      },
    };
  }

  if (width * height > config.maxSourcePixels) {
    return {
      error: {
        fileIndex: index,
        fileName: file.name,
        errorCode: "PIXEL_LIMIT_EXCEEDED",
        message:
          "This image has too many pixels. Please use a smaller image.",
      },
    };
  }

  return {
    result: { format, width, height },
  };
}

export async function validateFiles(
  files: FileList | File[]
): Promise<{
  valid: ValidationResult[];
  errors: ValidationError[];
}> {
  const fileArray = Array.from(files);
  const valid: (ValidationResult & { file: File })[] = [];
  const errors: ValidationError[] = [];
  let totalBytes = 0;

  for (let i = 0; i < fileArray.length; i++) {
    const file = fileArray[i]!;
    const { result, error } = await validateFile(file, i, totalBytes);

    if (error) {
      errors.push(error);
    } else if (result) {
      if (valid.length < cachedConfig.maxPagesPerJob) {
        valid.push({ ...result, file });
        totalBytes += file.size;
      } else {
        errors.push({
          fileIndex: i,
          fileName: file.name,
          errorCode: "TOO_MANY_FILES",
          message: `This conversion supports up to ${cachedConfig.maxPagesPerJob} pages.`,
        });
      }
    }
  }

  return {
    valid: valid.map((v) => ({ format: v.format, width: v.width, height: v.height })),
    errors,
  };
}

export function checkPageLimit(
  currentCount: number,
  newCount: number,
  maxPages: number
): boolean {
  return currentCount + newCount <= maxPages;
}
