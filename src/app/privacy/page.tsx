import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Local2PDF privacy policy — your images are processed locally and never uploaded.",
};

export default function PrivacyPage() {
  return (
    <main className="content-page">
      <h1>Privacy Policy</h1>
      <p><strong>Last updated:</strong> July 2026</p>

      <h2>1. Our Privacy Promise</h2>
      <p>
        Local2PDF converts your images to PDF entirely in your browser. Your files are never
        uploaded to our servers. We do not see, store, or have access to your images, generated
        PDFs, or filenames.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        Our web hosting provider may collect standard server logs including IP address, browser
        type, referring page, and time of visit. This is standard for all websites and is used
        for security and operational purposes.
      </p>

      <h2>3. Analytics</h2>
      <p>
        We may use privacy-safe analytics to understand how the tool is used. This data never
        includes your filenames, image contents, PDF contents, or any personally identifying
        information from your files.
      </p>

      <h2>4. Advertising</h2>
      <p>
        This site may display advertisements to support its operation. Advertisements are
        clearly labeled and are never placed inside the converter tool or near action buttons.
        Advertising partners may use cookies for frequency capping and measurement, subject to
        your consent where required.
      </p>

      <h2>5. Cookies and Local Storage</h2>
      <p>
        We use local storage to remember your preferences such as page size and quality settings.
        No personal data or file information is stored.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        Your images and generated PDFs exist only in your browser&apos;s memory and are cleared
        when you close or refresh the page. Server logs are retained for a limited period for
        operational purposes.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Depending on your location, you may have rights regarding your personal data. Since we
        collect minimal data and do not process your files, the primary control is in your
        browser. You can contact us for any privacy-related questions.
      </p>

      <h2>8. Contact</h2>
      <p>
        For privacy questions, please contact us through the information provided on our website.
      </p>
    </main>
  );
}
