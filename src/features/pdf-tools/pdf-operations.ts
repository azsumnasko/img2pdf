import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { PdfDocumentInfo, OrganizerPage } from "./types";

const POINTS_PER_MM = 72 / 25.4;

export async function loadPdfDocument(file: File): Promise<PdfDocumentInfo> {
  const buffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  if (pdfDoc.isEncrypted) {
    throw new Error(`The PDF "${file.name}" is password-protected. Please remove the password before using this tool.`);
  }
  const pages: PdfDocumentInfo["pages"] = [];

  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();
    const rotation = page.getRotation().angle;
    pages.push({ pageNumber: i + 1, width, height, rotation });
  }

  return {
    name: file.name.replace(/\.pdf$/i, ""),
    pageCount: pdfDoc.getPageCount(),
    pages,
    file,
  };
}

function setAdditionalRotation(page: ReturnType<PDFDocument["getPage"]>, extraAngle: number) {
  const rot = page.getRotation();
  const newAngle = ((rot.angle + extraAngle) % 360 + 360) % 360;
  page.setRotation({ type: rot.type, angle: newAngle } as ReturnType<typeof page.getRotation>);
}

export async function mergePdfs(
  documents: PdfDocumentInfo[],
  pages?: OrganizerPage[],
  onProgress?: (current: number, total: number) => void
): Promise<Uint8Array> {
  const mergedDoc = await PDFDocument.create();

  if (pages && pages.length > 0) {
    const docCache: Map<number, PDFDocument> = new Map();
    for (let i = 0; i < pages.length; i++) {
      const p = pages[i]!;
      if (!docCache.has(p.sourceDocIndex)) {
        const file = documents[p.sourceDocIndex]!;
        const buf = await file.file.arrayBuffer();
        const loaded = await PDFDocument.load(buf, { ignoreEncryption: true });
        docCache.set(p.sourceDocIndex, loaded);
      }
      const srcDoc = docCache.get(p.sourceDocIndex)!;
      const pageIdx = p.sourcePageNumber - 1;
      if (pageIdx < srcDoc.getPageCount()) {
        const [copiedPage] = await mergedDoc.copyPages(srcDoc, [pageIdx]);
        if (copiedPage) {
          if (p.rotation !== 0) setAdditionalRotation(copiedPage, p.rotation);
          mergedDoc.addPage(copiedPage);
        }
      }
      onProgress?.(i + 1, pages.length);
    }
  } else {
    let processed = 0;
    let totalPages = 0;
    for (const doc of documents) totalPages += doc.pageCount;

    for (let d = 0; d < documents.length; d++) {
      const file = documents[d]!;
      const buf = await file.file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
      const pageIndices = Array.from({ length: srcDoc.getPageCount() }, (_, i) => i);
      const copiedPages = await mergedDoc.copyPages(srcDoc, pageIndices);
      for (const cp of copiedPages) mergedDoc.addPage(cp);
      processed += srcDoc.getPageCount();
      onProgress?.(processed, totalPages);
    }
  }

  return mergedDoc.save();
}

export async function splitPdfAllPages(
  doc: PdfDocumentInfo,
  onProgress?: (current: number, total: number) => void
): Promise<Array<{ bytes: Uint8Array; filename: string }>> {
  const buf = await doc.file.arrayBuffer();
  const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const results: Array<{ bytes: Uint8Array; filename: string }> = [];

  for (let i = 0; i < srcDoc.getPageCount(); i++) {
    const newDoc = await PDFDocument.create();
    const [copied] = await newDoc.copyPages(srcDoc, [i]);
    if (copied) newDoc.addPage(copied);
    results.push({
      bytes: await newDoc.save(),
      filename: `${doc.name}-page-${i + 1}.pdf`,
    });
    onProgress?.(i + 1, srcDoc.getPageCount());
  }

  return results;
}

export async function splitPdfByRanges(
  doc: PdfDocumentInfo,
  ranges: Array<{ start: number; end: number; label: string }>,
  onProgress?: (current: number, total: number) => void
): Promise<Array<{ bytes: Uint8Array; filename: string }>> {
  const buf = await doc.file.arrayBuffer();
  const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const results: Array<{ bytes: Uint8Array; filename: string }> = [];

  for (let r = 0; r < ranges.length; r++) {
    const range = ranges[r]!;
    if (range.start < 1 || range.end < range.start || isNaN(range.start) || isNaN(range.end)) continue;
    const newDoc = await PDFDocument.create();
    const indices = [];
    for (let p = range.start; p <= range.end && p <= srcDoc.getPageCount(); p++) {
      indices.push(p - 1);
    }
    if (indices.length === 0) continue;
    const copied = await newDoc.copyPages(srcDoc, indices);
    for (const cp of copied) newDoc.addPage(cp);
    results.push({
      bytes: await newDoc.save(),
      filename: `${doc.name}-${range.label}.pdf`,
    });
    onProgress?.(r + 1, ranges.length);
  }

  return results;
}

export async function splitPdfEveryN(
  doc: PdfDocumentInfo,
  n: number,
  onProgress?: (current: number, total: number) => void
): Promise<Array<{ bytes: Uint8Array; filename: string }>> {
  if (!Number.isFinite(n) || n < 1) n = 1;
  const buf = await doc.file.arrayBuffer();
  const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const total = srcDoc.getPageCount();
  const results: Array<{ bytes: Uint8Array; filename: string }> = [];
  const chunks = Math.ceil(total / n);

  for (let c = 0; c < chunks; c++) {
    const newDoc = await PDFDocument.create();
    const indices = [];
    for (let p = c * n; p < Math.min((c + 1) * n, total); p++) {
      indices.push(p);
    }
    const copied = await newDoc.copyPages(srcDoc, indices);
    for (const cp of copied) newDoc.addPage(cp);
    results.push({
      bytes: await newDoc.save(),
      filename: `${doc.name}-part-${c + 1}.pdf`,
    });
    onProgress?.(c + 1, chunks);
  }

  return results;
}

export async function rotatePdfPages(
  doc: PdfDocumentInfo,
  pages: OrganizerPage[],
  onProgress?: (current: number, total: number) => void
): Promise<Uint8Array> {
  const buf = await doc.file.arrayBuffer();
  const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const total = srcDoc.getPageCount();

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]!;
    const physicalPageIdx = page.sourcePageNumber - 1;
    if (page.rotation !== 0 && physicalPageIdx < total) {
      const pdfPage = srcDoc.getPage(physicalPageIdx);
      setAdditionalRotation(pdfPage, page.rotation);
    }
    onProgress?.(i + 1, pages.length);
  }

  return srcDoc.save();
}

export async function deletePdfPages(
  doc: PdfDocumentInfo,
  pagesToRemove: Set<number>,
  onProgress?: (current: number, total: number) => void
): Promise<Uint8Array> {
  const buf = await doc.file.arrayBuffer();
  const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const total = srcDoc.getPageCount();
  const newDoc = await PDFDocument.create();
  const keepIndices: number[] = [];

  for (let i = 0; i < total; i++) {
    if (!pagesToRemove.has(i)) keepIndices.push(i);
  }

  const copiedPages = await newDoc.copyPages(srcDoc, keepIndices);
  for (const cp of copiedPages) newDoc.addPage(cp);
  onProgress?.(1, 1);

  return newDoc.save();
}

export async function extractPdfPages(
  doc: PdfDocumentInfo,
  pages: number[],
  combine: boolean,
  onProgress?: (current: number, total: number) => void
): Promise<Array<{ bytes: Uint8Array; filename: string }> | Uint8Array> {
  const buf = await doc.file.arrayBuffer();
  const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });

  if (combine) {
    const newDoc = await PDFDocument.create();
    const copied = await newDoc.copyPages(srcDoc, pages);
    for (const cp of copied) newDoc.addPage(cp);
    return newDoc.save();
  }

  const results: Array<{ bytes: Uint8Array; filename: string }> = [];
  for (let i = 0; i < pages.length; i++) {
    const newDoc = await PDFDocument.create();
    const [copied] = await newDoc.copyPages(srcDoc, [pages[i]!]);
    if (copied) newDoc.addPage(copied);
    results.push({
      bytes: await newDoc.save(),
      filename: `${doc.name}-page-${pages[i]! + 1}.pdf`,
    });
    onProgress?.(i + 1, pages.length);
  }

  return results;
}

export function parsePageRanges(input: string, maxPage: number): number[] {
  const pages = new Set<number>();
  const parts = input.split(/[,\s]+/).filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");
      const start = Math.max(1, parseInt(startStr!, 10) || 1);
      const end = Math.min(maxPage, parseInt(endStr!, 10) || maxPage);
      for (let p = start; p <= end; p++) pages.add(p - 1);
    } else {
      const p = parseInt(part, 10);
      if (p >= 1 && p <= maxPage) pages.add(p - 1);
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export async function addPageNumbers(
  doc: PdfDocumentInfo,
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
  onProgress?: (current: number, total: number) => void
): Promise<Uint8Array> {
  const buf = await doc.file.arrayBuffer();
  const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const total = srcDoc.getPageCount();
  const helvetica = await srcDoc.embedFont(StandardFonts.Helvetica);
  const rgbColor = hexToRgb(settings.color);

  for (let i = 0; i < total; i++) {
    if (i + 1 < settings.startPage) continue;
    const page = srcDoc.getPage(i);
    const { width, height } = page.getSize();
    const num = settings.startNumber + (i - settings.startPage + 1);
    const text = settings.format
      .replace(/{page}/g, String(num))
      .replace(/{num}/g, String(num))
      .replace(/{total}/g, String(total));

    const textWidth = helvetica.widthOfTextAtSize(text, settings.fontSize);
    const marginPt = settings.margin * POINTS_PER_MM;
    let x: number;
    switch (settings.align) {
      case "center": x = width / 2 - textWidth / 2; break;
      case "right": x = width - marginPt - textWidth; break;
      default: x = marginPt;
    }
    const y = settings.position === "top"
      ? height - marginPt - settings.fontSize
      : marginPt + settings.fontSize * 0.5;

    page.drawText(text, {
      x, y, size: settings.fontSize,
      font: helvetica,
      color: rgb(rgbColor.r, rgbColor.g, rgbColor.b),
    });

    onProgress?.(i + 1, total);
  }

  return srcDoc.save();
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const v = parseInt(h, 16);
  if (isNaN(v)) return { r: 0, g: 0, b: 0 };
  return {
    r: ((v >> 16) & 255) / 255,
    g: ((v >> 8) & 255) / 255,
    b: (v & 255) / 255,
  };
}

export async function resizePdfPages(
  doc: PdfDocumentInfo,
  targetWidth: number,
  targetHeight: number,
  mode: "scale" | "center" | "canvas",
  onProgress?: (current: number, total: number) => void
): Promise<Uint8Array> {
  const buf = await doc.file.arrayBuffer();
  const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const total = srcDoc.getPageCount();

  for (let i = 0; i < total; i++) {
    const page = srcDoc.getPage(i);
    page.setSize(targetWidth, targetHeight);
    onProgress?.(i + 1, total);
  }

  return srcDoc.save();
}

export async function nUpPdf(
  doc: PdfDocumentInfo,
  columns: number,
  rows: number,
  outputWidth: number,
  outputHeight: number,
  padding: number,
  onProgress?: (current: number, total: number) => void
): Promise<Uint8Array> {
  if (columns < 1 || rows < 1) throw new Error("nUpPdf: columns and rows must be at least 1");
  const buf = await doc.file.arrayBuffer();
  const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const total = srcDoc.getPageCount();
  const perSheet = columns * rows;
  const sheets = Math.ceil(total / perSheet);
  const newDoc = await PDFDocument.create();

  for (let s = 0; s < sheets; s++) {
    const newPage = newDoc.addPage([outputWidth, outputHeight]);
    const cellW = (outputWidth - padding * (columns + 1)) / columns;
    const cellH = (outputHeight - padding * (rows + 1)) / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const pageIdx = s * perSheet + r * columns + c;
        if (pageIdx >= total) break;

        const srcPage = srcDoc.getPage(pageIdx);
        const srcSize = srcPage.getSize();
        const scale = Math.min(cellW / srcSize.width, cellH / srcSize.height);
        const sw = srcSize.width * scale;
        const sh = srcSize.height * scale;
        const x = padding + c * (cellW + padding) + (cellW - sw) / 2;
        const y = padding + (rows - 1 - r) * (cellH + padding) + (cellH - sh) / 2;

        const embeddedPage = await newDoc.embedPage(srcPage, undefined, [scale, 0, 0, scale, x, y]);
        newPage.drawPage(embeddedPage);
      }
    }
    onProgress?.(s + 1, sheets);
  }

  return newDoc.save();
}

export async function compressPdf(
  doc: PdfDocumentInfo,
  strategy: "safe" | "image-heavy",
  imageQuality: number,
  onProgress?: (current: number, total: number) => void
): Promise<{ bytes: Uint8Array; originalSize: number }> {
  const buf = await doc.file.arrayBuffer();
  const originalSize = buf.byteLength;

  if (strategy === "safe") {
    onProgress?.(1, 1);
    const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
    srcDoc.setProducer("Local2PDF");
    srcDoc.setCreator("Local2PDF");
    const saved = await srcDoc.save();
    return { bytes: saved, originalSize };
  }

  const { renderPageToCanvas, canvasToBlob } = await import("./pdf-renderer");
  const newDoc = await PDFDocument.create();
  newDoc.setProducer("Local2PDF");
  newDoc.setCreator("Local2PDF");

  const total = doc.pageCount;

  for (let i = 0; i < total; i++) {
    const result = await renderPageToCanvas(buf, i + 1, 1.0);
    if (result) {
      try {
        const blob = await canvasToBlob(result.canvas, "image/jpeg", imageQuality);
        const imgBytes = new Uint8Array(await blob.arrayBuffer());
        const embedded = await newDoc.embedJpg(imgBytes);
        const page = newDoc.addPage([result.width, result.height]);
        page.drawImage(embedded, { x: 0, y: 0, width: result.width, height: result.height });
      } catch {
        newDoc.addPage([612, 792]);
      }
    } else {
      newDoc.addPage([612, 792]);
    }
    onProgress?.(i + 1, total);
  }

  const saved = await newDoc.save();
  return { bytes: saved, originalSize };
}
