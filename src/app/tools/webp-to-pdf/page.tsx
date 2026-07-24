import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export default function WebpToPdfPage() {
  return (
    <main className="content-page">
      <h1>Convert WebP to PDF — Free, Private, No Upload</h1>
      <p>
        WebP is Google&apos;s modern image format with smaller files than typical JPEG or PNG.
        Convert WebP images to PDF for sharing, printing, or archiving — entirely in your browser.
        No uploads, no account, and no watermark. Up to 25 images per conversion.
      </p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">
          Start converting WebP to PDF
        </Link>
      </div>

      <section className="how-it-works">
        <h2>How to Convert WebP to PDF</h2>
        <ol className="steps">
          <li className="step">
            <span className="step-number">1</span>
            <div>
              <h3>Select WebP files</h3>
              <p>Drag WebP images into the converter or choose them from your device.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">2</span>
            <div>
              <h3>Decode locally</h3>
              <p>Modern browsers decode WebP natively. Arrange pages and pick size, margins, and quality.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">3</span>
            <div>
              <h3>Download a universal PDF</h3>
              <p>Get a PDF that opens everywhere — even on devices that do not support WebP.</p>
            </div>
          </li>
        </ol>
      </section>

      <section>
        <h2>WebP Browser Compatibility</h2>
        <p>
          WebP works in Chrome, Firefox, Edge, and Safari. Local2PDF converts WebP in those browsers
          using built-in decoding. The output PDF works on any platform and PDF reader, which is why
          teams often convert WebP assets before sending them to clients or print vendors.
        </p>
      </section>

      <section className="how-it-works">
        <h2>When to Use WebP to PDF</h2>
        <ul className="use-cases">
          <li className="use-case">
            <h3>Universal sharing</h3>
            <p>
              Recipients may not open WebP attachments easily. A PDF ensures everyone can view the
              images without installing extra software.
            </p>
          </li>
          <li className="use-case">
            <h3>Print-ready archives</h3>
            <p>
              Bundle marketing or product WebP images into one printable PDF for long-term storage.
            </p>
          </li>
          <li className="use-case">
            <h3>Web asset handoff</h3>
            <p>
              Designers exporting WebP from the web can package selected frames into a review PDF.
            </p>
          </li>
          <li className="use-case">
            <h3>Email-friendly packs</h3>
            <p>
              Replace many small WebP files with a single PDF attachment that keeps page order intact.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>Limitations</h2>
        <ul>
          <li>
            <strong>Needs a modern browser.</strong> Very old browsers without WebP support cannot
            decode the source images.
          </li>
          <li>
            <strong>25 images per conversion.</strong> Split larger galleries into multiple jobs.
          </li>
          <li>
            <strong>Animated WebP is treated as a still.</strong> Only a static frame is suitable for
            standard PDF pages.
          </li>
        </ul>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>Are WebP files uploaded to Local2PDF?</summary>
            <p>No. Decoding and PDF creation happen in your browser. Files stay on your device.</p>
          </details>
          <details className="faq-item">
            <summary>Why convert WebP instead of sending the images as-is?</summary>
            <p>
              PDF is more compatible for email, print, and archiving. Many people and printers still
              struggle with WebP.
            </p>
          </details>
          <details className="faq-item">
            <summary>Can I mix WebP with JPG or PNG?</summary>
            <p>
              Yes. Use <Link href="/tools/combine-images-to-pdf">Combine Images to PDF</Link> or the
              main <Link href="/tools/image-to-pdf">Image to PDF</Link> tool to mix formats.
            </p>
          </details>
          <details className="faq-item">
            <summary>Is WebP to PDF free?</summary>
            <p>Yes. Free, private, no signup, and no watermark.</p>
          </details>
        </div>
      </section>

      <section className="privacy-section">
        <h2>Private by design</h2>
        <p>
          WebP conversion never uploads document contents to Local2PDF servers. Processing is
          browser-local — see <Link href="/security">Security</Link> for details.
        </p>
      </section>

      <section className="tool-seo">
        <h2>Related tools</h2>
        <p>
          <Link href="/tools/image-to-pdf">Image to PDF</Link> |{" "}
          <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
          <Link href="/tools/png-to-pdf">PNG to PDF</Link> |{" "}
          <Link href="/tools/heic-to-pdf">HEIC to PDF</Link> |{" "}
          <Link href="/tools/combine-images-to-pdf">Combine Images to PDF</Link>
        </p>
      </section>
    </main>
  );
}
