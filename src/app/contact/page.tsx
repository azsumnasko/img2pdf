import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Local2PDF",
  description:
    "Get in touch with the Local2PDF team for support, privacy, or security inquiries.",
  alternates: {
    canonical: "https://local2pdf.com/contact",
  },
  openGraph: {
    title: "Contact Local2PDF",
    description:
      "Get in touch with the Local2PDF team for support, privacy, or security inquiries.",
    url: "https://local2pdf.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="content-page">
      <h1>Contact Local2PDF</h1>

      <h2>Email</h2>
      <p>
        For general support:{" "}
        <a href="mailto:support@local2pdf.com">support@local2pdf.com</a>
      </p>
      <p>
        For privacy inquiries:{" "}
        <a href="mailto:privacy@local2pdf.com">privacy@local2pdf.com</a>
      </p>
      <p>
        For security concerns:{" "}
        <a href="mailto:security@local2pdf.com">security@local2pdf.com</a>
      </p>

      <h2>Response Time</h2>
      <p>
        We aim to respond to all inquiries within 1–2 business days. Security
        reports receive priority handling.
      </p>

      <h2>Bug Reports</h2>
      <p>
        Found a bug? Please report it on our{" "}
        <a
          href="https://github.com/anomalyco/local2pdf/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub issues page
        </a>{" "}
        so we can track and resolve it efficiently.
      </p>
    </main>
  );
}
