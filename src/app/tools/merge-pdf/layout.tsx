import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF Locally — Private, No Upload | LocalPDF",
  description:
    "Combine multiple PDF files into one document privately in your browser. No upload, no signup, no watermark. Rearrange pages before merging.",
  alternates: { canonical: "https://local2pdf.com/tools/merge-pdf" },
  openGraph: {
    title: "Merge PDF Locally — Private, No Upload | LocalPDF",
    description:
      "Combine multiple PDFs into one file. All processing happens in your browser — your files stay on your device.",
    url: "https://local2pdf.com/tools/merge-pdf",
    type: "website",
  },
};

export default function MergePdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "LocalPDF — Merge PDF",
              description:
                "Combine multiple PDF files into one document privately in your browser. No upload, no signup, no watermark.",
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
                { "@type": "ListItem", position: 3, name: "Merge PDF", item: "https://local2pdf.com/tools/merge-pdf" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
