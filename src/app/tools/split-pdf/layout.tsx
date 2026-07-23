import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split PDF Locally — Separate Pages Without Upload | Local2PDF",
  description:
    "Split a PDF into individual pages or custom ranges in your browser. No upload, no signup, no watermark. Extract pages fast and free.",
  alternates: { canonical: "https://local2pdf.com/tools/split-pdf" },
  openGraph: {
    title: "Split PDF Locally — Separate Pages Without Upload | Local2PDF",
    description:
      "Split a PDF into separate files. Choose every page, custom ranges, or every N pages. All in your browser.",
    url: "https://local2pdf.com/tools/split-pdf",
    type: "website",
  },
};

export default function SplitPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Local2PDF — Split PDF",
              description:
                "Split PDF files into individual pages or custom ranges. Private, browser-based processing with no uploads.",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "All",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              browserRequirements: "Requires JavaScript",
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://local2pdf.com" },
                { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://local2pdf.com/pdf-tools" },
                { "@type": "ListItem", position: 3, name: "Split PDF", item: "https://local2pdf.com/tools/split-pdf" },
              ],
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "What split options are available?", "acceptedAnswer": { "@type": "Answer", "text": "You can split by every page, by custom page ranges (e.g., 1-3,5,7-9), or extract every N pages." } },
                { "@type": "Question", "name": "Are my files uploaded to a server?", "acceptedAnswer": { "@type": "Answer", "text": "No. All splitting is done locally in your browser. Your PDF never leaves your device." } },
                { "@type": "Question", "name": "Will splitting a PDF reduce its quality?", "acceptedAnswer": { "@type": "Answer", "text": "No. Each split file retains the original page quality since pages are extracted without re-encoding." } }
              ]
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
