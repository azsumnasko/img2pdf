import type { Metadata } from "next";
import { HowItWorks } from "@/components/content/HowItWorks";
import { FAQ } from "@/components/content/FAQ";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { DEFAULT_CONFIG } from "@/features/image-to-pdf/config";
import { AdSlot } from "@/components/ads/AdSlot";
import { MakerPromo } from "@/components/content/MakerPromo";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "https://local2pdf.com" },
  openGraph: {
    title: "Local2PDF — Private PDF Tools & Image to PDF Converter",
    description:
      "Free PDF tools that work offline in your browser. Merge, split, rotate, and convert files — no uploads or signup required.",
    url: "https://local2pdf.com",
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

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="hero">
        <h1 className="hero-title">Private PDF Tools — Process Files on Your Device</h1>
        <p className="hero-subtitle">
          Merge, split, organize and convert PDF files directly in your browser. No uploads, no account and no watermark.
        </p>
        <div className="hero-badges">
          <PrivacyBadge />
          <span className="limit-badge">Image-to-PDF: up to {DEFAULT_CONFIG.maxPagesPerJob} images per conversion. PDF tools: device-dependent limits. Unlimited use.</span>
        </div>
        <div className="hero-actions">
          <Link href="/pdf-tools" className="btn btn--primary btn--large hero-cta">
            Choose a PDF Tool
          </Link>
          <Link href="/tools/image-to-pdf" className="btn btn--secondary btn--large">
            Convert Images to PDF
          </Link>
        </div>
      </section>

      <section className="popular-tools" aria-labelledby="popular-tools-title">
        <h2 id="popular-tools-title" className="section-title">Popular PDF Tools</h2>
        <div className="tools-grid">
          <Link href="/tools/merge-pdf" className="tool-card">
            <h3>Merge PDF</h3>
            <p>Combine multiple PDF files into one document</p>
          </Link>
          <Link href="/tools/split-pdf" className="tool-card">
            <h3>Split PDF</h3>
            <p>Extract pages or split into multiple files</p>
          </Link>
          <Link href="/tools/pdf-to-jpg" className="tool-card">
            <h3>PDF to JPG</h3>
            <p>Convert PDF pages to high-quality images</p>
          </Link>
          <Link href="/tools/image-to-pdf" className="tool-card">
            <h3>Images to PDF</h3>
            <p>Combine JPG, PNG, WebP, HEIC into PDF</p>
          </Link>
          <Link href="/tools/reorder-pdf-pages" className="tool-card">
            <h3>Reorder PDF Pages</h3>
            <p>Drag and drop to rearrange, rotate, and organize pages</p>
          </Link>
          <Link href="/tools/rotate-pdf" className="tool-card">
            <h3>Rotate PDF</h3>
            <p>Fix sideways pages in your document</p>
          </Link>
        </div>
      </section>

      <section className="improve-pdf-tools" aria-labelledby="improve-pdf-tools-title">
        <h2 id="improve-pdf-tools-title" className="section-title">Improve &amp; Prepare PDF</h2>
        <div className="tools-grid">
          <Link href="/tools/compress-pdf" className="tool-card">
            <h3>Compress PDF</h3>
            <p>Reduce file size without losing quality</p>
          </Link>
          <Link href="/tools/add-page-numbers-to-pdf" className="tool-card">
            <h3>Add Page Numbers</h3>
            <p>Insert page numbers into your PDF document</p>
          </Link>
          <Link href="/tools/resize-pdf-pages" className="tool-card">
            <h3>Resize PDF Pages</h3>
            <p>Change page dimensions to fit your needs</p>
          </Link>
          <Link href="/tools/crop-pdf" className="tool-card">
            <h3>Crop PDF</h3>
            <p>Trim margins and unwanted areas from pages</p>
          </Link>
        </div>
      </section>

      <section className="format-links" aria-labelledby="format-links-title">
        <h2 id="format-links-title">Convert Any Image Format to PDF</h2>
        <div className="format-links-grid">
          <Link href="/tools/jpg-to-pdf" className="format-link-card">JPG to PDF</Link>
          <Link href="/tools/png-to-pdf" className="format-link-card">PNG to PDF</Link>
          <Link href="/tools/webp-to-pdf" className="format-link-card">WebP to PDF</Link>
          <Link href="/tools/heic-to-pdf" className="format-link-card">HEIC to PDF</Link>
          <Link href="/tools/combine-images-to-pdf" className="format-link-card">Combine Images</Link>
          <Link href="/tools/screenshot-to-pdf" className="format-link-card">Screenshot to PDF</Link>
          <Link href="/tools/photos-to-pdf" className="format-link-card">Photos to PDF</Link>
          <Link href="/pdf-tools" className="format-link-card">All PDF Tools</Link>
        </div>
      </section>

      {DEFAULT_CONFIG.enableAds && <AdSlot id="home-content-1" />}

      <HowItWorks />

      <section className="privacy-section" aria-labelledby="privacy-title">
        <h2 id="privacy-title">Why Local Processing Matters</h2>
        <p>
          Local2PDF processes all files directly in your browser. Your documents never leave
          your device — no uploads, no server processing. This means faster conversion,
          complete privacy, and no signup required. Every tool works the same way: select your
          file, make your changes, and download the result. Everything stays on your device.
        </p>
      </section>

      <FAQ />

      {DEFAULT_CONFIG.enableAds && <AdSlot id="home-content-2" />}

      <MakerPromo />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Are my images uploaded to your servers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All image processing happens entirely in your browser. Your files never leave your device.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to create an account?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Local2PDF is free to use without any account, signup, or email address.",
                },
              },
              {
                "@type": "Question",
                name: "Is there a watermark on the output?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. There is no watermark, branding, or any other marking added to your PDF.",
                },
              },
              {
                "@type": "Question",
                name: "How many images can I convert at once?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The free version supports up to 25 pages per conversion. You can run unlimited conversions.",
                },
              },
              {
                "@type": "Question",
                name: "Which image formats are supported?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "JPEG, PNG, WebP, and HEIC images are supported.",
                },
              },
              {
                "@type": "Question",
                name: "What page sizes are available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can choose A4, A3, A5, US Letter, US Legal, fit to image, or enter custom dimensions.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use this offline?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. After your first visit, JPG, PNG, and WebP conversion works offline.",
                },
              },
              {
                "@type": "Question",
                name: "Is this tool free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Local2PDF is free to use with no hidden costs. The site is supported by advertising placed away from the tool controls.",
                },
              },
              {
                "@type": "Question",
                name: "Can I merge multiple PDF files?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Use the Merge PDF tool to combine several PDFs into a single document. Drag and drop to arrange the order before merging.",
                },
              },
              {
                "@type": "Question",
                name: "How do I split a PDF into separate pages?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Use the Split PDF tool to extract every page of a PDF as an individual file, or extract specific pages using the Extract Pages tool.",
                },
              },
              {
                "@type": "Question",
                name: "Can I rotate PDF pages?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The Rotate PDF tool lets you rotate individual pages or the entire document by 90, 180, or 270 degrees — all processed locally in your browser.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
