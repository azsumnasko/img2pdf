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
