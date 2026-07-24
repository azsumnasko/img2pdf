import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PDF to JPG Locally — No Upload, High Quality",
  description:
    "Convert PDF pages to high-quality JPG images. Choose resolution (up to 300 DPI) and quality. All processing happens in your browser — no upload, no signup, no watermark.",
  alternates: { canonical: "https://local2pdf.com/tools/pdf-to-jpg" },
  openGraph: {
  title: "PDF to JPG Locally — No Upload, High Quality",
    description:
      "Render PDF pages as JPG images privately. Adjust DPI and quality. No upload, no signup, no watermark.",
    url: "https://local2pdf.com/tools/pdf-to-jpg",
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

export default function PdfToJpgLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Local2PDF — PDF to JPG Converter",
              description:
                "Convert PDF pages to JPG images locally in your browser. Choose DPI and quality. No upload, no signup, no watermark.",
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
                    text: "No. All PDF rendering and image conversion happens entirely in your browser using local web APIs. Your files are never uploaded to our servers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What DPI should I choose for PDF to JPG conversion?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "150 DPI is a good balance of quality and file size for most uses. Use 300 DPI for print-quality output, 200 DPI for presentations, and 96 DPI for quick previews or web use.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is PDF to JPG conversion free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Local2PDF is completely free. There is no signup, no watermark, and unlimited conversions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I convert password-protected PDFs to JPG?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Password-protected PDFs cannot be processed. You must unlock or remove the password before using this tool.",
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
                { "@type": "ListItem", position: 3, name: "PDF to JPG", item: "https://local2pdf.com/tools/pdf-to-jpg" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
