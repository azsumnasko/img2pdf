import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "JPG to PDF Locally — Private & Free",
  description:
    "Convert JPG images to PDF locally in your browser. Adjust page size, orientation, and margins. No upload, no signup, no watermark — your files stay private.",
  alternates: { canonical: "https://local2pdf.com/tools/jpg-to-pdf" },
  openGraph: {
  title: "JPG to PDF Locally — Private & Free",
    description:
      "Convert JPG images to PDF privately. Customize page size and layout. No upload, no signup, no watermark.",
    url: "https://local2pdf.com/tools/jpg-to-pdf",
    type: "website",
    images: [
      {
        url: "/og/jpg-to-pdf.png",
        width: 1200,
        height: 630,
        alt: "Local2PDF — Convert JPG to PDF",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PDF Locally — Private & Free",
    description: "Convert JPG images to PDF privately. Customize page size and layout. No upload, no signup, no watermark.",
    images: ["/og/jpg-to-pdf.png"],
  },

};

export default function JpgToPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "@id": "https://local2pdf.com/tools/jpg-to-pdf#webapp",
              url: "https://local2pdf.com/tools/jpg-to-pdf",
              name: "Local2PDF — JPG to PDF Converter",
              description:
                "Convert JPG images to PDF locally in your browser. Adjust page size, orientation, and margins. No upload, no signup, no watermark.",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "All",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              browserRequirements: "Requires JavaScript and Canvas API support",
            },
            {
              "@context": "https://schema.org", "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Are my JPG files uploaded to Local2PDF servers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All JPG to PDF conversion happens entirely in your browser using local web APIs. Your files are never uploaded to our servers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I convert multiple JPG images into one PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. You can select multiple JPG images and combine them into a single PDF document. You can also reorder the images before conversion.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is JPG to PDF conversion free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Local2PDF is completely free. There is no signup, no watermark, and unlimited conversions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I customize the PDF page size for JPG images?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. You can choose from standard page sizes (A4, Letter, etc.) or fit the page to each image. You can also adjust orientation and margins.",
                  },
                },
              ],
            },
            {
              "@context": "https://schema.org", "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://local2pdf.com" },
                { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://local2pdf.com/pdf-tools" },
                { "@type": "ListItem", position: 3, name: "JPG to PDF", item: "https://local2pdf.com/tools/jpg-to-pdf" },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Convert JPG to PDF",
              "description": "Convert JPG images to PDF locally in your browser. Adjust page size, orientation, and margins. No upload, no signup, no watermark — your files stay private.",
              "step": [
                {
                  "@type": "HowToStep",
                  "position": 1,
                  "name": "Select your JPEG images",
                  "text": "Click, drag and drop, or paste from clipboard. Mix multiple JPGs in one batch."
                },
                {
                  "@type": "HowToStep",
                  "position": 2,
                  "name": "Arrange pages",
                  "text": "Drag to reorder pages and rotate individual images before conversion."
                },
                {
                  "@type": "HowToStep",
                  "position": 3,
                  "name": "Choose settings",
                  "text": "Pick page size (A4, US Letter, fit to image), margins, orientation, and quality."
                },
                {
                  "@type": "HowToStep",
                  "position": 4,
                  "name": "Convert and download",
                  "text": "Your PDF is built on your device and downloads instantly — never uploaded."
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
