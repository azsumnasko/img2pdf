import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotate PDF Pages Locally — Private & Free | LocalPDF",
  description:
    "Rotate PDF pages left, right, or 180° in your browser. No upload, no signup, no watermark. Fix upside-down or sideways pages fast.",
  alternates: { canonical: "https://local2pdf.com/tools/rotate-pdf" },
  openGraph: {
    title: "Rotate PDF Pages Locally — Private & Free | LocalPDF",
    description:
      "Rotate individual or all pages in a PDF. Free, private, and runs entirely in your browser.",
    url: "https://local2pdf.com/tools/rotate-pdf",
    type: "website",
  },
};

export default function RotatePdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "LocalPDF — Rotate PDF Pages",
              description:
                "Rotate PDF pages 90°, 180°, or 270° privately in your browser. No upload, no signup, no watermark.",
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
                { "@type": "ListItem", position: 3, name: "Rotate PDF", item: "https://local2pdf.com/tools/rotate-pdf" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
