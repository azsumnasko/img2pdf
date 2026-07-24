import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export default function JpgToPdfPage() {
  return (
    <main className="content-page">
      <h1>Convert JPG to PDF — Free, Private, No Upload</h1>
      <p>Convert your JPEG photos and images to PDF directly in your browser. No files are ever uploaded. Free for up to 25 pages per conversion, unlimited conversions.</p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">Start converting JPG to PDF</Link>
      </div>
      <h2>How to Convert JPG to PDF</h2>
      <ol>
        <li><strong>Select your JPEG images</strong> — click, drag and drop, or paste from clipboard</li>
        <li><strong>Arrange pages</strong> — drag to reorder, rotate if needed</li>
        <li><strong>Choose settings</strong> — page size (A4, US Letter, fit to image), margins, quality</li>
        <li><strong>Convert and download</strong> — your PDF is built on your device, never uploaded</li>
      </ol>
      <h2>JPEG Quality and File Size</h2>
      <p>Local2PDF preserves your JPEG images at high quality. Choose the Balanced preset for a good trade-off between quality and file size, Original for the highest fidelity, or Small File to minimize the PDF size for sharing via email or messaging apps.</p>
      <h2>Why Convert JPG to PDF?</h2>
      <p>PDF is the standard format for document sharing. Converting JPG images to PDF ensures they display consistently across all devices, preserve their layout, and can be easily printed, shared, or archived. Unlike individual image files, a PDF keeps multiple pages in a single, organized document.</p>
      <section>
        <h2>Use Cases for Converting JPG to PDF</h2>
        <ul>
          <li><strong>Photo printing:</strong> Convert high-resolution JPEG photos to a print-ready PDF for photo labs or home printing.</li>
          <li><strong>Document scanning:</strong> Combine scanned JPEG pages into a single, organized PDF document for record-keeping and sharing.</li>
        </ul>
      </section>
      <section>
        <h2>Related Tools</h2>
        <p>
          <Link href="/tools/image-to-pdf">Open the free converter</Link> |{" "}
          <Link href="/tools/png-to-pdf">PNG to PDF</Link> |{" "}
          <Link href="/tools/webp-to-pdf">WebP to PDF</Link> |{" "}
          <Link href="/tools/heic-to-pdf">HEIC to PDF</Link>
        </p>
      </section>
    </main>
  );
}
