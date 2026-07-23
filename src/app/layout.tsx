import type { Metadata } from "next";
import { AppHeader } from "@/components/tool/AppHeader";
import { Footer } from "@/components/content/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Local2PDF — Convert Images to PDF Privately and Free",
    template: "%s | Local2PDF",
  },
  description:
    "Convert JPG, PNG, and WebP images to PDF privately. No upload, no signup, no watermark. Free for up to 25 pages per conversion.",
  metadataBase: new URL("https://local2pdf.com"),
  openGraph: {
    type: "website",
    siteName: "Local2PDF",
    title: "Local2PDF — Convert Images to PDF Privately and Free",
    description:
      "Convert images to PDF entirely in your browser. Your files never leave your device.",
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
