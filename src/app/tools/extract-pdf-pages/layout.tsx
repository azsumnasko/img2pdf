import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extract PDF Pages Locally — Private & Free | LocalPDF",
  description:
    "Extract specific pages from a PDF into a new file. No upload, no signup, no watermark. Select pages and extract in your browser.",
  alternates: { canonical: "https://local2pdf.com/tools/extract-pdf-pages" },
  openGraph: {
    title: "Extract PDF Pages Locally — Private & Free | LocalPDF",
    description:
      "Extract pages from any PDF. Combine into one file or get separate pages. Free, private, browser-based.",
    url: "https://local2pdf.com/tools/extract-pdf-pages",
    type: "website",
  },
};

export default function ExtractPdfPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "LocalPDF — Extract PDF Pages",
              description:
                "Extract specific pages from a PDF privately in your browser. Combine into one PDF or get separate files.",
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
                { "@type": "ListItem", position: 3, name: "Extract PDF Pages", item: "https://local2pdf.com/tools/extract-pdf-pages" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
