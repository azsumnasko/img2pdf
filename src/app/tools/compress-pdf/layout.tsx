import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress PDF Locally — Reduce File Size | Local2PDF",
  description:
    "Compress PDF files to reduce file size without upload. Lossy and safe compression modes — all processing stays on your device.",
  alternates: { canonical: "https://local2pdf.com/tools/compress-pdf" },
  openGraph: {
    title: "Compress PDF Locally — Reduce File Size | Local2PDF",
    description:
      "Compress PDF files to save space while keeping quality. Reduce file size entirely in your browser. Free and private.",
    url: "https://local2pdf.com/tools/compress-pdf",
    type: "website",
  },
};

export default function CompressPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Local2PDF — Compress PDF",
              description:
                "Compress PDF files to save space. Private, browser-based compression with no uploads.",
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
                { "@type": "ListItem", position: 3, name: "Compress PDF", item: "https://local2pdf.com/tools/compress-pdf" },
              ],
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "What is the difference between lossy and safe compression?", "acceptedAnswer": { "@type": "Answer", "text": "Safe compression reduces file size without visible quality loss. Lossy compression achieves smaller files by re-encoding images, which may slightly reduce quality." } },
                { "@type": "Question", "name": "How much can a PDF be compressed?", "acceptedAnswer": { "@type": "Answer", "text": "Results vary by content. Image-heavy PDFs can shrink by 50-80% with lossy compression, while text-only PDFs may see smaller reductions." } },
                { "@type": "Question", "name": "Is my file private during compression?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All compression is performed locally in your browser. Your PDF is never uploaded to any server." } }
              ]
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
