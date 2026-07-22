import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "N-Up PDF Locally — Multiple Pages Per Sheet | LocalPDF",
  description:
    "Arrange multiple PDF pages on a single sheet. Create 2-up, 4-up, or 8-up layouts with adjustable padding. No upload, no signup.",
  alternates: { canonical: "https://local2pdf.com/tools/n-up-pdf" },
  openGraph: {
    title: "N-Up PDF Locally — Multiple Pages Per Sheet | LocalPDF",
    description:
      "Combine multiple PDF pages onto one sheet with N-up layouts. Choose 2-up, 4-up, 6-up, 8-up, or 9-up. Free, private, browser-based.",
    url: "https://local2pdf.com/tools/n-up-pdf",
    type: "website",
  },
};

export default function NUpPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "LocalPDF — N-Up PDF",
              description:
                "Create N-up PDFs with multiple pages per sheet. Private, browser-based processing with no uploads.",
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
                { "@type": "ListItem", position: 3, name: "N-Up PDF", item: "https://local2pdf.com/tools/n-up-pdf" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
