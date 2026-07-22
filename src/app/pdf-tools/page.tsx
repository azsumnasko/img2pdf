import type { Metadata } from "next";
import Link from "next/link";
import { PDF_TOOL_META, PDF_TOOL_CATEGORIES, CATEGORY_TOOLS } from "@/features/pdf-tools/config";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import type { PdfToolCategory } from "@/features/pdf-tools/types";

export const metadata: Metadata = {
  title: "All PDF Tools — Edit, Convert & Organize PDFs Locally | LocalPDF",
  description:
    "Free PDF tools that work entirely in your browser. Merge, split, rotate, compress, and convert PDFs. No upload, no signup, no watermark.",
  alternates: { canonical: "https://local2pdf.com/pdf-tools" },
  openGraph: {
    title: "All PDF Tools — Edit, Convert & Organize PDFs Locally | LocalPDF",
    description: "Free PDF tools that work locally in your browser. Merge, split, convert, and compress PDFs without uploading.",
    url: "https://local2pdf.com/pdf-tools",
    type: "website",
  },
};

export default function PdfToolsHubPage() {
  const categories: PdfToolCategory[] = ["organize-pdf", "convert-from-pdf", "improve-pdf"];

  return (
    <main className="tools-hub">
      <h1>Free PDF Tools — Private, No Upload</h1>
      <p className="tools-hub-intro">
        Every PDF tool on LocalPDF works entirely in your browser. No files are ever uploaded to our servers.
        Merge, split, rotate, convert, compress — all locally processed and completely free.
      </p>
      <PrivacyBadge />

      {categories.map((cat) => {
        const catInfo = PDF_TOOL_CATEGORIES[cat];
        const tools = CATEGORY_TOOLS[cat];
        if (tools.length === 0) return null;

        return (
          <section key={cat} className="tools-category">
            <h2>{catInfo.name}</h2>
            <p className="tools-category-desc">{catInfo.description}</p>
            <div className="tools-category-grid">
              {tools.map((toolId) => {
                const meta = PDF_TOOL_META[toolId];
                if (!meta) return null;
                return (
                  <Link key={toolId} href={meta.path} className="tool-hub-card">
                    <h3>{meta.h1}</h3>
                    <p>{meta.description}</p>
                    <span className="privacy-indicator">Processed on your device</span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="tools-category">
        <h2>Convert Images to PDF</h2>
        <p className="tools-category-desc">Turn your images into PDF documents</p>
        <div className="tools-category-grid">
          <Link href="/tools/image-to-pdf" className="tool-hub-card">
            <h3>Images to PDF</h3>
            <p>Combine JPG, PNG, WebP, and HEIC images into one PDF</p>
            <span className="privacy-indicator">Processed on your device</span>
          </Link>
          <Link href="/tools/jpg-to-pdf" className="tool-hub-card">
            <h3>JPG to PDF</h3>
            <p>Convert JPEG images to PDF format</p>
            <span className="privacy-indicator">Processed on your device</span>
          </Link>
          <Link href="/tools/png-to-pdf" className="tool-hub-card">
            <h3>PNG to PDF</h3>
            <p>Convert PNG images to PDF format</p>
            <span className="privacy-indicator">Processed on your device</span>
          </Link>
          <Link href="/tools/webp-to-pdf" className="tool-hub-card">
            <h3>WebP to PDF</h3>
            <p>Convert WebP images to PDF format</p>
            <span className="privacy-indicator">Processed on your device</span>
          </Link>
          <Link href="/tools/heic-to-pdf" className="tool-hub-card">
            <h3>HEIC to PDF</h3>
            <p>Convert HEIC images from iPhone to PDF</p>
            <span className="privacy-indicator">Processed on your device</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
