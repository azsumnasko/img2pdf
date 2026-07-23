import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Local2PDF — Privacy-First PDF Tools",
  description:
    "Local2PDF is a privacy-first PDF toolkit that processes files entirely in your browser. No uploads, no accounts, no watermarks.",
  alternates: {
    canonical: "https://local2pdf.com/about",
  },
  openGraph: {
    title: "About Local2PDF — Privacy-First PDF Tools",
    description:
      "Local2PDF is a privacy-first PDF toolkit that processes files entirely in your browser. No uploads, no accounts, no watermarks.",
    url: "https://local2pdf.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Local2PDF",
            url: "https://local2pdf.com",
            description:
              "A privacy-first PDF toolkit that processes files entirely in your browser.",
            parentOrganization: {
              "@type": "Organization",
              name: "Firmify EOOD",
              url: "https://firmify.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BG",
              },
            },
          }),
        }}
      />

      <h1>About Local2PDF</h1>

      <p>
        Local2PDF is a privacy-first PDF toolkit that processes files entirely
        in your browser. No file uploads, no account required, no watermarks.
      </p>

      <h2>Who We Are</h2>
      <p>
        Operated by Firmify EOOD in Bulgaria. We build privacy-respecting
        tools that keep your data on your device.
      </p>

      <h2>Our Products</h2>
      <ul>
        <li>
          <a href="https://firmify.com" target="_blank" rel="noopener noreferrer">
            Firmify
          </a>{" "}
          — Company registration services
        </li>
        <li>
          <a href="https://storykind.app" target="_blank" rel="noopener noreferrer">
            StoryKind
          </a>{" "}
          — AI-powered children&apos;s stories
        </li>
      </ul>

      <h2>How Local2PDF Works</h2>
      <p>
        When you select images, they are loaded into your browser&apos;s memory
        using the FileReader API. Rendering, layout, and PDF generation all
        happen locally via client-side JavaScript. At no point are your images
        or generated PDFs transmitted to any server. The entire process
        finishes inside your device.
      </p>

      <h2>Contact</h2>
      <p>
        For support:{" "}
        <a href="mailto:support@local2pdf.com">support@local2pdf.com</a>
      </p>
      <p>
        For privacy:{" "}
        <a href="mailto:privacy@local2pdf.com">privacy@local2pdf.com</a>
      </p>
    </main>
  );
}
