import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_AUTHOR, BLOG_POSTS, getPost } from "@/content/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `https://local2pdf.com/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: BLOG_AUTHOR.name, url: BLOG_AUTHOR.url }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [BLOG_AUTHOR.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const url = `https://local2pdf.com/blog/${post.slug}`;

  return (
    <main className="content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: url,
            url,
            author: {
              "@type": "Person",
              name: BLOG_AUTHOR.name,
              jobTitle: BLOG_AUTHOR.jobTitle,
              url: BLOG_AUTHOR.url,
              worksFor: {
                "@type": "Organization",
                name: BLOG_AUTHOR.worksForName,
                url: BLOG_AUTHOR.worksForUrl,
              },
            },
            publisher: { "@id": "https://local2pdf.com/#organization" },
          }),
        }}
      />
      <p className="blog-meta">
        <Link href="/blog">Blog</Link>
        {" · "}
        <time dateTime={post.date}>{post.date}</time>
      </p>
      <h1>{post.title}</h1>
      <p className="blog-byline">
        By <a href={BLOG_AUTHOR.url}>{BLOG_AUTHOR.name}</a>, {BLOG_AUTHOR.role}.{" "}
        <Link href="/about">About the operator</Link>.
      </p>
      {post.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
    </main>
  );
}
