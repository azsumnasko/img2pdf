import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Local2PDF — a privacy-first PDF toolkit that processes files locally in your browser. Covers acceptable use, disclaimers, intellectual property, and limitations of liability.",
  alternates: { canonical: "https://local2pdf.com/terms" },
  openGraph: {
    title: "Terms of Use",
    description: "Terms of use for Local2PDF — a privacy-first PDF toolkit that processes files locally in your browser.",
    url: "https://local2pdf.com/terms",
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

export default function TermsPage() {
  return (
    <main className="content-page">
      <h1>Terms of Use</h1>
      <p><strong>Last updated:</strong> July 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By using Local2PDF, you agree to these terms. If you do not agree, please do not use
        the service.
      </p>

      <h2>2. Service Description</h2>
      <p>
        Local2PDF is a free browser-based toolkit for converting, organizing, and modifying PDF
        and image files. Available tools include image-to-PDF conversion, PDF merging and
        splitting, page rotation and reordering, PDF-to-image export, text extraction, and
        thumbnail generation.
      </p>
      <p>
        All supported processing is performed locally on your device. We do not upload, store,
        or have access to your files or their contents.
      </p>

      <h2>3. Acceptable Use</h2>
      <p>
        You agree not to use the service for any unlawful purpose. You are responsible for the
        content of the files you process and the resulting output. Local2PDF does not review or
        monitor user files.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        The Local2PDF website, branding, and code are protected by applicable intellectual
        property laws. You retain all rights to your files, extracted text, and generated output.
      </p>

      <h2>5. Disclaimers</h2>
      <p>
        The service is provided &ldquo;as is&rdquo; without warranties of any kind. We do not
        guarantee that the service will be error-free, uninterrupted, or suitable for any
        particular purpose.
      </p>
      <h3>5.1 General Limitations</h3>
      <p>
        Large files and high-resolution images may cause performance issues depending on your
        device and browser capabilities. Not all browsers support all file formats, and
        processing results may vary between browsers. Compression and quality settings produce
        best-effort results and may not achieve a specific file size or visual fidelity.
      </p>
      <h3>5.2 Unsupported PDF Features</h3>
      <p>
        The following PDF features are not supported or may not be preserved during processing:
        digital signatures, interactive forms, multimedia annotations, encrypted or
        password-protected files, embedded scripts, 3D content, and certain advanced metadata.
        Processing a PDF with unsupported features may result in partial or complete loss of
        those features.
      </p>
      <h3>5.3 Text Extraction and OCR</h3>
      <p>
        Text extraction from PDF files relies on the text data embedded in the document.
        Scanned documents and image-based PDFs without embedded text layers may not yield
        readable text. Any OCR functionality, if available, is performed locally and may
        produce errors or omissions. We do not warrant the accuracy or completeness of
        extracted text.
      </p>
      <h3>5.4 No Guarantees</h3>
      <p>
        Local2PDF does not provide a &ldquo;zero-data-loss&rdquo; or &ldquo;100% secure&rdquo;
        guarantee. Despite local processing, browser extensions, malware, or device compromise
        could theoretically access your data. We recommend keeping backups of your original
        files before processing.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Local2PDF shall not be liable for any indirect,
        incidental, or consequential damages arising from your use of the service, including
        loss of data, loss of unsupported PDF features, or errors in generated output.
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
