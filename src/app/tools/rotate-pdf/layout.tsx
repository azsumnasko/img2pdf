import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rotate PDF Pages Locally — Private & Free",
  description:
    "Rotate PDF pages left, right, or 180° in your browser. No upload, no signup, no watermark. Fix upside-down or sideways pages fast.",
  alternates: { canonical: "https://local2pdf.com/tools/rotate-pdf" },
  openGraph: {
  title: "Rotate PDF Pages Locally — Private & Free",
    description:
      "Rotate individual or all pages in a PDF. Free, private, and runs entirely in your browser.",
    url: "https://local2pdf.com/tools/rotate-pdf",
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

export default function RotatePdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Local2PDF — Rotate PDF Pages",
              description:
                "Rotate PDF pages 90°, 180°, or 270° privately in your browser. No upload, no signup, no watermark.",
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
                { "@type": "ListItem", position: 3, name: "Rotate PDF", item: "https://local2pdf.com/tools/rotate-pdf" },
              ],
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "What rotation angles are supported?", "acceptedAnswer": { "@type": "Answer", "text": "You can rotate pages 90\u00B0 clockwise, 90\u00B0 counter-clockwise, or 180\u00B0 (upside-down)." } },
                { "@type": "Question", "name": "Can I rotate only specific pages?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can select individual pages to rotate, or apply the same rotation to all pages at once." } },
                { "@type": "Question", "name": "Will rotation affect the PDF quality?", "acceptedAnswer": { "@type": "Answer", "text": "No. Rotation only changes the page orientation metadata. The original content and quality are fully preserved." } },
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
