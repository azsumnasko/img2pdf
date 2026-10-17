import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Security at Local2PDF — Browser-Local File Processing" },
  description:
    "How Local2PDF keeps your files safe with browser-local processing. No document uploads, Network-tab verification, and open-source PDF libraries you can inspect.",
  alternates: {
    canonical: "https://local2pdf.com/security",
  },
  openGraph: {
    title: "Security at Local2PDF — Browser-Local File Processing",
    description:
      "How Local2PDF keeps your files safe with browser-local processing. No document uploads, Network-tab verification, and open-source PDF libraries.",
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
  twitter: {
    card: "summary_large_image",
    title: "Security at Local2PDF — Browser-Local File Processing",
    description:
      "How Local2PDF keeps your files safe with browser-local processing. No document uploads and open-source PDF libraries.",
  },
};

export default function SecurityPage() {
  return (
    <main className="content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Security",
              description:
                "How Local2PDF keeps your data safe with browser-local processing, no file uploads, and strong security practices.",
              url: "https://local2pdf.com/security",
              publisher: {
                "@id": "https://local2pdf.com/#organization",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://local2pdf.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Security",
                },
              ],
            },
          ]),
        }}
      />
      <h1>Security at Local2PDF</h1>

      <h2>Browser-Local Processing</h2>
      <p>
        All image conversion and PDF generation runs entirely in your browser
        using client-side JavaScript. Your images are never uploaded to any
        server. No one else can see or access your files.
      </p>

      <h2>Network Requests</h2>
      <p>
        After the page loads, the browser may request Local2PDF&apos;s own HTML,
        CSS, and JavaScript. Display advertising is currently off; ads.txt lists
        no authorized sellers. Analytics run only if you allow them. Your images,
        PDF contents, and filenames are never included in any outgoing request.
      </p>

      <h2>Third-Party Dependencies</h2>
      <p>
        Page rendering uses{" "}
        <a href="https://mozilla.github.io/pdf.js/" rel="noopener noreferrer" target="_blank">
          PDF.js
        </a>
        . Creating and editing the PDF uses{" "}
        <a href="https://pdf-lib.js.org/" rel="noopener noreferrer" target="_blank">
          pdf-lib
        </a>
        . Both libraries run in your browser. Local2PDF does not send the file
        to those projects, and it does not upload the document to a conversion
        server. We pin dependency versions and review updates before deploying.
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
        Display advertising is currently off; ads.txt lists no authorized sellers.
        The site does not load an ad network. If advertising is enabled later,
        ads will be labeled and kept outside the converter and away from action
        buttons, and partners may use cookies only with your consent.
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


      <h2>What never leaves the device</h2>
      <p>
        The tools read the file you select, work on it in memory, and offer a download.
        Filenames, page contents, extracted text, and the finished PDF are not included in
        analytics. Closing the tab drops the in-memory copy. Keep your own original until you
        have opened the download.
      </p>
      <p>
        A password-protected PDF has to be unlocked before the browser can read it. PDF to Text
        returns only text that is already embedded; it does not OCR a scan. A very large file
        can run out of memory. Those are device limits. They are not a reason the file must be
        uploaded.
      </p>

      <h2>How to check</h2>
      <p>
        Open developer tools, choose the Network panel, and run a tool on a small file you can
        afford to experiment with. You should not see a request whose body is that PDF or image.
        The request list can still show the site&apos;s own scripts. Display advertising is
        currently off, so you should not see an ad-seller request either. Repeat the check on
        Image to PDF if you want the same evidence for pictures.
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
