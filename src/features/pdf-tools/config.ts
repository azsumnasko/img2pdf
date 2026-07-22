import type { PdfToolCategory, PdfTool } from "./types";

export const PDF_TOOL_META: Record<PdfTool, {
  title: string;
  h1: string;
  description: string;
  category: PdfToolCategory;
  icon: string;
  path: string;
}> = {
  "merge-pdf": {
    title: "Merge PDF Locally — Private, No Upload | LocalPDF",
    h1: "Merge PDF Files Locally",
    description: "Combine PDF files directly in your browser. Reorder documents, merge them privately and download one PDF — no upload, signup or watermark.",
    category: "organize-pdf",
    icon: "merge",
    path: "/tools/merge-pdf",
  },
  "split-pdf": {
    title: "Split PDF Locally — Separate Pages Without Upload | LocalPDF",
    h1: "Split PDF Files Locally",
    description: "Split a PDF into individual pages or custom ranges directly in your browser. No file upload, no signup required.",
    category: "organize-pdf",
    icon: "split",
    path: "/tools/split-pdf",
  },
  "rotate-pdf": {
    title: "Rotate PDF Pages Locally — Private & Free | LocalPDF",
    h1: "Rotate PDF Pages Locally",
    description: "Rotate PDF pages left, right or 180°. All processing happens in your browser — no upload, no signup.",
    category: "organize-pdf",
    icon: "rotate",
    path: "/tools/rotate-pdf",
  },
  "reorder-pdf-pages": {
    title: "Reorder PDF Pages Locally — Drag, Sort & Save | LocalPDF",
    h1: "Reorder PDF Pages",
    description: "Rearrange PDF pages by dragging. Organize your document and download — all in your browser. No upload or signup.",
    category: "organize-pdf",
    icon: "reorder",
    path: "/tools/reorder-pdf-pages",
  },
  "delete-pdf-pages": {
    title: "Delete PDF Pages Locally — Remove Pages Free | LocalPDF",
    h1: "Delete PDF Pages Locally",
    description: "Remove unwanted pages from a PDF directly in your browser. No upload, no signup, no watermark.",
    category: "organize-pdf",
    icon: "delete",
    path: "/tools/delete-pdf-pages",
  },
  "extract-pdf-pages": {
    title: "Extract PDF Pages Locally — Private & Free | LocalPDF",
    h1: "Extract PDF Pages Locally",
    description: "Extract selected pages from a PDF and create a new document. Works entirely in your browser — no upload required.",
    category: "organize-pdf",
    icon: "extract",
    path: "/tools/extract-pdf-pages",
  },
  "pdf-to-jpg": {
    title: "PDF to JPG Locally — No Upload, High Quality | LocalPDF",
    h1: "Convert PDF to JPG Locally",
    description: "Render PDF pages as JPG images in your browser. Choose resolution and quality — no file upload, signup or watermark.",
    category: "convert-from-pdf",
    icon: "jpg",
    path: "/tools/pdf-to-jpg",
  },
  "pdf-to-png": {
    title: "PDF to PNG Locally — No Upload, Lossless Quality | LocalPDF",
    h1: "Convert PDF to PNG Locally",
    description: "Render PDF pages as PNG images locally. Perfect for diagrams, text and screenshots. No upload, signup or watermark.",
    category: "convert-from-pdf",
    icon: "png",
    path: "/tools/pdf-to-png",
  },
  "pdf-to-text": {
    title: "PDF to Text Locally — Extract Text Without Upload | LocalPDF",
    h1: "Extract Text from PDF Locally",
    description: "Extract text from PDF files directly in your browser. Fast extraction from text-based PDFs — no upload, no signup.",
    category: "convert-from-pdf",
    icon: "text",
    path: "/tools/pdf-to-text",
  },
  "extract-images-from-pdf": {
    title: "Extract Images from PDF Locally — No Upload | LocalPDF",
    h1: "Extract Images from PDF Locally",
    description: "Save embedded images from a PDF. All processing happens in your browser — no file upload or signup required.",
    category: "convert-from-pdf",
    icon: "images",
    path: "/tools/extract-images-from-pdf",
  },
  "add-page-numbers-to-pdf": {
    title: "Add Page Numbers to PDF Locally — Free & Private | LocalPDF",
    h1: "Add Page Numbers to PDF Locally",
    description: "Add custom page numbers to your PDF documents. Choose position, format and style — no upload, no signup.",
    category: "improve-pdf",
    icon: "numbers",
    path: "/tools/add-page-numbers-to-pdf",
  },
  "crop-pdf": {
    title: "Crop PDF Pages Locally — Trim Margins Free | LocalPDF",
    h1: "Crop PDF Pages Locally",
    description: "Crop or trim PDF pages directly in your browser. Remove margins, resize pages — no upload, no signup.",
    category: "improve-pdf",
    icon: "crop",
    path: "/tools/crop-pdf",
  },
  "resize-pdf-pages": {
    title: "Resize PDF Pages Locally — Change Page Size Free | LocalPDF",
    h1: "Resize PDF Pages Locally",
    description: "Change PDF paper size, scale or center content. Convert between A4, Letter, and custom sizes — all in your browser.",
    category: "improve-pdf",
    icon: "resize",
    path: "/tools/resize-pdf-pages",
  },
  "n-up-pdf": {
    title: "N-Up PDF Locally — Multiple Pages Per Sheet | LocalPDF",
    h1: "N-Up PDF Locally",
    description: "Place multiple PDF pages on one sheet for printing. Save paper with 2-up, 4-up, or 6-up layouts — no upload.",
    category: "improve-pdf",
    icon: "nup",
    path: "/tools/n-up-pdf",
  },
  "compress-pdf": {
    title: "Compress PDF Locally — Reduce File Size | LocalPDF",
    h1: "Compress PDF Locally (Beta)",
    description: "Reduce PDF file size directly in your browser. Safe optimization preserves quality — no upload, no signup.",
    category: "improve-pdf",
    icon: "compress",
    path: "/tools/compress-pdf",
  },
};

export const PDF_TOOL_CATEGORIES: Record<PdfToolCategory, { name: string; description: string }> = {
  "convert-to-pdf": { name: "Convert to PDF", description: "Turn images into PDF documents" },
  "convert-from-pdf": { name: "Convert from PDF", description: "Export PDF content to other formats" },
  "organize-pdf": { name: "Organize PDF", description: "Merge, split, and rearrange pages" },
  "improve-pdf": { name: "Improve and Prepare PDF", description: "Add page numbers, crop, resize, and compress" },
};

export const CATEGORY_TOOLS: Record<PdfToolCategory, PdfTool[]> = {
  "convert-to-pdf": [],
  "convert-from-pdf": ["pdf-to-jpg", "pdf-to-png", "pdf-to-text", "extract-images-from-pdf"],
  "organize-pdf": ["merge-pdf", "split-pdf", "rotate-pdf", "reorder-pdf-pages", "delete-pdf-pages", "extract-pdf-pages"],
  "improve-pdf": ["add-page-numbers-to-pdf", "crop-pdf", "resize-pdf-pages", "n-up-pdf", "compress-pdf"],
};
