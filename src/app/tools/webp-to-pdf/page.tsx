import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export default function WebpToPdfPage() {
  return (
    <main className="content-page">
      <h1>Convert WebP to PDF — Free, Private, No Upload</h1>
      <p>WebP is Google&apos;s modern image format that offers smaller file sizes than JPEG and PNG. Convert your WebP images to PDF for sharing, printing, or archiving.</p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">Start converting WebP to PDF</Link>
      </div>
      <h2>WebP Browser Compatibility</h2>
      <p>WebP is supported in Chrome, Firefox, Edge, and Safari. Local2PDF converts WebP images in all modern browsers. The output PDF works universally across all platforms and PDF readers.</p>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Select or drag your WebP files into the converter</li>
          <li>Images are decoded natively in your browser using built-in WebP support</li>
          <li>Each image is rendered at full resolution and assembled into a PDF</li>
        </ol>
      </section>
      <section>
        <h2>Why Convert WebP to PDF</h2>
        <ul>
          <li><strong>Universal sharing:</strong> PDF ensures WebP images are viewable on any device, even those that don&apos;t support the WebP format.</li>
          <li><strong>Print-ready archiving:</strong> Bundle multiple WebP images into a single, printable PDF document for long-term storage.</li>
        </ul>
      </section>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf">Open the free converter</Link> |{" "}
        <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
        <Link href="/tools/png-to-pdf">PNG to PDF</Link> |{" "}
        <Link href="/tools/heic-to-pdf">HEIC to PDF</Link>
      </p>
    </main>
  );
}
