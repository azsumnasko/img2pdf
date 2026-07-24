import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crop PDF Pages Locally — Trim Margins Free",
  description:
    "Crop or trim margins from PDF pages. Remove whitespace and adjust page boundaries — all in your browser.",
  alternates: { canonical: "https://local2pdf.com/tools/crop-pdf" },
  openGraph: {
  title: "Crop PDF Pages Locally — Trim Margins Free",
    description:
      "Crop and trim PDF page margins. Resize pages by removing unwanted whitespace. Free, private, browser-based.",
    url: "https://local2pdf.com/tools/crop-pdf",
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

export default function CropPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Local2PDF — Crop PDF",
              description:
                "Crop and trim PDF page margins privately in your browser. No upload, no signup, no watermark.",
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
                { "@type": "ListItem", position: 3, name: "Crop PDF", item: "https://local2pdf.com/tools/crop-pdf" },
              ],
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "Can I preview the crop before applying?", "acceptedAnswer": { "@type": "Answer", "text": "Crop margins are entered as numeric values (in mm) on each side. Visual crop selection is under development." } },
                { "@type": "Question", "name": "Does cropping permanently remove content?", "acceptedAnswer": { "@type": "Answer", "text": "No. Cropping changes the visible page area (crop box). Content outside the crop box is hidden but still present in the file." } },
                { "@type": "Question", "name": "Can I apply the same crop to all pages?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can define crop margins once and apply them uniformly to every page, or adjust each page individually." } },
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
