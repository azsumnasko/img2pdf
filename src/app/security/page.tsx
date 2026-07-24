import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security at Local2PDF",
  description:
    "How Local2PDF keeps your data safe with browser-local processing, no file uploads, and strong security practices.",
  alternates: {
    canonical: "https://local2pdf.com/security",
  },
  openGraph: {
    title: "Security at Local2PDF",
    description:
      "How Local2PDF keeps your data safe with browser-local processing, no file uploads, and strong security practices.",
    url: "https://local2pdf.com/security",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Local2PDF — Private PDF tools in your browser",
      },
    ],
  },
};

export default function SecurityPage() {
  return (
    <main className="content-page">
      <h1>Security at Local2PDF</h1>

      <h2>Browser-Local Processing</h2>
      <p>
        All image conversion and PDF generation runs entirely in your browser
        using client-side JavaScript. Your images are never uploaded to any
        server. No one else can see or access your files.
      </p>

      <h2>Network Requests</h2>
      <p>
        The only network requests made after the initial page load are for
        analytics (if enabled) and advertising (if displayed). Your images,
        PDF contents, and filenames are never included in any outgoing request.
      </p>

      <h2>Third-Party Dependencies</h2>
      <p>
        We use jsPDF and PDF-lib for PDF generation. Both are well-established
        open-source libraries with active maintainers. We pin dependency
        versions and review updates before deploying.
      </p>

      <h2>Analytics</h2>
      <p>
        We may use privacy-safe analytics to understand feature usage and
        improve the tool. Analytics never receive your filenames, image
        contents, generated PDF contents, or any personally identifying
        information from your files.
      </p>

      <h2>Advertising</h2>
      <p>
        This site may display advertisements. Ads are clearly labeled and
        are never placed inside the converter tool or near action buttons.
        Advertising partners may use cookies for frequency capping and
        measurement, subject to your consent where required.
      </p>

      <h2>Local Storage</h2>
      <p>
        We store your preferences (page size, quality settings, and similar
        configuration) in your browser&apos;s local storage. No file data,
        personal information, or sensitive values are persisted.
      </p>

      <h2>Memory Cleanup</h2>
      <p>
        All image bitmap data, rendered canvases, and generated PDF blobs are
        released from memory when you close or refresh the page. We use object
        URL revocation and structured cleanup to prevent memory leaks.
      </p>


      <h2>Vulnerability Disclosure</h2>
      <p>
        If you discover a security vulnerability, please email{" "}
        <a href="mailto:security@local2pdf.com">security@local2pdf.com</a>.
        We aim to acknowledge reports within 48 hours and provide a timeline
        for resolution. We appreciate responsible disclosure and will credit
        researchers who report valid issues.
      </p>
    </main>
  );
}
