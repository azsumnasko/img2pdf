import { buildPdf } from "../features/image-to-pdf/pdf-builder";
import type { ProjectPage, PdfSettings } from "../features/image-to-pdf/types";

type WorkerMessage = {
  type: "convert";
  jobId: string;
  pages: ProjectPage[];
  settings: PdfSettings;
};

type ProgressMessage = {
  type: "progress";
  jobId: string;
  phase: string;
  current: number;
  total: number;
};

type ResultMessage = {
  type: "result";
  jobId: string;
  pdfBytes: ArrayBuffer;
  pageCount: number;
  warnings: string[];
};

type ErrorMessage = {
  type: "error";
  jobId: string;
  errorCode: string;
  message: string;
};

let currentJobId: string | null = null;
let cancelled = false;

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const msg = e.data;

  if (msg.type === "convert") {
    currentJobId = msg.jobId;
    cancelled = false;

    try {
      const { pdfBytes, warnings } = await buildPdf(
        msg.pages,
        msg.settings,
        undefined,
        (current, total, phase) => {
          if (cancelled) return;
          const progressMsg: ProgressMessage = {
            type: "progress",
            jobId: msg.jobId,
            phase,
            current,
            total,
          };
          self.postMessage(progressMsg);
        }
      );

      if (cancelled) return;

      const resultMsg: ResultMessage = {
        type: "result",
        jobId: msg.jobId,
        pdfBytes: (pdfBytes.buffer as ArrayBuffer).slice(
          pdfBytes.byteOffset,
          pdfBytes.byteOffset + pdfBytes.byteLength
        ),
        pageCount: msg.pages.length,
        warnings,
      };
      self.postMessage(resultMsg);
    } catch (err) {
      if (cancelled) return;
      const errorMsg: ErrorMessage = {
        type: "error",
        jobId: msg.jobId,
        errorCode: "CONVERSION_FAILED",
        message: err instanceof Error ? err.message : "Conversion failed",
      };
      self.postMessage(errorMsg);
    }
  }
};

export {};
