import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Delete PDF Pages Locally — Remove Pages Free",
  description:
    "Remove unwanted pages from a PDF directly in your browser. No upload, no signup, no watermark. Select and delete pages fast.",
  alternates: { canonical: "https://local2pdf.com/tools/delete-pdf-pages" },
  openGraph: {
  title: "Delete PDF Pages Locally — Remove Pages Free",
    description:
      "Remove pages from any PDF. Free, private, and runs entirely in your browser. Your files never leave your device.",
    url: "https://local2pdf.com/tools/delete-pdf-pages",
    type: "website",
    images: [
      {
        url: "/og/delete-pdf-pages.png",
        width: 1200,
        height: 630,
        alt: "Local2PDF — Private PDF tools in your browser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delete PDF Pages Locally — Remove Pages Free",
    description: "Remove pages from any PDF. Free, private, and runs entirely in your browser. Your files never leave your device.",
    images: ["/og/delete-pdf-pages.png"],
  },

};

export default function DeletePdfPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "@id": "https://local2pdf.com/tools/delete-pdf-pages#webapp",
              url: "https://local2pdf.com/tools/delete-pdf-pages",
              name: "Local2PDF — Delete PDF Pages",
              description:
                "Remove unwanted pages from a PDF privately in your browser. No upload, no signup, no watermark.",
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
                { "@type": "ListItem", position: 3, name: "Delete PDF Pages", item: "https://local2pdf.com/tools/delete-pdf-pages" },
              ],
            },
            {
              "@context": "https://schema.org", "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "How do I select pages to delete?", "acceptedAnswer": { "@type": "Answer", "text": "Click on any page thumbnail to mark it for deletion. You can select multiple pages and review your selection before confirming." } },
                { "@type": "Question", "name": "Can I recover deleted pages?", "acceptedAnswer": { "@type": "Answer", "text": "Pages are only removed when you download the new file. Your original PDF is never modified, so you can always go back to it." } },
                { "@type": "Question", "name": "Is the deletion permanent?", "acceptedAnswer": { "@type": "Answer", "text": "No. The original file on your device is untouched. Only the downloaded copy will have the pages removed." } },
                { "@type": "Question", "name": "Are my files uploaded to Local2PDF servers?", "acceptedAnswer": { "@type": "Answer", "text": "No. All processing happens entirely in your browser. Your files never leave your device." } },
                { "@type": "Question", "name": "Is this tool free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All Local2PDF tools are completely free. No signup, no watermark, and unlimited use." } }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to delete PDF pages",
              "description": "Remove unwanted pages from a PDF directly in your browser. No upload, no signup, no watermark. Select and delete pages fast.",
              "step": [
                {
                  "@type": "HowToStep",
                  "position": 1,
                  "name": "Select your PDF",
                  "text": "Click or drag and drop the PDF you want to remove pages from."
                },
                {
                  "@type": "HowToStep",
                  "position": 2,
                  "name": "Check pages to delete",
                  "text": "Select the pages you want to remove by checking their boxes. You can select all or individual pages."
                },
                {
                  "@type": "HowToStep",
                  "position": 3,
                  "name": "Download the edited PDF",
                  "text": "Click Delete and download your PDF without the removed pages — all in your browser."
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
