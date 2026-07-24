import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compress PDF Locally — Reduce File Size",
  description:
    "Compress PDF files to reduce file size without upload. All processing stays on your device.",
  alternates: { canonical: "https://local2pdf.com/tools/compress-pdf" },
  openGraph: {
  title: "Compress PDF Locally — Reduce File Size",
    description:
      "Compress PDF files to reduce file size. Processing happens entirely in your browser. Free and private.",
    url: "https://local2pdf.com/tools/compress-pdf",
    type: "website",
    images: [
      {
        url: "/og/compress-pdf.png",
        width: 1200,
        height: 630,
        alt: "Local2PDF — Private PDF tools in your browser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Locally — Reduce File Size",
    description: "Compress PDF files to reduce file size. Processing happens entirely in your browser. Free and private.",
    images: ["/og/compress-pdf.png"],
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
              "@type": "WebApplication",
              "@id": "https://local2pdf.com/tools/compress-pdf#webapp",
              url: "https://local2pdf.com/tools/compress-pdf",
              name: "Local2PDF — Compress PDF",
              description:
                "Compress PDF files to save space. Private, browser-based compression with no uploads.",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "All",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              browserRequirements: "Requires JavaScript",
            },
            {
              "@context": "https://schema.org", "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://local2pdf.com" },
                { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://local2pdf.com/pdf-tools" },
                { "@type": "ListItem", position: 3, name: "Compress PDF", item: "https://local2pdf.com/tools/compress-pdf" },
              ],
            },
            {
              "@context": "https://schema.org", "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "How does compression work?", "acceptedAnswer": { "@type": "Answer", "text": "Compression is performed as a single action. Safe optimization reduces overhead. The tool will warn you if the output is larger than the original." } },
                { "@type": "Question", "name": "How much can a PDF be compressed?", "acceptedAnswer": { "@type": "Answer", "text": "Results vary significantly by document. Some PDFs see meaningful reduction; already-optimized files may not shrink. The tool will warn if the output is larger." } },
                { "@type": "Question", "name": "Is my file private during compression?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All compression is performed locally in your browser. Your PDF is never uploaded to any server." } }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to compress a PDF",
              "description": "Compress PDF files to reduce file size without upload. All processing stays on your device.",
              "step": [
                {
                  "@type": "HowToStep",
                  "position": 1,
                  "name": "Select your PDF",
                  "text": "Choose the PDF file you want to compress — it stays in your browser."
                },
                {
                  "@type": "HowToStep",
                  "position": 2,
                  "name": "Compress",
                  "text": "Click \"Compress PDF\" and the tool optimizes internal structures to reduce file size."
                },
                {
                  "@type": "HowToStep",
                  "position": 3,
                  "name": "Compare & download",
                  "text": "See the size difference and download the compressed PDF — all done locally."
                }
              ]
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
