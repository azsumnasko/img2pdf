import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — Local2PDF",
  description:
    "Track updates and new features for Local2PDF. See what PDF tools have been added and what changes have been made.",
  alternates: { canonical: "https://local2pdf.com/changelog" },
  openGraph: {
    title: "Changelog — Local2PDF",
    description:
      "Track updates and new features for Local2PDF. See what PDF tools have been added.",
    url: "https://local2pdf.com/changelog",
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
    title: "Changelog — Local2PDF",
    description:
      "Track updates and new features for Local2PDF. See what PDF tools have been added and what changes have been made.",
  },
};

const entries = [
  {
    date: "July 24, 2026",
    changes: [
      "SEO optimization: full JSON-LD structured data on all tool pages (WebApplication, FAQPage, BreadcrumbList). Added Twitter cards, CSP header, AI bot directives.",
    ],
  },
  {
    date: "July 23, 2026",
    changes: [
      "Added Compatibility page with browser support matrix and Changelog page.",
    ],
  },
  {
    date: "July 22, 2026",
    changes: [
      "Launched 15 interactive PDF tools: Merge, Split, Rotate, Reorder, Delete, Extract Pages, PDF to JPG/PNG/Text, Add Page Numbers, Crop, Resize, N-Up, Compress, Extract Images.",
    ],
  },
  {
    date: "July 2026",
    changes: [
      "Brand refresh to Local2PDF.",
      "Added About, Contact, and Security pages.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Changelog",
              description:
                "Track updates and new features for Local2PDF. See what PDF tools have been added and what changes have been made.",
              url: "https://local2pdf.com/changelog",
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
                  name: "Changelog",
                },
              ],
            },
          ]),
        }}
      />
      <h1 className="mb-8 text-3xl font-bold">Changelog</h1>

      <div className="space-y-10">
        {entries.map((entry) => (
          <div key={entry.date}>
            <h2 className="mb-4 text-xl font-semibold">{entry.date}</h2>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              {entry.changes.map((change, i) => (
                <li key={i}>{change}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
