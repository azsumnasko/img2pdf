export type PdfTool =
  | "merge-pdf"
  | "split-pdf"
  | "rotate-pdf"
  | "reorder-pdf-pages"
  | "delete-pdf-pages"
  | "extract-pdf-pages"
  | "pdf-to-jpg"
  | "pdf-to-png"
  | "pdf-to-text"
  | "extract-images-from-pdf"
  | "add-page-numbers-to-pdf"
  | "crop-pdf"
  | "resize-pdf-pages"
  | "n-up-pdf"
  | "compress-pdf";

export type PdfToolCategory = "convert-to-pdf" | "convert-from-pdf" | "organize-pdf" | "improve-pdf";

export type PdfPageInfo = {
  pageNumber: number;
  width: number;
  height: number;
  rotation: number;
  thumbnailUrl?: string;
};

export type PdfDocumentInfo = {
  name: string;
  pageCount: number;
  pages: PdfPageInfo[];
  file: File;
};

export type OrganizerPage = {
  id: string;
  sourceDocIndex: number;
  sourcePageNumber: number;
  thumbnailUrl: string;
  rotation: 0 | 90 | 180 | 270;
  selected: boolean;
  width: number;
  height: number;
};

export type OrganizerPhase =
  | { phase: "empty" }
  | { phase: "loading" }
  | { phase: "editing"; warnings?: string[] }
  | { phase: "processing"; cancelled: boolean; progress?: { current: number; total: number; label: string } }
  | { phase: "success"; blob: Blob; objectUrl: string; bytes: number; filename: string; warnings: string[] }
  | { phase: "error"; message: string; recoverable: boolean };

export type OrganizerState = {
  documents: PdfDocumentInfo[];
  pages: OrganizerPage[];
  phase: OrganizerPhase;
};

export type PdfToImageDpi = 96 | 150 | 200 | 300;

export type PdfToImageSettings = {
  dpi: PdfToImageDpi;
  jpegQuality: number;
  background: string;
};

export type SplitMode = "all-pages" | "custom-ranges" | "every-n-pages" | "extract-selected";

export type SplitRange = { start: number; end: number; label: string };

export type PdfRenderResult = {
  canvas: HTMLCanvasElement;
  pageNumber: number;
  width: number;
  height: number;
};
