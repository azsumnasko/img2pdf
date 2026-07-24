import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export default function JpgToPdfPage() {
  return (
    <main className="content-page">
      <h1>Convert JPG to PDF — Free, Private, No Upload</h1>
      <p>
        Convert JPEG photos and scanned pages to PDF directly in your browser. Adjust page size,
        orientation, margins, and quality — then download a clean PDF. No files are uploaded, no
        account is required, and there is no watermark. Free for up to 25 images per conversion,
        with unlimited conversions.
      </p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">
          Start converting JPG to PDF
        </Link>
      </div>

      <section className="how-it-works">
        <h2>How to Convert JPG to PDF</h2>
        <ol className="steps">
          <li className="step">
            <span className="step-number">1</span>
            <div>
              <h3>Select your JPEG images</h3>
              <p>Click, drag and drop, or paste from clipboard. Mix multiple JPGs in one batch.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">2</span>
            <div>
              <h3>Arrange pages</h3>
              <p>Drag to reorder pages and rotate individual images before conversion.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">3</span>
            <div>
              <h3>Choose settings</h3>
              <p>Pick page size (A4, US Letter, fit to image), margins, orientation, and quality.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">4</span>
            <div>
              <h3>Convert and download</h3>
              <p>Your PDF is built on your device and downloads instantly — never uploaded.</p>
            </div>
          </li>
        </ol>
      </section>

      <section>
        <h2>JPEG Quality and File Size</h2>
        <p>
          Local2PDF preserves JPEG images at high quality. Choose the Balanced preset for a good
          trade-off between clarity and file size, Original for the highest fidelity, or Small File
          to minimize the PDF for email and messaging apps. Because processing stays in the browser,
          you can try presets without sending photos to a server.
        </p>
      </section>

      <section>
        <h2>Why Convert JPG to PDF?</h2>
        <p>
          PDF is the standard format for document sharing. Converting JPG images to PDF keeps pages
          in a fixed order, displays consistently across devices, and makes printing, emailing, and
          archiving simpler than sending a folder of loose image files.
        </p>
      </section>

      <section className="how-it-works">
        <h2>When to Use JPG to PDF</h2>
        <ul className="use-cases">
          <li className="use-case">
            <h3>Photo printing</h3>
            <p>
              Convert high-resolution JPEG photos to a print-ready PDF for photo labs or home
              printing at A4 or Letter size.
            </p>
          </li>
          <li className="use-case">
            <h3>Document scanning</h3>
            <p>
              Combine scanned JPEG pages into one organized PDF for invoices, receipts, forms, and
              paperwork.
            </p>
          </li>
          <li className="use-case">
            <h3>Travel and ID copies</h3>
            <p>
              Bundle passport, ticket, and booking photos into a single PDF that is easy to share
              securely from your device.
            </p>
          </li>
          <li className="use-case">
            <h3>Client deliverables</h3>
            <p>
              Package product photos or site photos as one PDF instead of attaching many separate
              JPG files.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>Limitations</h2>
        <ul>
          <li>
            <strong>Up to 25 images per conversion.</strong> Run another conversion if you need more
            pages.
          </li>
          <li>
            <strong>Very large photos may be slower.</strong> Performance depends on your device
            memory and browser.
          </li>
          <li>
            <strong>CMYK print workflows vary.</strong> Output is RGB browser-based PDF; professional
            print shops may still prefer their own color profile.
          </li>
        </ul>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>Are my JPG files uploaded?</summary>
            <p>
              No. Conversion happens entirely in your browser. Your images never leave your device.
            </p>
          </details>
          <details className="faq-item">
            <summary>Can I convert multiple JPGs into one PDF?</summary>
            <p>
              Yes. Select multiple JPEG images, reorder them, then convert into a single multi-page
              PDF.
            </p>
          </details>
          <details className="faq-item">
            <summary>Is JPG to PDF free?</summary>
            <p>
              Yes. Local2PDF is free with no signup and no watermark. Image-to-PDF supports up to 25
              images per conversion.
            </p>
          </details>
          <details className="faq-item">
            <summary>Can I change page size for JPEG images?</summary>
            <p>
              Yes. Choose A4, Letter, other presets, or fit each page to the image. You can also set
              orientation and margins.
            </p>
          </details>
        </div>
      </section>

      <section className="privacy-section">
        <h2>Private by design</h2>
        <p>
          JPG to PDF on Local2PDF does not upload your photos to our servers. Processing uses local
          browser APIs, so sensitive scans and personal photos stay on your device. Learn more on
          our <Link href="/security">Security</Link> and <Link href="/privacy">Privacy</Link> pages.
        </p>
      </section>

      <section className="tool-seo">
        <h2>Related tools</h2>
        <p>
          <Link href="/tools/image-to-pdf">Image to PDF</Link> |{" "}
          <Link href="/tools/png-to-pdf">PNG to PDF</Link> |{" "}
          <Link href="/tools/webp-to-pdf">WebP to PDF</Link> |{" "}
          <Link href="/tools/heic-to-pdf">HEIC to PDF</Link> |{" "}
          <Link href="/tools/photos-to-pdf">Photos to PDF</Link> |{" "}
          <Link href="/tools/combine-images-to-pdf">Combine Images to PDF</Link>
        </p>
      </section>
    </main>
  );
}
