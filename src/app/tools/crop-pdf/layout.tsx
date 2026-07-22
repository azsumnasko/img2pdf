import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crop PDF Pages Locally — Trim Margins Free | LocalPDF",
  description:
    "Crop or trim margins from PDF pages. Remove whitespace and adjust page boundaries — all in your browser.",
  alternates: { canonical: "https://local2pdf.com/tools/crop-pdf" },
  openGraph: {
    title: "Crop PDF Pages Locally — Trim Margins Free | LocalPDF",
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
              name: "LocalPDF — Crop PDF",
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
          ]),
        }}
      />
      {children}
    </>
  );
}
