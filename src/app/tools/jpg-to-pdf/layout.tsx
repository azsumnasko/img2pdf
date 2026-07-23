import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to PDF Locally — Private & Free | Local2PDF",
  description:
    "Convert JPG images to PDF locally in your browser. Adjust page size, orientation, and margins. No upload, no signup, no watermark — your files stay private.",
  alternates: { canonical: "https://local2pdf.com/tools/jpg-to-pdf" },
  openGraph: {
    title: "JPG to PDF Locally — Private & Free | Local2PDF",
    description:
      "Convert JPG images to PDF privately. Customize page size and layout. No upload, no signup, no watermark.",
    url: "https://local2pdf.com/tools/jpg-to-pdf",
    type: "website",
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
              "@type": "SoftwareApplication",
              name: "Local2PDF — JPG to PDF Converter",
              description:
                "Convert JPG images to PDF locally in your browser. Adjust page size, orientation, and margins. No upload, no signup, no watermark.",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "All",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              browserRequirements: "Requires JavaScript and Canvas API support",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
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
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://local2pdf.com" },
                { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://local2pdf.com/pdf-tools" },
                { "@type": "ListItem", position: 3, name: "JPG to PDF", item: "https://local2pdf.com/tools/jpg-to-pdf" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
