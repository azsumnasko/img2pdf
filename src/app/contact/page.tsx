import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Local2PDF — Get Support & Help",
  description:
    "Email Local2PDF for support, privacy, or security. Use support@, privacy@, or security@local2pdf.com. There is no phone line. We aim to reply within 48 hours.",
  alternates: {
    canonical: "https://local2pdf.com/contact",
  },
  openGraph: {
    title: "Contact Local2PDF — Get Support & Help",
    description:
      "Contact the Local2PDF team for support, privacy questions, security disclosures, or business inquiries.",
    url: "https://local2pdf.com/contact",
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
  twitter: {
    card: "summary_large_image",
    title: "Contact Local2PDF — Get Support & Help",
    description:
      "Contact the Local2PDF team for support, privacy questions, security disclosures, or business inquiries. We aim to respond within 48 hours.",
  },
};

export default function ContactPage() {
  return (
    <main className="content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Contact",
              description:
                "Contact the Local2PDF team for support, privacy questions, security disclosures, or business inquiries. We aim to respond within 48 hours.",
              url: "https://local2pdf.com/contact",
              publisher: {
                "@id": "https://local2pdf.com/#organization",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://local2pdf.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Contact",
                },
              ],
            },
          ]),
        }}
      />
      <h1>Contact Local2PDF</h1>

      <p>
        We aim to respond to all inquiries within 48 hours. Please use the appropriate contact below
        for the fastest response.
      </p>
      <p>
        Local2PDF does not publish a phone number. Write to{" "}
        <a href="mailto:support@local2pdf.com">support@local2pdf.com</a>,{" "}
        <a href="mailto:privacy@local2pdf.com">privacy@local2pdf.com</a>, or{" "}
        <a href="mailto:security@local2pdf.com">security@local2pdf.com</a>.
        Support is by email because the tools run in your browser and there is no uploaded file for an agent to open.
      </p>
      <p>
        Local2PDF is operated by Firmify EOOD in Bulgaria. The product converts, merges, splits,
        and edits PDFs in your browser. Files stay on your device, so a support agent cannot open
        a document you processed. When you write, describe the tool, the browser, and the steps
        that failed. Do not attach the PDF or image unless we ask for a sanitized sample. The
        mailboxes below are the same addresses listed in llms.txt and on the Security page.
      </p>

      <section>
        <h2>Support</h2>
        <p>For general questions, bug reports, or help using Local2PDF:</p>
        <p><a href="mailto:support@local2pdf.com">support@local2pdf.com</a></p>
        <p>
          Include the tool name (for example Merge PDF or Image to PDF), your browser and version,
          your operating system, and whether the file is password-protected or very large. Say
          whether you saw an error message or a silent stall. For image-to-PDF, note how many
          images you added — the published cap is 25 images per conversion, not a daily quota.
          We aim to reply within 48 hours. We cannot recover a file from a Local2PDF server
          because the conversion never uploaded it.
        </p>
      </section>

      <section>
        <h2>Privacy</h2>
        <p>For privacy-related inquiries, data protection questions, or consent management:</p>
        <p><a href="mailto:privacy@local2pdf.com">privacy@local2pdf.com</a></p>
        <p>
          Use this address for questions about analytics consent, cookies, ads.txt, or how the
          Privacy Policy describes site traffic versus document contents. Display advertising is
          currently off; ads.txt lists no authorized sellers. If you want to withdraw analytics
          consent or ask what data the site records about page visits, write here. Do not send
          document contents in a privacy inquiry. The Privacy Policy and Security page state that
          filenames, image bytes, and PDF bytes are not included in outgoing requests from the
          converter.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>To report a security vulnerability or for security-related questions:</p>
        <p><a href="mailto:security@local2pdf.com">security@local2pdf.com</a></p>
        <p>
          Please do not include sensitive document contents in your message. We follow responsible
          disclosure practices and will acknowledge your report within 72 hours.
        </p>
        <p>
          Describe the page or tool, the browser, and the steps that reproduce the issue. If you
          found a cross-site scripting risk, a content-security-policy gap, or an unexpected
          network request that appears to carry file data, say so clearly. Attach screenshots of
          developer tools if they help, and redact any personal data. We will acknowledge the
          report and follow up after we can reproduce it. Do not post a public write-up before we
          have had a chance to respond.
        </p>
      </section>

      <section>
        <h2>Bug Reports</h2>
        <p>
          If you encounter an issue, please describe the steps to reproduce it, your browser and
          device, and any error messages you see. This helps us fix problems quickly.
        </p>
        <p>
          Useful details include whether the job failed on the first page or after a long wait,
          whether HEIC was involved, and whether you were offline after a prior visit. JPEG, PNG,
          and WebP conversion can work offline once the app shell is cached; HEIC on Chrome,
          Firefox, and Edge needs the WebAssembly decoder from the first visit. PDF tools that
          render pages expect the PDF.js worker to be present. A password-protected PDF has to be
          unlocked before the browser can read it. Very large files can exhaust tab memory — that
          is a device limit, not a 25-page product rule. Send bug reports to{" "}
          <a href="mailto:support@local2pdf.com">support@local2pdf.com</a> unless the issue is a
          security vulnerability, in which case use{" "}
          <a href="mailto:security@local2pdf.com">security@local2pdf.com</a>.
        </p>
      </section>
    </main>
  );
}
