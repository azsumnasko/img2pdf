import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

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
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Paste screenshots from clipboard (Ctrl+V / Cmd+V) or drag files into the converter</li>
          <li>Arrange screenshots in the desired order and choose page size, orientation, and margins</li>
          <li>Your PDF is built locally in the browser — no uploads, instant download</li>
        </ol>
      </section>
      <section>
        <h2>Why Convert Screenshots to PDF</h2>
        <ul>
          <li><strong>Documentation:</strong> Compile multiple screenshots into a single organized PDF for reports, tutorials, or bug reports.</li>
          <li><strong>Professional sharing:</strong> Package screenshots into one standardized, print-ready file that&apos;s easy to email or submit.</li>
        </ul>
      </section>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf">Open the converter</Link> |{" "}
        <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
        <Link href="/tools/png-to-pdf">PNG to PDF</Link>
      </p>
    </main>
  );
}
