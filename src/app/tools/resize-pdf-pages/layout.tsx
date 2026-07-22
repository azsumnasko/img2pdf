import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resize PDF Pages Locally — Change Page Size Free | LocalPDF",
  description:
    "Resize PDF pages to standard formats (A4, A3, Letter, Legal) or custom dimensions. Scale to fit or center without scaling — all in your browser.",
  alternates: { canonical: "https://local2pdf.com/tools/resize-pdf-pages" },
  openGraph: {
    title: "Resize PDF Pages Locally — Change Page Size Free | LocalPDF",
    description:
      "Resize PDF pages to A4, Letter, or custom sizes. Scale to fit or center content. Free, private, browser-based.",
    url: "https://local2pdf.com/tools/resize-pdf-pages",
    type: "website",
  },
};

export default function ResizePdfPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "LocalPDF — Resize PDF Pages",
              description:
                "Resize PDF pages to standard or custom sizes privately in your browser. No upload, no signup.",
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
                { "@type": "ListItem", position: 3, name: "Resize PDF Pages", item: "https://local2pdf.com/tools/resize-pdf-pages" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
