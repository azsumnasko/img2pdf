import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PNG to PDF Locally — Private & Free",
  description:
    "Convert PNG images to PDF locally in your browser. Preserve transparency, adjust page size and margins. No upload, no signup, no watermark.",
  alternates: { canonical: "https://local2pdf.com/tools/png-to-pdf" },
  openGraph: {
  title: "PNG to PDF Locally — Private & Free",
    description:
      "Convert PNG images to PDF privately. Preserve transparency and quality. No upload, no signup, no watermark.",
    url: "https://local2pdf.com/tools/png-to-pdf",
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

export default function PngToPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Local2PDF — PNG to PDF Converter",
              description:
                "Convert PNG images to PDF locally in your browser. Preserves transparency and image quality. No upload, no signup, no watermark.",
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
                  name: "Are my PNG files uploaded to Local2PDF servers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All PNG to PDF conversion happens entirely in your browser using local web APIs. Your files are never uploaded to our servers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does PNG transparency remain in the PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "PNG transparency is composited onto a white background in the final PDF.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is PNG to PDF conversion free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Local2PDF is completely free. There is no signup, no watermark, and unlimited conversions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I convert multiple PNG images into one PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. You can select multiple PNG images and combine them into a single PDF document with customizable page size and orientation.",
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
                { "@type": "ListItem", position: 3, name: "PNG to PDF", item: "https://local2pdf.com/tools/png-to-pdf" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
