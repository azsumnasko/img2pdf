import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reorder PDF Pages Locally — Drag, Sort & Save",
  description:
    "Rearrange PDF pages online in your browser. Move pages left or right to reorder. No upload, no signup, no watermark — your file stays private.",
  alternates: { canonical: "https://local2pdf.com/tools/reorder-pdf-pages" },
  openGraph: {
  title: "Reorder PDF Pages Locally — Drag, Sort & Save",
    description:
      "Rearrange pages in any PDF. Free, private, and runs entirely in your browser. No file uploads.",
    url: "https://local2pdf.com/tools/reorder-pdf-pages",
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

export default function ReorderPdfPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
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
                { "@type": "Question", "name": "Can I undo a reorder mistake?", "acceptedAnswer": { "@type": "Answer", "text": "You can use the arrow buttons to manually restore pages to their original position. Clicking Start Over clears the current session and lets you reload the file." } },
                { "@type": "Question", "name": "Is there a maximum number of pages I can reorder?", "acceptedAnswer": { "@type": "Answer", "text": "There is no fixed limit, but performance depends on your device. Large documents with hundreds of pages may be slower to render thumbnails." } },
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
