import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Combine Images to PDF — Private & Free",
  description:
    "Combine multiple images (JPG, PNG, WebP, HEIC) into a single PDF locally in your browser. Reorder pages, adjust layout. No upload, no signup.",
  alternates: { canonical: "https://local2pdf.com/tools/combine-images-to-pdf" },
  openGraph: {
  title: "Combine Images to PDF — Private & Free",
    description:
      "Merge multiple images into one PDF privately. Reorder, resize, and customize. No upload, no signup, no watermark.",
    url: "https://local2pdf.com/tools/combine-images-to-pdf",
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

export default function CombineImagesToPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Local2PDF — Combine Images to PDF",
              description:
                "Combine multiple images of various formats into a single PDF locally in your browser. Reorder pages and customize layout. No upload, no signup, no watermark.",
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
                  name: "Are my images uploaded to Local2PDF servers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All image combining and PDF creation happens entirely in your browser using local web APIs. Your files are never uploaded to our servers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What image formats are supported when combining to PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The tool supports common image formats: JPG, PNG, WebP, and HEIC.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is combining images to PDF free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Local2PDF is completely free. There is no signup, no watermark, and unlimited conversions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I reorder images before combining them into a PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. You can drag and drop to reorder your images before combining them into a PDF. You can also adjust page size, orientation, and margins.",
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
                { "@type": "ListItem", position: 3, name: "Combine Images to PDF", item: "https://local2pdf.com/tools/combine-images-to-pdf" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
