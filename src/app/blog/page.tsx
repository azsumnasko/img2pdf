import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_AUTHOR, BLOG_POSTS } from "@/content/blog";

export const metadata: Metadata = {
  title: { absolute: "Local2PDF Blog — Practical Guides for Private PDFs" },
  description:
    "Notes from Atanas Ignatov, manager of Firmify EOOD, on private browser PDF tools, the 25-image limit on image-to-PDF, and local processing. No file uploads.",
  alternates: { canonical: "https://local2pdf.com/blog" },
  openGraph: {
    title: "Local2PDF Blog — Private PDF Notes",
    description:
      "Notes from Atanas Ignatov, manager of Firmify EOOD, on private browser PDF tools, the 25-image limit, and local processing.",
    url: "https://local2pdf.com/blog",
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

export default function BlogIndexPage() {
  return (
    <main className="content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "@id": "https://local2pdf.com/blog#blog",
              name: "Local2PDF Blog",
              url: "https://local2pdf.com/blog",
              description:
                "Notes from Atanas Ignatov, manager of Firmify EOOD, on private browser PDF tools.",
              author: {
                "@type": "Person",
                name: BLOG_AUTHOR.name,
                jobTitle: BLOG_AUTHOR.jobTitle,
                url: BLOG_AUTHOR.url,
              },
              publisher: { "@id": "https://local2pdf.com/#organization" },
              blogPost: BLOG_POSTS.map((post) => ({
                "@type": "BlogPosting",
                headline: post.title,
                url: `https://local2pdf.com/blog/${post.slug}`,
                datePublished: post.date,
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: BLOG_POSTS.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: post.title,
                url: `https://local2pdf.com/blog/${post.slug}`,
              })),
            },
          ]),
        }}
      />
      <h1>Local2PDF blog</h1>
      <p>
        Written by {BLOG_AUTHOR.name}, {BLOG_AUTHOR.role}. These notes cover how
        the tools behave, including the 25-image cap on image-to-PDF and what stays on your device.
      </p>
      <p>
        Local2PDF is operated by Firmify EOOD in Bulgaria. The posts below are practical guides,
        not marketing pages: they state the image-to-PDF limit, explain browser-local processing,
        and describe when local compression is a good fit. For the company and products, see{" "}
        <Link href="/about">About</Link>. For the full tool list, see{" "}
        <Link href="/pdf-tools">All PDF Tools</Link>.
      </p>
      <p>
        Start with the limit article if you have seen a “25 pages” claim elsewhere on the web —
        the published product rule is 25 images per image-to-PDF conversion. PDF tools such as
        merge, split, and compress use device memory, not that cap.
      </p>
      <section>
        <h2>What this blog is for</h2>
        <p>
          This blog is the product documentation for Local2PDF written as short guides. Each post
          answers one question a user asks before they trust a browser tool with a document: how
          large a job can be, whether the file leaves the device, and when a local compress is
          the right choice. The author is Atanas Ignatov, manager of Firmify EOOD (UIC 208745197),
          the Bulgarian company that operates Local2PDF. The same name appears on About, in the
          BlogPosting schema on each article, and in the machine-readable summaries at llms.txt.
        </p>
        <p>
          The first guide explains the 25-image limit. Image-to-PDF, JPG to PDF, PNG to PDF, WebP
          to PDF, HEIC to PDF, Photos to PDF, Screenshot to PDF, and Combine Images to PDF share
          one converter. That converter stops at 25 images in a single job. The next conversion
          can start immediately. There is no daily quota and no account. Merge, split, rotate,
          reorder, delete, extract, crop, resize, n-up, page numbers, compress, PDF to JPG, PDF
          to PNG, and PDF to Text do not inherit that number. Their limits are the memory of the
          browser on your device.
        </p>
        <p>
          The second guide explains how Local2PDF processes a file. The document is read from
          your device, changed in memory, and downloaded back to your device. Page rendering uses
          PDF.js. Creating and editing the PDF uses pdf-lib. Both libraries run in the tab. You
          can verify the claim yourself: open the Network panel, run a tool, and confirm that no
          request carries the PDF or image body. The site can still load its own HTML, CSS, and
          JavaScript. Display advertising is currently off; ads.txt lists no authorized sellers.
        </p>
        <p>
          The third guide covers when to compress a PDF locally. Use the compressor when a file
          is too large to email and you do not want to upload it. Safe mode trims overhead without
          rebuilding pages and is the right first choice for text documents. Image-heavy mode
          redraws pages and is meant for scans when a softer page is acceptable. Compression does
          not use a 25-page cap. A signed PDF is a poor candidate for any edit, including
          compression, because the signature covers the bytes that would change.
        </p>
        <p>
          Read the posts in any order. If you only need the limit rule, start with the image
          article. If you are checking privacy before converting a scan, start with the processing
          article. If you are trying to fit a PDF into an email, start with the compression
          article. Every tool on Local2PDF stays free, requires no signup, and adds no watermark
          to the file you download.
        </p>
      </section>
      <ul className="blog-list">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug}>
            <article>
              <p className="blog-meta">
                <time dateTime={post.date}>{post.date}</time>
                {" · "}
                {BLOG_AUTHOR.name}
              </p>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
