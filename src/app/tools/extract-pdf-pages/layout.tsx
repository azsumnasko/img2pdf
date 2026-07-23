import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extract PDF Pages Locally — Private & Free | Local2PDF",
  description:
    "Extract specific pages from a PDF into a new file. No upload, no signup, no watermark. Select pages and extract in your browser.",
  alternates: { canonical: "https://local2pdf.com/tools/extract-pdf-pages" },
  openGraph: {
    title: "Extract PDF Pages Locally — Private & Free | Local2PDF",
    description:
      "Extract pages from any PDF. Combine into one file or get separate pages. Free, private, browser-based.",
    url: "https://local2pdf.com/tools/extract-pdf-pages",
    type: "website",
  },
};

export default function ExtractPdfPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Local2PDF — Extract PDF Pages",
              description:
                "Extract specific pages from a PDF privately in your browser. Combine into one PDF or get separate files.",
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
                { "@type": "ListItem", position: 3, name: "Extract PDF Pages", item: "https://local2pdf.com/tools/extract-pdf-pages" },
              ],
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "Can I extract specific page ranges?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Enter the pages you want as ranges (e.g., 1-5, 8, 12-15) and choose to combine them into one PDF or get separate files." } },
                { "@type": "Question", "name": "Will extracting pages reduce quality?", "acceptedAnswer": { "@type": "Answer", "text": "No. Extracted pages are copied directly from the original file without re-encoding, so quality is fully preserved." } },
                { "@type": "Question", "name": "Are my PDF contents visible to anyone?", "acceptedAnswer": { "@type": "Answer", "text": "No. All processing happens locally in your browser. Your PDF and its contents never leave your device." } }
              ]
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
