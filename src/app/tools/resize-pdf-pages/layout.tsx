import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resize PDF Pages Locally — Change Page Size Free",
  description:
    "Resize PDF pages to standard formats (A4, A3, Letter, Legal) or custom dimensions. Scale to fit or center without scaling — all in your browser.",
  alternates: { canonical: "https://local2pdf.com/tools/resize-pdf-pages" },
  openGraph: {
  title: "Resize PDF Pages Locally — Change Page Size Free",
    description:
      "Resize PDF pages to A4, Letter, or custom sizes. Scale to fit or center content. Free, private, browser-based.",
    url: "https://local2pdf.com/tools/resize-pdf-pages",
    type: "website",
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

export default function ResizePdfPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Local2PDF — Resize PDF Pages",
              description:
                "Resize PDF pages to standard or custom sizes privately in your browser. No upload, no signup.",
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
                { "@type": "ListItem", position: 3, name: "Resize PDF Pages", item: "https://local2pdf.com/tools/resize-pdf-pages" },
              ],
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "What standard page sizes are available?", "acceptedAnswer": { "@type": "Answer", "text": "Common sizes include A4, A3, Letter, Legal, and Tabloid. You can also enter custom dimensions in millimeters." } },
                { "@type": "Question", "name": "How does scaling work?", "acceptedAnswer": { "@type": "Answer", "text": "You can choose to scale page content to fit the new size proportionally, or center it without scaling to preserve the original dimensions." } },
                { "@type": "Question", "name": "Will resizing affect print quality?", "acceptedAnswer": { "@type": "Answer", "text": "When scaling down, quality is maintained. Scaling up may reduce sharpness since original content is not re-rendered at higher resolution." } },
                { "@type": "Question", "name": "Are my files uploaded to Local2PDF servers?", "acceptedAnswer": { "@type": "Answer", "text": "No. All processing happens entirely in your browser. Your files never leave your device." } },
                { "@type": "Question", "name": "Is this tool free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All Local2PDF tools are completely free. No signup, no watermark, and unlimited use." } }
              ]
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
