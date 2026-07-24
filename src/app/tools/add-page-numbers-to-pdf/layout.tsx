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
    images: [
      {
        url: "/og/add-page-numbers-to-pdf.png",
        width: 1200,
        height: 630,
        alt: "Local2PDF — Private PDF tools in your browser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Page Numbers to PDF Locally — Free & Private",
    description: "Insert page numbers into your PDF with full control over position, style, and format. Private, browser-based processing.",
    images: ["/og/add-page-numbers-to-pdf.png"],
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
              "@type": "WebApplication",
              "@id": "https://local2pdf.com/tools/add-page-numbers-to-pdf#webapp",
              url: "https://local2pdf.com/tools/add-page-numbers-to-pdf",
              name: "Local2PDF — Add Page Numbers to PDF",
              description:
                "Add customizable page numbers to PDF files privately in your browser. No upload, no signup, no watermark.",
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
                { "@type": "ListItem", position: 3, name: "Add Page Numbers", item: "https://local2pdf.com/tools/add-page-numbers-to-pdf" },
              ],
            },
            {
              "@context": "https://schema.org", "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "Where can I position page numbers?", "acceptedAnswer": { "@type": "Answer", "text": "You can place numbers at the top or bottom of the page, aligned left, center, or right. Margins and starting page are also configurable." } },
                { "@type": "Question", "name": "Can I customize the number format?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can change the font, font size, color, and prefix/suffix text (e.g., 'Page 1 of 10')." } },
                { "@type": "Question", "name": "Will adding page numbers overwrite existing content?", "acceptedAnswer": { "@type": "Answer", "text": "No. Page numbers are added as a new layer and are placed in the margin area, so they will not overlap with existing page content." } },
                { "@type": "Question", "name": "Are my files uploaded to Local2PDF servers?", "acceptedAnswer": { "@type": "Answer", "text": "No. All processing happens entirely in your browser. Your files never leave your device." } },
                { "@type": "Question", "name": "Is this tool free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All Local2PDF tools are completely free. No signup, no watermark, and unlimited use." } }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to add page numbers to a PDF",
              "description": "Add page numbers to any PDF with customizable position, alignment, format, and color. No upload, no signup — all in your browser.",
              "step": [
                {
                  "@type": "HowToStep",
                  "position": 1,
                  "name": "Select your PDF",
                  "text": "Select the PDF file you want to add page numbers to."
                },
                {
                  "@type": "HowToStep",
                  "position": 2,
                  "name": "Customize numbering",
                  "text": "Choose position, alignment, format, font size, color, and start page."
                },
                {
                  "@type": "HowToStep",
                  "position": 3,
                  "name": "Download the result",
                  "text": "Download your PDF with page numbers added — all done in your browser."
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
