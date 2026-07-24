import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "HEIC to PDF Locally — Private & Free",
  description:
    "Convert HEIC images (iPhone/iPad photos) to PDF locally in your browser. Adjust page size, orientation, and margins. No upload, no signup.",
  alternates: { canonical: "https://local2pdf.com/tools/heic-to-pdf" },
  openGraph: {
  title: "HEIC to PDF Locally — Private & Free",
    description:
      "Convert HEIC iPhone photos to PDF privately. No upload, no signup, no watermark — all processing happens locally.",
    url: "https://local2pdf.com/tools/heic-to-pdf",
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

export default function HeicToPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Local2PDF — HEIC to PDF Converter",
              description:
                "Convert HEIC images (Apple/iPhone photos) to PDF locally in your browser. No upload, no signup, no watermark.",
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
                  name: "Are my HEIC files uploaded to Local2PDF servers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All HEIC to PDF conversion happens entirely in your browser using local web APIs. Your files are never uploaded to our servers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I convert HEIC Live Photos to PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "HEIC Live Photos are converted using the still image portion. The motion component is not included in the resulting PDF.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is HEIC to PDF conversion free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Local2PDF is completely free. There is no signup, no watermark, and unlimited conversions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What devices support HEIC conversion?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "HEIC to PDF works in browsers that support the HEIC image format, including Safari on macOS and iOS, and recent versions of Chrome and Edge.",
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
                { "@type": "ListItem", position: 3, name: "HEIC to PDF", item: "https://local2pdf.com/tools/heic-to-pdf" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
