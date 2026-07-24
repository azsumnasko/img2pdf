import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Render PDF Pages as Images (Beta)",
  description:
    "Render PDF pages to high-resolution PNGs right in your browser. No upload, no signup — all processing stays on your device.",
  robots: { index: false },
  alternates: { canonical: "https://local2pdf.com/tools/extract-images-from-pdf" },
  openGraph: {
    title: "Render PDF Pages as Images (Beta)",
    description:
      "Render any PDF page to a high-resolution PNG. Free, private, and runs entirely in your browser.",
    url: "https://local2pdf.com/tools/extract-images-from-pdf",
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

export default function ExtractImagesFromPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Local2PDF — Render PDF Pages as Images (Beta)",
              description:
                "Extract images from PDF pages as high-resolution PNGs privately in your browser. No upload, no signup.",
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
                { "@type": "ListItem", position: 3, name: "Extract Images from PDF", item: "https://local2pdf.com/tools/extract-images-from-pdf" },
              ],
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "What image format is used for extraction?", "acceptedAnswer": { "@type": "Answer", "text": "Pages are rendered and exported as high-resolution PNG images. You can adjust the output resolution for quality vs. file size." } },
                { "@type": "Question", "name": "Can I extract images from all pages at once?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Select 'All pages' to extract every page as a separate image, or pick individual pages to extract only the ones you need." } },
                { "@type": "Question", "name": "Will the extracted images include text as well?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Each page is rendered as a whole, so all visible content including text, images, and graphics is captured in the output." } },
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
