import type { Metadata } from "next";
import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export const metadata: Metadata = {
  title: "HEIC to PDF — Convert iPhone Photos to PDF Free | No Upload",
  description: "Convert HEIC photos from iPhone to PDF without uploading. HEIC images processed locally in your browser with WASM decoder. Free and private.",
  alternates: { canonical: "https://local2pdf.com/tools/heic-to-pdf" },
};

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
      <p style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf">Open the free converter</Link> |{" "}
        <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
        <Link href="/tools/png-to-pdf">PNG to PDF</Link>
      </p>
    </main>
  );
}
