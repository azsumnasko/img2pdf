import type { Metadata } from "next";
import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export const metadata: Metadata = {
  title: "Photos to PDF on iPhone — Convert iPhone Photos Free | No App",
  description: "Convert iPhone photos to PDF without installing an app. Works in Safari. Select from Photos library, arrange order, and download as PDF. Free.",
  alternates: { canonical: "https://local2pdf.com/tools/photos-to-pdf" },
};

export default function PhotosToPdfPage() {
  return (
    <main className="content-page">
      <h1>Convert Photos to PDF on iPhone and Android — Free, No App Needed</h1>
      <p>Turn your phone photos into a PDF without installing any app. Works in Safari on iPhone and Chrome on Android. Select from your photo library or take new photos directly.</p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">Convert photos to PDF now</Link>
      </div>
      <h2>iPhone Instructions</h2>
      <ol>
        <li>Open this page in Safari</li>
        <li>Tap &ldquo;Choose images&rdquo; and select from your Photo Library</li>
        <li>Arrange and rotate photos as needed</li>
        <li>Tap Convert and download your PDF</li>
      </ol>
      <h2>Android Instructions</h2>
      <ol>
        <li>Open this page in Chrome</li>
        <li>Tap &ldquo;Choose images&rdquo; and select from Gallery</li>
        <li>Arrange photos, choose page size (A4 or Letter)</li>
        <li>Tap Convert — the PDF saves to your device</li>
      </ol>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf">Open the converter</Link> |{" "}
        <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
        <Link href="/tools/heic-to-pdf">HEIC to PDF</Link>
      </p>
    </main>
  );
}
