import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_AUTHOR, BLOG_POSTS } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from Atanas Ignatov, manager of Firmify EOOD, on private browser PDF tools, the 25-image limit, and local processing.",
  alternates: { canonical: "https://local2pdf.com/blog" },
  openGraph: {
    title: "Local2PDF Blog",
    description:
      "Notes from Atanas Ignatov, manager of Firmify EOOD, on private browser PDF tools and local processing.",
    url: "https://local2pdf.com/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <main className="content-page">
      <h1>Local2PDF blog</h1>
      <p>
        Written by {BLOG_AUTHOR.name}, {BLOG_AUTHOR.role}. These notes cover how
        the tools behave, including the 25-image cap on image-to-PDF and what stays on your device.
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
