import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to PNG Locally — No Upload, Lossless Quality | Local2PDF",
  description:
    "Convert PDF pages to lossless PNG images. Perfect for diagrams, text, and screenshots. All processing happens in your browser — no upload, no signup, no watermark.",
  alternates: { canonical: "https://local2pdf.com/tools/pdf-to-png" },
  openGraph: {
    title: "PDF to PNG Locally — No Upload, Lossless Quality | Local2PDF",
    description:
      "Render PDF pages as PNG images privately. Lossless quality, adjustable DPI. No upload, no signup, no watermark.",
    url: "https://local2pdf.com/tools/pdf-to-png",
    type: "website",
  },
};

export default function PdfToPngLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Local2PDF — PDF to PNG Converter",
              description:
                "Convert PDF pages to PNG images locally in your browser. Lossless quality, adjustable DPI. No upload, no signup, no watermark.",
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
                  name: "Are my PDF files uploaded to Local2PDF servers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All PDF rendering and PNG conversion happens entirely in your browser using local web APIs. Your files are never uploaded to our servers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What DPI resolution should I use for PDF to PNG?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "200 DPI delivers sharp results for diagrams and text. For print-quality output, select 300 DPI. Use 150 DPI for web sharing, and 96 DPI for quick previews or thumbnails.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is PDF to PNG conversion free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Local2PDF is completely free. There is no signup, no watermark, and unlimited conversions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does PNG preserve text sharpness better than JPG?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. PNG uses lossless compression, so text, line art, and diagrams appear crisp without compression artifacts. PNG is ideal for documents containing text, charts, or screenshots.",
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
                { "@type": "ListItem", position: 3, name: "PDF to PNG", item: "https://local2pdf.com/tools/pdf-to-png" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
