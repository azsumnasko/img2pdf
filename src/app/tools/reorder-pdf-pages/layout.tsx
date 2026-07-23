import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reorder PDF Pages Locally — Drag, Sort & Save | Local2PDF",
  description:
    "Rearrange PDF pages online in your browser. Move pages left or right to reorder. No upload, no signup, no watermark — your file stays private.",
  alternates: { canonical: "https://local2pdf.com/tools/reorder-pdf-pages" },
  openGraph: {
    title: "Reorder PDF Pages Locally — Drag, Sort & Save | Local2PDF",
    description:
      "Rearrange pages in any PDF. Free, private, and runs entirely in your browser. No file uploads.",
    url: "https://local2pdf.com/tools/reorder-pdf-pages",
    type: "website",
  },
};

export default function ReorderPdfPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Local2PDF — Reorder PDF Pages",
              description:
                "Rearrange PDF pages in your browser. Move pages to your desired order. Private — your files never leave your device.",
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
                { "@type": "ListItem", position: 3, name: "Reorder PDF Pages", item: "https://local2pdf.com/tools/reorder-pdf-pages" },
              ],
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "How do I reorder pages?", "acceptedAnswer": { "@type": "Answer", "text": "Simply drag and drop page thumbnails into your desired order. You can also use the move-left and move-right buttons." } },
                { "@type": "Question", "name": "Can I undo a reorder mistake?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can reset to the original page order at any time before saving, or re-drag pages back into position." } },
                { "@type": "Question", "name": "Is there a maximum number of pages I can reorder?", "acceptedAnswer": { "@type": "Answer", "text": "There is no fixed limit, but performance depends on your device. Large documents with hundreds of pages may be slower to render thumbnails." } }
              ]
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
