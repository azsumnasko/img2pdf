import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Local2PDF privacy policy — all processing happens locally, your files are never uploaded.",
};

export default function PrivacyPage() {
  return (
    <main className="content-page">
      <h1>Privacy Policy</h1>
      <p><strong>Last updated:</strong> July 2026</p>

      <h2>1. Our Privacy Promise</h2>
      <p>
        Local2PDF is a browser-based PDF toolkit. All document processing — including conversion,
        merging, splitting, rotation, text extraction, and thumbnail generation — happens entirely
        on your device. Your files are never uploaded to our servers. We do not see, store, or
        have access to your file contents, generated output, or filenames.
      </p>
      <p>
        Neither the contents nor the metadata of your selected documents, images, or generated
        files are uploaded. Normal website requests (such as analytics, advertising, and consent
        dialogs) may still occur according to your consent choices, but these requests never
        include your file data.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        Our web hosting provider may collect standard server logs including IP address, browser
        type, referring page, and time of visit. This is standard for all websites and is used
        for security and operational purposes.
      </p>

      <h2>3. Analytics</h2>
      <p>
        We may use privacy-safe analytics to understand how the toolkit is used. This data never
        includes your filenames, image contents, PDF contents, extracted text, or any personally
        identifying information from your files.
      </p>

      <h2>4. Advertising</h2>
      <p>
        This site may display advertisements to support its operation. Advertisements are
        clearly labeled and are never placed inside the toolkit interface or near action
        buttons. Advertising partners may use cookies for frequency capping and measurement,
        subject to your consent where required.
      </p>

      <h2>5. Cookies and Local Storage</h2>
      <p>
        We use local storage exclusively to remember your preferences, such as page size, quality
        settings, and recently used tools. No personal data, file contents, or document
        information is stored in local storage. Your files are never written to local storage.
      </p>

      <h2>6. Data Retention and Memory Lifecycle</h2>
      <p>
        All file data — including uploaded images, PDF input files, extracted text, generated
        thumbnails, converted images (PDF to JPG/PNG), modified PDFs, and ZIP archives — exists
        only in your browser&apos;s memory. Temporary object URLs (blob URLs) are created solely
        to enable file downloads and are revoked on page close or refresh. All in-memory file
        data is cleared when you close or refresh the page.
      </p>
      <p>
        Our Service Worker is used only to cache the application shell (HTML, CSS, JavaScript)
        for offline capability. It never caches your files, generated output, or any user
        document data.
      </p>
      <p>
        Server logs are retained for a limited period for operational purposes.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Depending on your location, you may have rights regarding your personal data. Since we
        collect minimal data and do not process your files, the primary control is in your
        browser. You can clear your local storage, manage Service Worker registrations, and
        control cookie preferences through your browser settings at any time. You can contact
        us for any privacy-related questions.
      </p>

      <h2>8. Contact</h2>
      <p>
        For privacy questions, please contact us through the information provided on our website.
      </p>
    </main>
  );
}
