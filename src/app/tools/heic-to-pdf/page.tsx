import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export default function HeicToPdfPage() {
  return (
    <main className="content-page">
      <h1>Convert HEIC to PDF — Free, Private, No Upload</h1>
      <p>
        iPhone photos often save as HEIC by default. Convert HEIC (and HEIF) images to PDF in your
        browser — Safari decodes them natively, while Chrome, Firefox, and Edge use a lightweight
        on-device decoder. No upload, no app install, and no watermark. Up to 25 images per
        conversion.
      </p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">
          Start converting HEIC to PDF
        </Link>
      </div>

      <section className="how-it-works">
        <h2>How to Convert HEIC to PDF</h2>
        <ol className="steps">
          <li className="step">
            <span className="step-number">1</span>
            <div>
              <h3>Select HEIC photos</h3>
              <p>Choose iPhone photos from your library or drag HEIC files into the converter.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">2</span>
            <div>
              <h3>Decode on your device</h3>
              <p>Safari uses native HEIC support; other browsers load a local WASM decoder as needed.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">3</span>
            <div>
              <h3>Arrange and export</h3>
              <p>Reorder, rotate, set page size, then download a PDF that anyone can open.</p>
            </div>
          </li>
        </ol>
      </section>

      <section>
        <h2>HEIC Support in Your Browser</h2>
        <p>
          On Safari (iPhone, iPad, Mac), HEIC images decode natively at full speed. On Chrome,
          Firefox, and Edge, a lightweight WASM decoder runs in the page when needed. Either way,
          photo bytes stay on your device — they are not uploaded to Local2PDF for conversion.
        </p>
      </section>

      <section className="how-it-works">
        <h2>When to Use HEIC to PDF</h2>
        <ul className="use-cases">
          <li className="use-case">
            <h3>Cross-platform sharing</h3>
            <p>
              Friends on Windows or Android may not open HEIC. PDF ensures compatibility without
              asking them to convert files first.
            </p>
          </li>
          <li className="use-case">
            <h3>Bulk photo albums</h3>
            <p>
              Combine a trip or event set into one PDF for email, printing, or cloud backup.
            </p>
          </li>
          <li className="use-case">
            <h3>Insurance and claims</h3>
            <p>
              Package damage or receipt photos from your iPhone into a single claim-ready PDF.
            </p>
          </li>
          <li className="use-case">
            <h3>School and work submissions</h3>
            <p>
              Submit assignments or expense photos as PDF when portals reject HEIC uploads.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>Limitations</h2>
        <ul>
          <li>
            <strong>Decoder load on non-Safari browsers.</strong> The first HEIC conversion may take
            a moment while the on-device decoder initializes.
          </li>
          <li>
            <strong>25 images per conversion.</strong> Very large albums should be split into batches.
          </li>
          <li>
            <strong>Live Photos become stills.</strong> Only the still image frame is included in the
            PDF.
          </li>
          <li>
            <strong>Memory limits apply.</strong> Many high-resolution HEIC photos at once can strain
            older phones.
          </li>
        </ul>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>Do you upload my iPhone photos?</summary>
            <p>No. HEIC decoding and PDF creation happen locally in the browser.</p>
          </details>
          <details className="faq-item">
            <summary>Does this work in Chrome on Windows?</summary>
            <p>
              Yes. Chrome uses an on-device decoder for HEIC. Safari on Apple devices uses native
              support.
            </p>
          </details>
          <details className="faq-item">
            <summary>Can I convert HEIC on iPhone without an app?</summary>
            <p>
              Yes. Open Local2PDF in Safari, select photos from your library, convert, and download.
              See also <Link href="/tools/photos-to-pdf">Photos to PDF</Link>.
            </p>
          </details>
          <details className="faq-item">
            <summary>Is HEIC to PDF free?</summary>
            <p>Yes. Free, no signup, no watermark, unlimited conversions within the image limit.</p>
          </details>
        </div>
      </section>

      <section className="privacy-section">
        <h2>Private by design</h2>
        <p>
          Personal phone photos deserve local processing. Local2PDF does not upload HEIC contents to
          our servers. Read more on <Link href="/security">Security</Link> and{" "}
          <Link href="/privacy">Privacy</Link>.
        </p>
      </section>

      <section className="tool-seo">
        <h2>Related tools</h2>
        <p>
          <Link href="/tools/image-to-pdf">Image to PDF</Link> |{" "}
          <Link href="/tools/photos-to-pdf">Photos to PDF</Link> |{" "}
          <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
          <Link href="/tools/png-to-pdf">PNG to PDF</Link> |{" "}
          <Link href="/tools/combine-images-to-pdf">Combine Images to PDF</Link>
        </p>
      </section>
    </main>
  );
}
