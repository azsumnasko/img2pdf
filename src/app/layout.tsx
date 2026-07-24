import type { Metadata } from "next";
import { AppHeader } from "@/components/tool/AppHeader";
import { Footer } from "@/components/content/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Local2PDF — Private PDF Tools",
    template: "%s | Local2PDF",
  },
  description:
    "Free PDF tools that work privately in your browser. Merge, split, rotate, convert, and compress PDFs. No uploads, no signup, no watermark. Image-to-PDF: up to 25 pages per conversion.",
  metadataBase: new URL("https://local2pdf.com"),
  openGraph: {
    type: "website",
    siteName: "Local2PDF",
    title: "Local2PDF — Private PDF Tools | No Upload",
    description:
      "Free private PDF tools in your browser. Merge, split, rotate, convert, and compress — files never leave your device.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Local2PDF — Private PDF tools in your browser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local2PDF — Private PDF Tools",
    description: "Free PDF tools that work privately in your browser. Merge, split, rotate, convert, and compress PDFs. No uploads, no signup.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://local2pdf.com/#organization",
                name: "Local2PDF",
                url: "https://local2pdf.com/",
                logo: "https://local2pdf.com/icons/icon-512.svg",
                description:
                  "Privacy-first browser PDF tools that process supported files locally on the user's device.",
                email: "support@local2pdf.com",
                sameAs: [
                  "https://github.com/azsumnasko/img2pdf",
                  "https://www.producthunt.com/products/local2pdf",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://local2pdf.com/#website",
                url: "https://local2pdf.com/",
                name: "Local2PDF",
                publisher: { "@id": "https://local2pdf.com/#organization" },
              },
            ]),
          }}
        />
        <AppHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
