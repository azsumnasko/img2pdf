"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">LocalPDF</span>
          <p className="footer-tagline">Privacy-first image to PDF converter</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
          <a href="#" onClick={(e) => { e.preventDefault(); }} className="consent-settings-link">Privacy choices</a>
        </nav>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} LocalPDF. All processing happens on your device.
        </p>
      </div>
    </footer>
  );
}
