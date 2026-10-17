import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_AUTHOR } from "@/content/blog";

export const metadata: Metadata = {
  title: { absolute: "About Local2PDF — Free Private PDF Tools, No Upload" },
  description:
    "Local2PDF is a private PDF toolkit from Firmify EOOD in Bulgaria. Atanas Ignatov writes the blog. Files are processed in your browser and are not uploaded.",
  alternates: {
    canonical: "https://local2pdf.com/about",
  },
  openGraph: {
    title: "About Local2PDF — Privacy-First PDF Tools",
    description:
      "Local2PDF is a privacy-first PDF toolkit operated by Firmify EOOD in Bulgaria. Atanas Ignatov writes the blog. Files stay on your device — no uploads.",
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
  twitter: {
    card: "summary_large_image",
    title: "About Local2PDF — Privacy-First PDF Tools",
    description:
      "Local2PDF is a privacy-first PDF toolkit operated by Firmify EOOD. Files stay on your device — no uploads, no accounts, no watermarks.",
  },
};

export default function AboutPage() {
  return (
    <main className="content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "About",
              description:
                "Local2PDF is a privacy-first PDF toolkit that processes files entirely in your browser. No uploads, no accounts, no watermarks.",
              url: "https://local2pdf.com/about",
              publisher: {
                "@id": "https://local2pdf.com/#organization",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://local2pdf.com/about#atanas-ignatov",
              name: BLOG_AUTHOR.name,
              jobTitle: BLOG_AUTHOR.jobTitle,
              url: BLOG_AUTHOR.url,
              worksFor: {
                "@type": "Organization",
                name: BLOG_AUTHOR.worksForName,
                url: BLOG_AUTHOR.worksForUrl,
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
                  name: "About",
                },
              ],
            },
          ]),
        }}
      />
      <h1>About Local2PDF</h1>

      <p>
        Local2PDF is a privacy-first PDF toolkit that processes files entirely in your browser.
        No file uploads, no account required, no watermarks. Every tool works the same way: select
        your file, make your changes, and download the result — everything stays on your device.
      </p>

      <section>
        <h2>Who We Are</h2>
        <p>
          Local2PDF is operated by Firmify EOOD, a Bulgarian company (UIC 208745197). Firmify EOOD
          also publishes Firmify and StoryKind. The company, not a hosting vendor, is the operator
          named in our Organization schema and on this page.
        </p>
      </section>

      <section>
        <h2>Author</h2>
        <p>
          <strong>{BLOG_AUTHOR.name}</strong> is {BLOG_AUTHOR.jobTitle}, the operator of Local2PDF.
          He writes the <Link href="/blog">Local2PDF blog</Link>, including notes on the 25-image
          cap for image-to-PDF and how files stay on your device. Guides on the blog are published
          under his name so readers and search engines can see who is responsible for the facts.
        </p>
        <p>
          We build privacy-respecting tools that keep your data on your device. Our mission is to
          provide useful document utilities without compromising your privacy.
        </p>
      </section>

      <section>
        <h2>Our Products</h2>
        <p>
          <a href="https://firmify.bg">Firmify</a> — Company registration and business management tools.
        </p>
        <p>
          <a href="https://storykind.tech">StoryKind</a> — AI-powered children&apos;s story creation.
        </p>
        <p>
          <Link href="/pdf-tools">Local2PDF</Link> — Private PDF tools for your browser.
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
          You can verify this yourself: open your browser&apos;s Developer Tools (F12), go to the Network
          tab, and run any of our tools. You will see no requests containing your file contents.
        </p>
      </section>

      <section>
        <h2>What the 25-image limit covers</h2>
        <p>
          Image to PDF, and the format pages that use the same converter, accept up to 25 images
          in one job. JPG, PNG, WebP, and HEIC each count toward that number, including a mixed
          batch. The cap is per conversion. You can start another job immediately. There is no
          account and no daily quota.
        </p>
        <p>
          Merge, split, rotate, reorder, delete, extract, crop, resize, n-up, page numbers,
          compress, PDF to JPG, PDF to PNG, and PDF to Text do not use that cap. Their limit is
          the memory of the browser on your device. A page that says “25 pages” without saying
          images is describing the wrong rule.
        </p>
      </section>

      <section>
        <h2>Libraries you can inspect</h2>
        <p>
          Local2PDF edits PDFs with{" "}
          <a href="https://pdf-lib.js.org/" rel="noopener noreferrer" target="_blank">
            pdf-lib
          </a>{" "}
          and draws pages with{" "}
          <a href="https://mozilla.github.io/pdf.js/" rel="noopener noreferrer" target="_blank">
            PDF.js
          </a>
          . Both run in the browser. The file is not sent to those projects, and it is not
          uploaded to a Local2PDF conversion server. HEIC photos decode natively in Safari and
          through a WebAssembly decoder in Chrome, Firefox, and Edge.
        </p>
      </section>

      <section>
        <h2>Browsers</h2>
        <p>
          Chrome, Firefox, and Edge 90 or newer, and Safari 15 or newer, can run the tools.
          After the first visit, JPG, PNG, and WebP conversion can work offline. The{" "}
          <Link href="/compatibility">compatibility page</Link> lists HEIC and offline support
          for each browser. The <Link href="/security">security page</Link> explains what a
          Network-tab check should show.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>For support: <a href="mailto:support@local2pdf.com">support@local2pdf.com</a></p>
        <p>For privacy: <a href="mailto:privacy@local2pdf.com">privacy@local2pdf.com</a></p>
        <p>For security: <a href="mailto:security@local2pdf.com">security@local2pdf.com</a></p>
      </section>
    </main>
  );
}
