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
        <h1 className="hero-title">Convert Images to PDF — Private and Free</h1>
        <p className="hero-subtitle">
          Combine up to {DEFAULT_CONFIG.maxPagesPerJob} JPG, PNG, WebP, or HEIC images into one PDF. No signup, no watermark, and no file uploads.
        </p>
        <div className="hero-badges">
          <PrivacyBadge />
          <span className="limit-badge">Free: up to {DEFAULT_CONFIG.maxPagesPerJob} pages per conversion. Unlimited conversions.</span>
        </div>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large hero-cta">
          Start converting
        </Link>
      </section>

      <section className="format-links" aria-labelledby="format-links-title">
        <h2 id="format-links-title">Convert Any Image Format to PDF</h2>
        <div className="format-links-grid">
          <Link href="/tools/jpg-to-pdf" className="format-link-card">JPG to PDF</Link>
          <Link href="/tools/png-to-pdf" className="format-link-card">PNG to PDF</Link>
          <Link href="/tools/webp-to-pdf" className="format-link-card">WebP to PDF</Link>
          <Link href="/tools/heic-to-pdf" className="format-link-card">HEIC to PDF</Link>
          <Link href="/tools/combine-images-to-pdf" className="format-link-card">Combine Images to PDF</Link>
          <Link href="/tools/screenshot-to-pdf" className="format-link-card">Screenshot to PDF</Link>
          <Link href="/tools/photos-to-pdf" className="format-link-card">Photos to PDF (Mobile)</Link>
        </div>
      </section>

      {DEFAULT_CONFIG.enableAds && <AdSlot id="home-content-1" />}

      <MakerPromo />

      <HowItWorks />
      <FAQ />

      <section className="related-section" aria-labelledby="related-title">
        <h2 id="related-title">Privacy-First Document Conversion</h2>
        <p>
          LocalPDF is a privacy-first utility. All image processing happens in your browser using
          modern web APIs. No files are ever uploaded to our servers. This means faster conversions,
          complete privacy, and no account or signup required. Just select your images, arrange them,
          and download your PDF — everything stays on your device.
        </p>
      </section>
    </main>
  );
}
