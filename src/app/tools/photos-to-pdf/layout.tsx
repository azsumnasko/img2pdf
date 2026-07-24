import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Photos to PDF Locally — Private & Free",
  description:
    "Convert photos to PDF locally in your browser. Ideal for photo albums and photo prints. Adjust page size, orientation, and margins. No upload, no signup.",
  alternates: { canonical: "https://local2pdf.com/tools/photos-to-pdf" },
  openGraph: {
  title: "Photos to PDF Locally — Private & Free",
    description:
      "Turn photos into PDF albums privately. Customize layout and page size. No upload, no signup, no watermark.",
    url: "https://local2pdf.com/tools/photos-to-pdf",
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

export default function PhotosToPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Local2PDF — Photos to PDF Converter",
              description:
                "Convert photos to PDF locally in your browser. Ideal for creating photo albums and printable photo collections. No upload, no signup, no watermark.",
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
                  name: "Are my photos uploaded to Local2PDF servers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All photo to PDF conversion happens entirely in your browser using local web APIs. Your personal photos are never uploaded to our servers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I create a photo album with multiple photos in one PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Each photo is placed on its own page. You can reorder pages and adjust page size, orientation, and margins before converting.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is photos to PDF conversion free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Local2PDF is completely free. There is no signup, no watermark, and unlimited conversions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What photo formats are supported for PDF conversion?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The tool supports common image formats: JPG, PNG, WebP, and HEIC from your phone's photo library.",
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
                { "@type": "ListItem", position: 3, name: "Photos to PDF", item: "https://local2pdf.com/tools/photos-to-pdf" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
