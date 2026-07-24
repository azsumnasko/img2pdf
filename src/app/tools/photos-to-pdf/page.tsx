import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export default function PhotosToPdfPage() {
  return (
    <main className="content-page">
      <h1>Convert Photos to PDF on iPhone and Android — Free, No App Needed</h1>
      <p>
        Turn phone photos into a PDF without installing an app. Works in Safari on iPhone and Chrome
        on Android. Select from your photo library or camera roll, arrange pages, choose paper size,
        and download — all on your device. No upload, no account, no watermark. Up to 25 photos per
        conversion.
      </p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">
          Convert photos to PDF now
        </Link>
      </div>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol className="steps">
          <li className="step">
            <span className="step-number">1</span>
            <div>
              <h3>Open the converter on your phone</h3>
              <p>Use Safari (iPhone) or Chrome (Android) and tap Choose images or take new photos.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">2</span>
            <div>
              <h3>Arrange your album</h3>
              <p>Reorder and rotate photos, then pick A4, Letter, or fit-to-image layout.</p>
            </div>
          </li>
          <li className="step">
            <span className="step-number">3</span>
            <div>
              <h3>Download on-device</h3>
              <p>The PDF is generated in the browser and saved to your downloads — never uploaded.</p>
            </div>
          </li>
        </ol>
      </section>

      <section>
        <h2>iPhone Instructions</h2>
        <ol>
          <li>Open this page in Safari</li>
          <li>Tap &ldquo;Choose images&rdquo; and select from your Photo Library</li>
          <li>Arrange and rotate photos as needed</li>
          <li>Tap Convert and download your PDF</li>
        </ol>
      </section>

      <section>
        <h2>Android Instructions</h2>
        <ol>
          <li>Open this page in Chrome</li>
          <li>Tap &ldquo;Choose images&rdquo; and select from Gallery</li>
          <li>Arrange photos, choose page size (A4 or Letter)</li>
          <li>Tap Convert — the PDF saves to your device</li>
        </ol>
      </section>

      <section className="how-it-works">
        <h2>When to Use Photos to PDF</h2>
        <ul className="use-cases">
          <li className="use-case">
            <h3>Photo albums</h3>
            <p>
              Turn a collection of phone photos into a shareable photo-book PDF anyone can open.
            </p>
          </li>
          <li className="use-case">
            <h3>Printing</h3>
            <p>
              Prepare photos for printing at standard sizes like A4 or US Letter with adjustable
              margins.
            </p>
          </li>
          <li className="use-case">
            <h3>School and paperwork</h3>
            <p>
              Submit homework photos, signed forms, or whiteboard captures as one PDF attachment.
            </p>
          </li>
          <li className="use-case">
            <h3>Travel documents</h3>
            <p>
              Bundle boarding passes, hotel confirmations, and ID photos into a single offline PDF.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>Supported phone formats</h2>
        <p>
          Photos to PDF uses the same engine as{" "}
          <Link href="/tools/image-to-pdf">Image to PDF</Link>. That means JPG, PNG, WebP, and HEIC
          from modern phones are supported. iPhone users with HEIC defaults can also start from{" "}
          <Link href="/tools/heic-to-pdf">HEIC to PDF</Link>.
        </p>
      </section>

      <section>
        <h2>Limitations</h2>
        <ul>
          <li>
            <strong>Browser required.</strong> This is a web tool, not a native App Store / Play Store
            app.
          </li>
          <li>
            <strong>25 photos per conversion.</strong> Split long albums into batches.
          </li>
          <li>
            <strong>Device memory matters.</strong> Many full-resolution phone photos at once can be
            slow on older hardware.
          </li>
        </ul>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>Do I need to install an app?</summary>
            <p>No. Use your mobile browser. Nothing is installed from an app store.</p>
          </details>
          <details className="faq-item">
            <summary>Are my photos uploaded?</summary>
            <p>No. Selection and conversion stay on your phone. Files are not uploaded to Local2PDF.</p>
          </details>
          <details className="faq-item">
            <summary>Does it work with iPhone HEIC photos?</summary>
            <p>
              Yes. Safari handles HEIC natively. For HEIC-focused help, see{" "}
              <Link href="/tools/heic-to-pdf">HEIC to PDF</Link>.
            </p>
          </details>
          <details className="faq-item">
            <summary>Is Photos to PDF free?</summary>
            <p>Yes. Free, no signup, no watermark, unlimited conversions within the photo limit.</p>
          </details>
        </div>
      </section>

      <section className="privacy-section">
        <h2>Private by design</h2>
        <p>
          Phone photo libraries are personal. Local2PDF keeps processing on-device so album contents
          are not sent to our servers. Details: <Link href="/security">Security</Link>.
        </p>
      </section>

      <section className="tool-seo">
        <h2>Related tools</h2>
        <p>
          <Link href="/tools/image-to-pdf">Image to PDF</Link> |{" "}
          <Link href="/tools/heic-to-pdf">HEIC to PDF</Link> |{" "}
          <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
          <Link href="/tools/screenshot-to-pdf">Screenshot to PDF</Link> |{" "}
          <Link href="/tools/combine-images-to-pdf">Combine Images to PDF</Link>
        </p>
      </section>
    </main>
  );
}
