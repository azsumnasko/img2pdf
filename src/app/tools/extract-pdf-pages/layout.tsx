import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Extract PDF Pages Locally — Private & Free",
  description:
    "Extract specific pages from a PDF into a new file. No upload, no signup, no watermark. Select pages and extract in your browser.",
  alternates: { canonical: "https://local2pdf.com/tools/extract-pdf-pages" },
  openGraph: {
  title: "Extract PDF Pages Locally — Private & Free",
    description:
      "Extract pages from any PDF. Combine into one file or get separate pages. Free, private, browser-based.",
    url: "https://local2pdf.com/tools/extract-pdf-pages",
    type: "website",
    images: [
      {
        url: "/og/extract-pdf-pages.png",
        width: 1200,
        height: 630,
        alt: "Local2PDF — Private PDF tools in your browser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract PDF Pages Locally — Private & Free",
    description: "Extract pages from any PDF. Combine into one file or get separate pages. Free, private, browser-based.",
    images: ["/og/extract-pdf-pages.png"],
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
              "@type": "WebApplication",
              "@id": "https://local2pdf.com/tools/extract-pdf-pages#webapp",
              url: "https://local2pdf.com/tools/extract-pdf-pages",
              name: "Local2PDF — Extract PDF Pages",
              description:
                "Extract specific pages from a PDF privately in your browser. Combine into one PDF or get separate files.",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "All",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              browserRequirements: "Requires JavaScript",
            },
            {
              "@context": "https://schema.org", "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://local2pdf.com" },
                { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://local2pdf.com/pdf-tools" },
                { "@type": "ListItem", position: 3, name: "Extract PDF Pages", item: "https://local2pdf.com/tools/extract-pdf-pages" },
              ],
            },
            {
              "@context": "https://schema.org", "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "Can I extract specific page ranges?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Select pages by checking their thumbnails. You can select specific pages using the checkboxes, then choose to combine them into one PDF or extract as separate files." } },
                { "@type": "Question", "name": "Will extracting pages reduce quality?", "acceptedAnswer": { "@type": "Answer", "text": "No. Extracted pages are copied directly from the original file without re-encoding, so quality is fully preserved." } },
                { "@type": "Question", "name": "Are my PDF contents visible to anyone?", "acceptedAnswer": { "@type": "Answer", "text": "No. All processing happens locally in your browser. Your PDF and its contents never leave your device." } },
                { "@type": "Question", "name": "Is this tool free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All Local2PDF tools are completely free. No signup, no watermark, and unlimited use." } }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to extract PDF pages",
              "description": "Extract specific pages from a PDF into a new file. No upload, no signup, no watermark. Select pages and extract in your browser.",
              "step": [
                {
                  "@type": "HowToStep",
                  "position": 1,
                  "name": "Select your PDF",
                  "text": "Click or drag and drop the PDF you want to extract pages from."
                },
                {
                  "@type": "HowToStep",
                  "position": 2,
                  "name": "Choose pages to extract",
                  "text": "Check the pages you want to extract. Select one or many."
                },
                {
                  "@type": "HowToStep",
                  "position": 3,
                  "name": "Download the result",
                  "text": "Choose to combine into one PDF or get separate files. Then download — all done in your browser."
                }
              ]
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
