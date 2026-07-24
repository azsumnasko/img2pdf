import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export default function PngToPdfPage() {
  return (
    <main className="content-page">
      <h1>Convert PNG to PDF — Free, Private, No Upload</h1>
      <p>
        Convert PNG screenshots, diagrams, logos, and graphics to PDF in your browser. Transparent
        areas are composited onto a white background for reliable viewing in every PDF reader. No
        uploads, no signup, and no watermark — up to 25 images per conversion.
      </p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">
          Start converting PNG to PDF
        </Link>
      </div>

      <section className="how-it-works">
        <h2>How to Convert PNG to PDF</h2>
        <ol className="steps">
          <li className="step">
            <span className="step-number">1</span>
            <div>
              <h3>Select PNG files</h3>
              <p>Drop screenshots or graphics into the converter, or paste from clipboard.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">2</span>
            <div>
              <h3>Arrange and set layout</h3>
              <p>Reorder pages, rotate if needed, and choose page size, margins, and orientation.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">3</span>
            <div>
              <h3>Download your PDF</h3>
              <p>Transparent areas render as white. The PDF is created locally and downloads instantly.</p>
            </div>
          </li>
        </ol>
      </section>

      <section>
        <h2>PNG Transparency Handling</h2>
        <p>
          PNG images often include transparent backgrounds. Local2PDF automatically renders
          transparent areas as white in the output PDF so pages look consistent in Preview, Chrome,
          Adobe Reader, and mobile apps. The Balanced quality preset keeps text in screenshots
          readable while controlling file size.
        </p>
      </section>

      <section>
        <h2>When to Use PNG vs JPEG for PDF</h2>
        <p>
          PNG is ideal for screenshots, diagrams, logos, UI captures, and images with text or sharp
          edges. JPEG is better for photographs. Local2PDF accepts both formats in the same workflow
          through the shared <Link href="/tools/image-to-pdf">Image to PDF</Link> converter.
        </p>
      </section>

      <section className="how-it-works">
        <h2>When to Use PNG to PDF</h2>
        <ul className="use-cases">
          <li className="use-case">
            <h3>Documentation packs</h3>
            <p>
              Compile sharp UI screenshots into one PDF for manuals, onboarding guides, or release
              notes.
            </p>
          </li>
          <li className="use-case">
            <h3>Bug reports</h3>
            <p>
              Attach a single PDF of ordered screenshots instead of many loose PNG files in a ticket.
            </p>
          </li>
          <li className="use-case">
            <h3>Diagrams and logos</h3>
            <p>
              Preserve crisp edges from charts, icons, and brand assets in a universally viewable PDF.
            </p>
          </li>
          <li className="use-case">
            <h3>Print handouts</h3>
            <p>
              Place PNG slides or posters onto A4/Letter pages with margins ready for printing.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>Limitations</h2>
        <ul>
          <li>
            <strong>Transparency becomes white.</strong> PDF pages do not keep alpha channels; clear
            pixels are filled with white.
          </li>
          <li>
            <strong>25 images per job.</strong> Split larger sets into multiple conversions.
          </li>
          <li>
            <strong>Huge canvases may strain memory.</strong> Very large PNGs can slow older phones
            and laptops.
          </li>
        </ul>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>Are my PNG files uploaded?</summary>
            <p>No. PNG to PDF conversion runs entirely in your browser on your device.</p>
          </details>
          <details className="faq-item">
            <summary>Will transparent PNGs look correct in the PDF?</summary>
            <p>
              Transparent areas are filled with white so the PDF displays reliably in all common
              readers.
            </p>
          </details>
          <details className="faq-item">
            <summary>Is this better than JPG for screenshots?</summary>
            <p>
              Usually yes. PNG keeps sharp text and UI edges better than JPEG compression for
              screenshots and diagrams.
            </p>
          </details>
          <details className="faq-item">
            <summary>Is PNG to PDF free?</summary>
            <p>Yes. Free, no signup, no watermark, unlimited conversions within the 25-image limit.</p>
          </details>
        </div>
      </section>

      <section className="privacy-section">
        <h2>Private by design</h2>
        <p>
          Screenshots and product UI can be sensitive. Local2PDF processes PNG files locally so
          nothing is sent to our servers. See <Link href="/security">Security</Link> for how
          browser-local processing works.
        </p>
      </section>

      <section className="tool-seo">
        <h2>Related tools</h2>
        <p>
          <Link href="/tools/image-to-pdf">Image to PDF</Link> |{" "}
          <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
          <Link href="/tools/webp-to-pdf">WebP to PDF</Link> |{" "}
          <Link href="/tools/screenshot-to-pdf">Screenshot to PDF</Link> |{" "}
          <Link href="/tools/combine-images-to-pdf">Combine Images to PDF</Link>
        </p>
      </section>
    </main>
  );
}
