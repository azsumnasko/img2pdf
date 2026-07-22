import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "LocalPDF terms of use.",
};

export default function TermsPage() {
  return (
    <main className="content-page">
      <h1>Terms of Use</h1>
      <p><strong>Last updated:</strong> July 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By using LocalPDF, you agree to these terms. If you do not agree, please do not use
        the service.
      </p>

      <h2>2. Service Description</h2>
      <p>
        LocalPDF is a free web-based tool that converts images to PDF format. All processing
        happens locally in your browser. We do not upload, store, or have access to your files.
      </p>

      <h2>3. Acceptable Use</h2>
      <p>
        You agree not to use the service for any unlawful purpose. You are responsible for the
        content of the images you convert and the resulting PDFs. LocalPDF does not review or
        monitor user files.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        The LocalPDF website, branding, and code are protected by applicable intellectual
        property laws. You retain all rights to your images and generated PDFs.
      </p>

      <h2>5. Disclaimer</h2>
      <p>
        The service is provided &ldquo;as is&rdquo; without warranties of any kind. We do not
        guarantee that the service will be error-free or uninterrupted. We are not responsible
        for any loss of data or other damages arising from use of the service.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, LocalPDF shall not be liable for any indirect,
        incidental, or consequential damages arising from your use of the service.
      </p>

      <h2>7. Changes to Terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the service after changes
        constitutes acceptance of the new terms.
      </p>

      <h2>8. Contact</h2>
      <p>
        For questions about these terms, please contact us through the information provided on
        our website.
      </p>
    </main>
  );
}
