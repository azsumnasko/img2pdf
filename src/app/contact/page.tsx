import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Local2PDF — Get Support & Help",
  description:
    "Contact the Local2PDF team for support, privacy questions, security disclosures, or business inquiries. We aim to respond within 48 hours.",
  alternates: {
    canonical: "https://local2pdf.com/contact",
  },
  openGraph: {
    title: "Contact Local2PDF — Get Support & Help",
    description:
      "Contact the Local2PDF team for support, privacy questions, security disclosures, or business inquiries.",
    url: "https://local2pdf.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="content-page">
      <h1>Contact Local2PDF</h1>

      <p>
        We aim to respond to all inquiries within 48 hours. Please use the appropriate contact below
        for the fastest response.
      </p>

      <section>
        <h2>Support</h2>
        <p>For general questions, bug reports, or help using Local2PDF:</p>
        <p><a href="mailto:support@local2pdf.com">support@local2pdf.com</a></p>
      </section>

      <section>
        <h2>Privacy</h2>
        <p>For privacy-related inquiries, data protection questions, or consent management:</p>
        <p><a href="mailto:privacy@local2pdf.com">privacy@local2pdf.com</a></p>
      </section>

      <section>
        <h2>Security</h2>
        <p>To report a security vulnerability or for security-related questions:</p>
        <p><a href="mailto:security@local2pdf.com">security@local2pdf.com</a></p>
        <p>
          Please do not include sensitive document contents in your message. We follow responsible
          disclosure practices and will acknowledge your report within 72 hours.
        </p>
      </section>

      <section>
        <h2>Bug Reports</h2>
        <p>
          If you encounter an issue, please describe the steps to reproduce it, your browser and
          device, and any error messages you see. This helps us fix problems quickly.
        </p>
      </section>
    </main>
  );
}
