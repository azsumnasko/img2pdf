import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebP to PDF Locally — Private & Free | Local2PDF",
  description:
    "Convert WebP images to PDF locally in your browser. Adjust page size, orientation, and margins. No upload, no signup, no watermark.",
  alternates: { canonical: "https://local2pdf.com/tools/webp-to-pdf" },
  openGraph: {
    title: "WebP to PDF Locally — Private & Free | Local2PDF",
    description:
      "Convert WebP images to PDF privately. Customize layout and page size. No upload, no signup, no watermark.",
    url: "https://local2pdf.com/tools/webp-to-pdf",
    type: "website",
  },
};

export default function WebpToPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Local2PDF — WebP to PDF Converter",
              description:
                "Convert WebP images to PDF locally in your browser. Supports both lossy and lossless WebP. No upload, no signup, no watermark.",
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
                  name: "Are my WebP files uploaded to Local2PDF servers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All WebP to PDF conversion happens entirely in your browser using local web APIs. Your files are never uploaded to our servers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does WebP to PDF support both lossy and lossless WebP images?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Local2PDF handles both lossy and lossless WebP images, including those with transparency, and converts them to PDF.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is WebP to PDF conversion free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Local2PDF is completely free. There is no signup, no watermark, and unlimited conversions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I convert multiple WebP images into one PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. You can select multiple WebP images and combine them into a single PDF document. You can also reorder the images before conversion.",
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
                { "@type": "ListItem", position: 3, name: "WebP to PDF", item: "https://local2pdf.com/tools/webp-to-pdf" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
