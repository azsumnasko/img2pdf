"use client";

import Link from "next/link";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link href="/" className="logo" aria-label="LocalPDF home">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="var(--color-primary)" />
            <path
              d="M8 10h16v12H8z"
              fill="white"
              fillOpacity={0.9}
            />
            <path
              d="M10 14h12M10 18h8"
              stroke="var(--color-primary)"
              strokeWidth={1.5}
            />
          </svg>
          <span className="logo-text">LocalPDF</span>
        </Link>
        <nav className="header-nav" aria-label="Main navigation">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </header>
  );
}
