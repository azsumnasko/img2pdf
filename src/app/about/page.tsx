import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_AUTHOR } from "@/content/blog";

export const metadata: Metadata = {
  title: { absolute: "About Local2PDF — Privacy-First PDF Tools" },
  description:
    "Local2PDF is a privacy-first PDF toolkit operated by Firmify EOOD in Bulgaria. Atanas Ignatov, manager of Firmify EOOD, writes the blog. Files stay on your device.",
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
        <h2>Contact</h2>
        <p>For support: <a href="mailto:support@local2pdf.com">support@local2pdf.com</a></p>
        <p>For privacy: <a href="mailto:privacy@local2pdf.com">privacy@local2pdf.com</a></p>
        <p>For security: <a href="mailto:security@local2pdf.com">security@local2pdf.com</a></p>
      </section>
    </main>
  );
}
