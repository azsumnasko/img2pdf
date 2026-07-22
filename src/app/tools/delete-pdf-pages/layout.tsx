import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete PDF Pages Locally — Remove Pages Free | LocalPDF",
  description:
    "Remove unwanted pages from a PDF directly in your browser. No upload, no signup, no watermark. Select and delete pages fast.",
  alternates: { canonical: "https://local2pdf.com/tools/delete-pdf-pages" },
  openGraph: {
    title: "Delete PDF Pages Locally — Remove Pages Free | LocalPDF",
    description:
      "Remove pages from any PDF. Free, private, and runs entirely in your browser. Your files never leave your device.",
    url: "https://local2pdf.com/tools/delete-pdf-pages",
    type: "website",
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
              "@type": "SoftwareApplication",
              name: "LocalPDF — Delete PDF Pages",
              description:
                "Remove unwanted pages from a PDF privately in your browser. No upload, no signup, no watermark.",
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
                { "@type": "ListItem", position: 3, name: "Delete PDF Pages", item: "https://local2pdf.com/tools/delete-pdf-pages" },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
