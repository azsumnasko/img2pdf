import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Screenshot to PDF Locally — Private & Free",
  description:
    "Convert screenshots to PDF locally in your browser. Paste from clipboard or select screenshot files. Adjust page size and orientation. No upload, no signup.",
  alternates: { canonical: "https://local2pdf.com/tools/screenshot-to-pdf" },
  openGraph: {
  title: "Screenshot to PDF Locally — Private & Free",
    description:
      "Convert screenshots to PDF privately. Paste from clipboard or select files. No upload, no signup, no watermark.",
    url: "https://local2pdf.com/tools/screenshot-to-pdf",
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

export default function ScreenshotToPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Local2PDF — Screenshot to PDF Converter",
              description:
                "Convert screenshots to PDF locally in your browser. Paste from clipboard or select screenshot files. No upload, no signup, no watermark.",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "All",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              browserRequirements: "Requires JavaScript and Canvas API support",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Are my screenshots uploaded to Local2PDF servers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All screenshot to PDF conversion happens entirely in your browser using local web APIs. Your files are never uploaded to our servers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I paste a screenshot directly from my clipboard?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. You can paste a screenshot directly from your clipboard using Ctrl+V (Windows) or Cmd+V (Mac) without saving the file first.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is screenshot to PDF conversion free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Local2PDF is completely free. There is no signup, no watermark, and unlimited conversions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I combine multiple screenshots into one PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. You can select multiple screenshots or paste them sequentially to combine them into a single multi-page PDF document.",
                  },
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://local2pdf.com" },
                { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://local2pdf.com/pdf-tools" },
                { "@type": "ListItem", position: 3, name: "Screenshot to PDF", item: "https://local2pdf.com/tools/screenshot-to-pdf" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
