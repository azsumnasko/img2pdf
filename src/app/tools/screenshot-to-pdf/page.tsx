import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export default function ScreenshotToPdfPage() {
  return (
    <main className="content-page">
      <h1>Convert Screenshots to PDF — Free, Private, No Upload</h1>
      <p>
        Turn screenshots into a clean, ordered PDF. Paste from the clipboard, drag files in, or
        select images from disk. Arrange pages, set margins and paper size, then download — all in
        your browser. No upload, no signup, no watermark. Up to 25 screenshots per conversion.
      </p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">
          Convert screenshots to PDF
        </Link>
      </div>

      <section>
        <h2>Fastest Way: Paste from Clipboard</h2>
        <p>
          Take a screenshot, then press Ctrl+V (Cmd+V on Mac) on the converter page. Your screenshot
          appears ready to convert. Paste more captures, drag to reorder, and export one PDF for
          docs, tickets, or handoffs.
        </p>
      </section>

      <section className="how-it-works">
        <h2>How to Convert Screenshots to PDF</h2>
        <ol className="steps">
          <li className="step">
            <span className="step-number">1</span>
            <div>
              <h3>Paste or drop screenshots</h3>
              <p>Use Ctrl+V / Cmd+V, drag PNG/JPG files, or pick them from your device.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">2</span>
            <div>
              <h3>Arrange and set layout</h3>
              <p>Reorder pages, rotate if needed, and choose page size, orientation, and margins.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">3</span>
            <div>
              <h3>Download locally</h3>
              <p>Click Convert — the PDF is built in your browser and downloads instantly.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="how-it-works">
        <h2>When to Use Screenshot to PDF</h2>
        <ul className="use-cases">
          <li className="use-case">
            <h3>Documentation</h3>
            <p>
              Compile UI captures into one PDF for tutorials, SOPs, release notes, or knowledge base
              articles.
            </p>
          </li>
          <li className="use-case">
            <h3>Bug reports</h3>
            <p>
              Attach a single ordered PDF of repro steps instead of a zip of loose screenshot files.
            </p>
          </li>
          <li className="use-case">
            <h3>Meeting follow-ups</h3>
            <p>
              Capture slides or chat snippets and send stakeholders one printable PDF summary.
            </p>
          </li>
          <li className="use-case">
            <h3>Design reviews</h3>
            <p>
              Package before/after UI screenshots with consistent page size for async feedback.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>Tips for crisp screenshot PDFs</h2>
        <ul>
          <li>
            Prefer PNG screenshots when text sharpness matters; use{" "}
            <Link href="/tools/png-to-pdf">PNG to PDF</Link> guidance for transparency handling.
          </li>
          <li>
            Use fit-to-image or generous margins so UI chrome is not clipped when printing.
          </li>
          <li>
            Keep a logical reading order — paste captures in sequence before you convert.
          </li>
        </ul>
      </section>

      <section>
        <h2>Limitations</h2>
        <ul>
          <li>
            <strong>Clipboard paste depends on the browser.</strong> Some mobile browsers restrict
            paste of image data; file picker still works.
          </li>
          <li>
            <strong>25 screenshots per conversion.</strong> Split long flows into multiple PDFs.
          </li>
          <li>
            <strong>Very tall scrolling captures.</strong> Extremely tall images may need cropping
            first for comfortable page layout.
          </li>
        </ul>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>Can I paste screenshots directly?</summary>
            <p>
              Yes on most desktop browsers. Press Ctrl+V or Cmd+V after capturing your screen.
            </p>
          </details>
          <details className="faq-item">
            <summary>Are screenshots uploaded?</summary>
            <p>
              No. Screenshots can contain private data — Local2PDF processes them only in your
              browser.
            </p>
          </details>
          <details className="faq-item">
            <summary>PNG or JPG for screenshots?</summary>
            <p>
              PNG is usually better for UI text and sharp edges. JPG can be smaller for photo-like
              captures.
            </p>
          </details>
          <details className="faq-item">
            <summary>Is Screenshot to PDF free?</summary>
            <p>Yes. Free, no signup, no watermark, unlimited conversions within the image limit.</p>
          </details>
        </div>
      </section>

      <section className="privacy-section">
        <h2>Private by design</h2>
        <p>
          Screenshots often include emails, dashboards, or customer data. Local2PDF keeps that data
          on your device. Learn more on <Link href="/security">Security</Link>.
        </p>
      </section>

      <section className="tool-seo">
        <h2>Related tools</h2>
        <p>
          <Link href="/tools/image-to-pdf">Image to PDF</Link> |{" "}
          <Link href="/tools/png-to-pdf">PNG to PDF</Link> |{" "}
          <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
          <Link href="/tools/combine-images-to-pdf">Combine Images to PDF</Link> |{" "}
          <Link href="/tools/pdf-to-png">PDF to PNG</Link>
        </p>
      </section>
    </main>
  );
}
