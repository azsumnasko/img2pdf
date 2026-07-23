"use client";

import Link from "next/link";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link href="/" className="logo" aria-label="Local2PDF home">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="var(--color-primary)" />
            <path d="M8 10h16v12H8z" fill="white" fillOpacity={0.9} />
            <path d="M10 14h12M10 18h8" stroke="var(--color-primary)" strokeWidth={1.5} />
          </svg>
          <span className="logo-text">Local2PDF</span>
        </Link>
        <nav className="header-nav" aria-label="Main navigation">
          <Link href="/pdf-tools">All Tools</Link>
          <Link href="/tools/merge-pdf">Merge PDF</Link>
          <Link href="/tools/split-pdf">Split PDF</Link>
          <Link href="/tools/pdf-to-jpg">PDF to JPG</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </header>
  );
}
