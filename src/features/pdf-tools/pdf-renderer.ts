import type { PdfRenderResult } from "./types";

let pdfjsPromise: Promise<typeof import("pdfjs-dist")> | null = null;

async function getPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist").then((m) => {
      try {
        m.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${m.version}/pdf.worker.min.mjs`;
      } catch {
        m.GlobalWorkerOptions.workerSrc = "";
      }
      return m;
    });
  }
  return pdfjsPromise;
}

async function loadPdfDocument(pdfBuffer: ArrayBuffer) {
  const pdfjs = await getPdfjs();
  const loadingTask = pdfjs.getDocument({ data: pdfBuffer });
  return loadingTask.promise;
}

export async function renderPageToCanvas(
  pdfBuffer: ArrayBuffer,
  pageNumber: number,
  scale: number = 1.5,
  pdfDoc?: Awaited<ReturnType<typeof loadPdfDocument>>
): Promise<PdfRenderResult | null> {
  try {
    const doc = pdfDoc ?? (await loadPdfDocument(pdfBuffer));
    const page = await doc.getPage(pageNumber);

    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;

    await page.render({ canvasContext: ctx, viewport }).promise;

    return {
      canvas,
      pageNumber,
      width: viewport.width,
      height: viewport.height,
    };
  } catch {
    return null;
  }
}

export async function getPdfPageCount(pdfBuffer: ArrayBuffer): Promise<number> {
  try {
    const doc = await loadPdfDocument(pdfBuffer);
    return doc.numPages;
  } catch {
    return 0;
  }
}

export async function renderPagesToCanvas(
  pdfBuffer: ArrayBuffer,
  pages: number[],
  scale: number = 1.5,
  onProgress?: (current: number, total: number) => void
): Promise<Map<number, PdfRenderResult>> {
  const results = new Map<number, PdfRenderResult>();

  try {
    const doc = await loadPdfDocument(pdfBuffer);

    for (let i = 0; i < pages.length; i++) {
      const result = await renderPageToCanvas(pdfBuffer, pages[i]!, scale, doc);
      if (result) results.set(pages[i]!, result);
      onProgress?.(i + 1, pages.length);
    }
  } catch {
    /* PDF loading failed entirely, all pages will return null below */
  }

  return results;
}

export async function extractPdfText(pdfBuffer: ArrayBuffer): Promise<Array<{ pageNumber: number; text: string }>> {
  try {
    const doc = await loadPdfDocument(pdfBuffer);
    const results: Array<{ pageNumber: number; text: string }> = [];

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const text = content.items
        .filter((item) => "str" in item)
        .map((item) => (item as { str: string }).str)
        .join(" ");
      results.push({ pageNumber: i, text });
    }

    return results;
  } catch {
    return [];
  }
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: "image/jpeg" | "image/png", quality: number = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas toBlob failed"));
    }, type, quality);
  });
}


