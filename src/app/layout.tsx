import type { Metadata } from "next";
import { AppHeader } from "@/components/tool/AppHeader";
import { Footer } from "@/components/content/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LocalPDF — Convert Images to PDF Privately and Free",
    template: "%s | LocalPDF",
  },
  description:
    "Convert JPG, PNG, and WebP images to PDF privately. No upload, no signup, no watermark. Free for up to 25 pages per conversion.",
  metadataBase: new URL("https://local2pdf.com"),
  openGraph: {
    type: "website",
    siteName: "LocalPDF",
    title: "LocalPDF — Convert Images to PDF Privately and Free",
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
        <AppHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
