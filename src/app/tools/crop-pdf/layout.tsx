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
                { "@type": "Question", "name": "Can I preview the crop before applying?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Each page is rendered as a thumbnail so you can visually adjust the crop boundaries and see the result in real time." } },
                { "@type": "Question", "name": "Does cropping permanently remove content?", "acceptedAnswer": { "@type": "Answer", "text": "No. Cropping changes the visible page area (crop box). Content outside the crop box is hidden but still present in the file." } },
                { "@type": "Question", "name": "Can I apply the same crop to all pages?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can define crop margins once and apply them uniformly to every page, or adjust each page individually." } }
              ]
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
