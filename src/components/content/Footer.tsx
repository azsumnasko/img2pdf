"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">Local2PDF</span>
          <p className="footer-tagline">Privacy-first PDF tools — all processing on your device</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/security">Security</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/privacy#choices" className="consent-settings-link">Cookie settings</Link>
        </nav>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Local2PDF. All processing happens on your device.
        </p>
      </div>
    </footer>
  );
}
