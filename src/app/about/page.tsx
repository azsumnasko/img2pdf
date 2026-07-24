import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Local2PDF — Privacy-First PDF Tools",
  description:
    "Local2PDF is a privacy-first PDF toolkit that processes files entirely in your browser. No uploads, no accounts, no watermarks.",
  alternates: {
    canonical: "https://local2pdf.com/about",
  },
  openGraph: {
    title: "About Local2PDF — Privacy-First PDF Tools",
    description:
      "Local2PDF is a privacy-first PDF toolkit that processes files entirely in your browser. No uploads, no accounts, no watermarks.",
    url: "https://local2pdf.com/about",
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

export default function AboutPage() {
  return (
    <main className="content-page">
      <h1>About Local2PDF</h1>

      <p>
        Local2PDF is a privacy-first PDF toolkit that processes files entirely in your browser.
        No file uploads, no account required, no watermarks. Every tool works the same way: select
        your file, make your changes, and download the result — everything stays on your device.
      </p>

      <section>
        <h2>Who We Are</h2>
        <p>
          Operated by Firmify EOOD in Bulgaria. We build privacy-respecting tools that keep your
          data on your device. Our mission is to provide useful document utilities without
          compromising your privacy.
        </p>
      </section>

      <section>
        <h2>Our Products</h2>
        <p>
          <a href="https://firmify.bg">Firmify</a> — Company registration and business management tools.
        </p>
        <p>
          <a href="https://storykind.tech">StoryKind</a> — AI-powered children's story creation.
        </p>
        <p>
          <a href="/pdf-tools">Local2PDF</a> — Private PDF tools for your browser.
        </p>
      </section>

      <section>
        <h2>How Local2PDF Works</h2>
        <p>
          All PDF processing happens locally in your browser using WebAssembly and JavaScript APIs.
          Your files are read from your device, processed in browser memory, and saved back to your
          device. No document content is ever sent to our servers.
        </p>
        <p>
          You can verify this yourself: open your browser's Developer Tools (F12), go to the Network
          tab, and run any of our tools. You will see no requests containing your file contents.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>For support: <a href="mailto:support@local2pdf.com">support@local2pdf.com</a></p>
        <p>For privacy: <a href="mailto:privacy@local2pdf.com">privacy@local2pdf.com</a></p>
      </section>
    </main>
  );
}
