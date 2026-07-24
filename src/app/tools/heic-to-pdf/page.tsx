import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export default function HeicToPdfPage() {
  return (
    <main className="content-page">
      <h1>Convert HEIC to PDF — Free, Private, No Upload</h1>
      <p>iPhone photos use the HEIC format by default. Convert HEIC images to PDF directly in your browser — in Safari with native support, or in Chrome/Firefox with a built-in decoder. No upload required.</p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">Start converting HEIC to PDF</Link>
      </div>
      <h2>HEIC Support in Your Browser</h2>
      <p>On Safari (iPhone, iPad, Mac), HEIC images are decoded natively at full speed. On Chrome, Firefox, and Edge, a lightweight WASM decoder loads on demand. Either way, your files never leave your device.</p>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Select or drag your HEIC files (iPhone photos) into the converter</li>
          <li>Safari decodes HEIC natively; other browsers use a lightweight on-device decoder</li>
          <li>Images are rendered at full resolution and combined into a PDF</li>
        </ol>
      </section>
      <section>
        <h2>Why Convert HEIC to PDF</h2>
        <ul>
          <li><strong>Cross-platform sharing:</strong> Share iPhone photos with anyone — PDF ensures compatibility on all devices, even those without HEIC support.</li>
          <li><strong>Bulk organization:</strong> Combine multiple HEIC photos into a single PDF for easy sharing, printing, or archiving.</li>
        </ul>
      </section>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf">Open the free converter</Link> |{" "}
        <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
        <Link href="/tools/png-to-pdf">PNG to PDF</Link>
      </p>
    </main>
  );
}
