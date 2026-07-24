import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Convert Images to PDF — Private & Free",
  description:
    "Convert JPG, PNG, WebP, and HEIC to PDF free. Combine up to 25 images into one PDF. No signup, no watermark, no upload. Your files stay on your device.",
  alternates: { canonical: "https://local2pdf.com/tools/image-to-pdf" },
  openGraph: {
  title: "Convert Images to PDF — Private & Free",
    description:
      "Convert images to PDF privately. No upload, no signup, no watermark. Free for up to 25 pages per conversion.",
    url: "https://local2pdf.com/tools/image-to-pdf",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Local2PDF — Private PDF tools in your browser",
      },
    ],
  },
};

export default function ImageToPdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Local2PDF — Image to PDF Converter",
              description:
                "Convert JPG, PNG, WebP, and HEIC images to PDF privately in your browser. No upload, no signup, no watermark.",
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
                  name: "Are my images uploaded to Local2PDF servers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All image processing happens entirely in your browser using local web APIs. Your files are never uploaded to our servers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which image formats can I convert to PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Local2PDF supports JPEG, PNG, WebP, and HEIC images. You can convert up to 25 images at once into a single PDF.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Local2PDF free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Local2PDF is completely free. There is no signup, no watermark, and unlimited conversions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I convert images to PDF on my phone?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Local2PDF works on mobile browsers including iPhone Safari and Android Chrome.",
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
                { "@type": "ListItem", position: 3, name: "Image to PDF", item: "https://local2pdf.com/tools/image-to-pdf" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
