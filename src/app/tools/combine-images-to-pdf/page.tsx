import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export default function CombineImagesPage() {
  return (
    <main className="content-page">
      <h1>Combine Images into PDF — Free, Private, No Upload</h1>
      <p>Merge multiple JPG, PNG, WebP, or HEIC images into a single PDF document. Drag and drop to reorder pages, rotate images, and choose page size and margins.</p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">Combine images into PDF now</Link>
      </div>
      <h2>How to Combine Images into One PDF</h2>
      <ol>
        <li>Select up to 25 images from your device</li>
        <li>Drag to arrange them in the correct order</li>
        <li>Choose paper size, orientation, and margins</li>
        <li>Click Convert — the combined PDF downloads instantly</li>
      </ol>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Add images of any supported format — JPG, PNG, WebP, or HEIC — into the tool</li>
          <li>Drag to arrange pages in the correct order and rotate images as needed</li>
          <li>All processing happens locally in your browser — your combined PDF downloads instantly, never uploaded</li>
        </ol>
      </section>
      <section>
        <h2>Why Combine Images into One PDF</h2>
        <ul>
          <li><strong>Multi-page documents:</strong> Merge related images into a single, organized PDF file for easy sharing via email or messaging.</li>
          <li><strong>Presentations and reports:</strong> Combine charts, photos, and screenshots into one cohesive document ready for print or digital distribution.</li>
        </ul>
      </section>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf">Open the converter</Link> |{" "}
        <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
        <Link href="/tools/png-to-pdf">PNG to PDF</Link> |{" "}
        <Link href="/tools/heic-to-pdf">HEIC to PDF</Link>
      </p>
    </main>
  );
}
