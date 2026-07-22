import { PDFDocument } from "pdf-lib";
import type { ProjectPage, PdfSettings, RotationDegrees, SupportedImageFormat } from "./types";
import { computeImagePlacement, computeDownscaleFactor } from "./geometry";
import { QUALITY_PRESETS } from "./config";
import { parseExifOrientation, applyExifOrientation, type ExifOrientation } from "./exif-reader";
import { isSafariHeicSupported, decodeHeicToCanvas } from "./heic-decoder";

const MIME_MAP: Record<SupportedImageFormat, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  heic: "image/heic",
};

async function decodeImage(
  file: File,
  format: SupportedImageFormat,
  rotationDegrees: RotationDegrees
): Promise<{ canvas: OffscreenCanvas | HTMLCanvasElement; manualRotation: RotationDegrees } | null> {
  try {
    let img: HTMLImageElement;
    let heicCanvas: OffscreenCanvas | HTMLCanvasElement | null = null;

    if (format === "heic") {
      if (isSafariHeicSupported()) {
        const url = URL.createObjectURL(file);
        try {
          img = await new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = url;
          });
        } finally {
          URL.revokeObjectURL(url);
        }
      } else {
        heicCanvas = await decodeHeicToCanvas(file);
        if (!heicCanvas) return null;
        return { canvas: heicCanvas, manualRotation: rotationDegrees };
      }
    } else {
      const url = URL.createObjectURL(file);
      try {
        img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = url;
        });
      } finally {
        URL.revokeObjectURL(url);
      }
    }

    let exifOrientation: ExifOrientation = 1;
    if (format === "jpeg") {
      try {
        const buf = await file.slice(0, 65536).arrayBuffer();
        exifOrientation = parseExifOrientation(buf);
      } catch { /* ignore */ }
    }

    const nw = (img!).naturalWidth;
    const nh = (img!).naturalHeight;

    let cw = nw;
    let ch = nh;
    if (exifOrientation >= 5 && exifOrientation <= 8) [cw, ch] = [ch, cw];

    const useOffscreen = typeof OffscreenCanvas !== "undefined";
    const canvas = useOffscreen ? new OffscreenCanvas(cw, ch) : document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

    applyExifOrientation(ctx, exifOrientation, nw, nh);
    ctx.drawImage(img!, 0, 0, nw, nh);

    return { canvas, manualRotation: rotationDegrees };
  } catch {
    return null;
  }
}

function resizeCanvas(
  source: OffscreenCanvas | HTMLCanvasElement,
  outW: number,
  outH: number,
  background: string
): OffscreenCanvas | HTMLCanvasElement {
  const useOffscreen = typeof OffscreenCanvas !== "undefined";
  const canvas = useOffscreen ? new OffscreenCanvas(outW, outH) : document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, outW, outH);
  ctx.drawImage(source as any, 0, 0, outW, outH);
  return canvas;
}

function applyManualRotation(
  source: OffscreenCanvas | HTMLCanvasElement,
  rotation: RotationDegrees
): OffscreenCanvas | HTMLCanvasElement {
  if (rotation === 0) return source;

  const sw = source.width;
  const sh = source.height;
  const swapped = rotation === 90 || rotation === 270;
  const cw = swapped ? sh : sw;
  const ch = swapped ? sw : sh;

  const useOffscreen = typeof OffscreenCanvas !== "undefined";
  const canvas = useOffscreen ? new OffscreenCanvas(cw, ch) : document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

  ctx.translate(cw / 2, ch / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(source as any, -sw / 2, -sh / 2);

  return canvas;
}

function canvasToBytes(
  canvas: OffscreenCanvas | HTMLCanvasElement,
  mime: string,
  quality: number
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    if (canvas instanceof OffscreenCanvas) {
      canvas
        .convertToBlob({ type: mime, quality })
        .then((blob) => blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf))))
        .catch(reject);
    } else {
      canvas.toBlob(
        (blob) =>
          blob ? blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf))) : reject(new Error("encode failed")),
        mime,
        quality
      );
    }
  });
}

async function processPage(
  page: ProjectPage,
  settings: PdfSettings,
  signal?: AbortSignal
): Promise<{
  imageBytes: Uint8Array;
  x: number;
  y: number;
  renderWidth: number;
  renderHeight: number;
  pageWidth: number;
  pageHeight: number;
  mime: string;
} | null> {
  if (signal?.aborted) return null;

  const decoded = await decodeImage(page.file, page.format, page.rotationDegrees);
  if (!decoded || signal?.aborted) return null;

  let renderSource = decoded.canvas;
  renderSource = applyManualRotation(renderSource, decoded.manualRotation);
  if (signal?.aborted) return null;

  const sw = renderSource.width;
  const sh = renderSource.height;

  const effectiveOrientation = page.orientationOverride ?? settings.orientation;

  const placement = computeImagePlacement(
    sw, sh, settings.pageSize, effectiveOrientation, settings.fitMode, settings.marginsMm,
    settings.customWidthMm, settings.customHeightMm
  );

  const qualityPreset = QUALITY_PRESETS[settings.quality];
  let dsf = 1;
  if (qualityPreset && settings.quality !== "original") {
    dsf = computeDownscaleFactor(sw, sh, qualityPreset.targetDpi, placement.renderWidth, placement.renderHeight);
  }

  const outW = Math.max(Math.round(sw * dsf), 1);
  const outH = Math.max(Math.round(sh * dsf), 1);

  const isPng = page.format === "png" && settings.quality === "original";
  const mime = isPng ? "image/png" : "image/jpeg";
  const jpegQ = settings.quality === "original" ? 0.92 : qualityPreset?.jpegQuality ?? 0.82;

  const resized = resizeCanvas(renderSource, outW, outH, settings.background);
  const imageBytes = await canvasToBytes(resized, mime, jpegQ);

  return {
    imageBytes,
    x: placement.x,
    y: placement.y,
    renderWidth: placement.renderWidth,
    renderHeight: placement.renderHeight,
    pageWidth: placement.pageWidth,
    pageHeight: placement.pageHeight,
    mime,
  };
}

export async function buildPdf(
  pages: ProjectPage[],
  settings: PdfSettings,
  signal?: AbortSignal,
  onProgress?: (current: number, total: number, phase: string) => void
): Promise<{ pdfBytes: Uint8Array; warnings: string[]; actualPageCount: number }> {
  const pdfDoc = await PDFDocument.create();
  const warnings: string[] = [];
  let actualPageCount = 0;

  pdfDoc.setProducer("LocalPDF");
  pdfDoc.setCreator("LocalPDF web app");

  for (let i = 0; i < pages.length; i++) {
    if (signal?.aborted) break;

    const page = pages[i]!;
    onProgress?.(i, pages.length, "Processing images");

    try {
      const processed = await processPage(page, settings, signal);
      if (signal?.aborted) break;
      if (!processed) {
        warnings.push(`Page ${i + 1} could not be processed.`);
        continue;
      }

      const embedded =
        processed.mime === "image/png"
          ? await pdfDoc.embedPng(processed.imageBytes)
          : await pdfDoc.embedJpg(processed.imageBytes);

      const pdfPage = pdfDoc.addPage([processed.pageWidth, processed.pageHeight]);
      pdfPage.drawImage(embedded, { x: processed.x, y: processed.y, width: processed.renderWidth, height: processed.renderHeight });
      actualPageCount++;
    } catch (err) {
      warnings.push(`Page ${i + 1} failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  }

  if (signal?.aborted) return { pdfBytes: new Uint8Array(), warnings: [...warnings, "Conversion cancelled"], actualPageCount: 0 };

  onProgress?.(pages.length, pages.length, "Building PDF");
  const pdfBytes = await pdfDoc.save();
  return { pdfBytes, warnings, actualPageCount };
}
