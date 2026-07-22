import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Page Numbers to PDF Locally — Free & Private | LocalPDF",
  description:
    "Add page numbers to any PDF with customizable position, alignment, format, and color. No upload, no signup — all in your browser.",
  alternates: { canonical: "https://local2pdf.com/tools/add-page-numbers-to-pdf" },
  openGraph: {
    title: "Add Page Numbers to PDF Locally — Free & Private | LocalPDF",
    description:
      "Insert page numbers into your PDF with full control over position, style, and format. Private, browser-based processing.",
    url: "https://local2pdf.com/tools/add-page-numbers-to-pdf",
    type: "website",
  },
};

export default function AddPageNumbersToPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "LocalPDF — Add Page Numbers to PDF",
              description:
                "Add customizable page numbers to PDF files privately in your browser. No upload, no signup, no watermark.",
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
                { "@type": "ListItem", position: 3, name: "Add Page Numbers", item: "https://local2pdf.com/tools/add-page-numbers-to-pdf" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
