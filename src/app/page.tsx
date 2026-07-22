import { HowItWorks } from "@/components/content/HowItWorks";
import { FAQ } from "@/components/content/FAQ";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";
import { DEFAULT_CONFIG } from "@/features/image-to-pdf/config";
import { AdSlot } from "@/components/ads/AdSlot";
import { MakerPromo } from "@/components/content/MakerPromo";
import Link from "next/link";

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
          <span className="limit-badge">Free: up to {DEFAULT_CONFIG.maxPagesPerJob} pages per conversion. Unlimited conversions.</span>
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
          LocalPDF processes all files directly in your browser. Your documents never leave
          your device — no uploads, no server processing. This means faster conversion,
          complete privacy, and no signup required. Every tool works the same way: select your
          file, make your changes, and download the result. Everything stays on your device.
        </p>
      </section>

      <FAQ />

      {DEFAULT_CONFIG.enableAds && <AdSlot id="home-content-2" />}

      <MakerPromo />
    </main>
  );
}
