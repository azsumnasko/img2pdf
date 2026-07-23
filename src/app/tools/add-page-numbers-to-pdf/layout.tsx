import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Page Numbers to PDF Locally — Free & Private",
  description:
    "Add page numbers to any PDF with customizable position, alignment, format, and color. No upload, no signup — all in your browser.",
  alternates: { canonical: "https://local2pdf.com/tools/add-page-numbers-to-pdf" },
  openGraph: {
  title: "Add Page Numbers to PDF Locally — Free & Private",
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
              name: "Local2PDF — Add Page Numbers to PDF",
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
            {
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "Where can I position page numbers?", "acceptedAnswer": { "@type": "Answer", "text": "You can place numbers at the top or bottom of the page, aligned left, center, or right. Margins and starting page are also configurable." } },
                { "@type": "Question", "name": "Can I customize the number format?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can change the font, font size, color, and prefix/suffix text (e.g., 'Page 1 of 10')." } },
                { "@type": "Question", "name": "Will adding page numbers overwrite existing content?", "acceptedAnswer": { "@type": "Answer", "text": "No. Page numbers are added as a new layer and are placed in the margin area, so they will not overlap with existing page content." } }
              ]
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
