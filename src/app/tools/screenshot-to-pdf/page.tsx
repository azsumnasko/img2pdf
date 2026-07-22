import type { Metadata } from "next";
import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export const metadata: Metadata = {
  title: "Screenshot to PDF — Convert Screenshots to PDF Free | No Upload",
  description: "Convert screenshots to PDF privately. Paste from clipboard (Ctrl+V), drag and drop, or select files. No upload, no signup. Free converter.",
  alternates: { canonical: "https://local2pdf.com/tools/screenshot-to-pdf" },
};

export default function ScreenshotToPdfPage() {
  return (
    <main className="content-page">
      <h1>Convert Screenshots to PDF — Free, Private, No Upload</h1>
      <p>Turn your screenshots into a clean PDF. Just paste from your clipboard, drag screenshots in, or select files. Arrange them in order, add margins, and download your PDF.</p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">Convert screenshots to PDF</Link>
      </div>
      <h2>Fastest Way: Paste from Clipboard</h2>
      <p>Take a screenshot, then press Ctrl+V (Cmd+V on Mac) on this page. Your screenshot appears ready to convert. Add more screenshots and arrange them in order.</p>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf">Open the converter</Link> |{" "}
        <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
        <Link href="/tools/png-to-pdf">PNG to PDF</Link>
      </p>
    </main>
  );
}
