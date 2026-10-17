import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Changelog — New Local2PDF Product Updates and Notes" },
  description:
    "See what changed in Local2PDF, including the blog by Atanas Ignatov, the 25-image limit, and private browser PDF tools. Your files stay on your device.",
  alternates: { canonical: "https://local2pdf.com/changelog" },
  openGraph: {
    title: "Changelog — Local2PDF Updates",
    description:
      "Track Local2PDF updates: the blog by Atanas Ignatov, the 25-image image-to-PDF limit, and new private PDF tools.",
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
    title: "Changelog — Local2PDF Updates",
    description:
      "Track Local2PDF updates: the blog by Atanas Ignatov, the 25-image image-to-PDF limit, and new private PDF tools.",
  },
};

const entries = [
  {
    date: "October 17, 2026",
    changes: [
      "Published the Local2PDF blog with three guides by Atanas Ignatov, manager of Firmify EOOD.",
      "Clarified that the 25-image cap applies only to image-to-PDF (and related image landings), not to merge, split, compress, or other PDF tools.",
      "Linked Firmify EOOD as parentOrganization in schema and expanded About with the named author.",
      "Stated on Security and Privacy that display advertising is off, matching ads.txt.",
      "Added a browser support table covering minimum version, HEIC, and offline use.",
      "Expanded the blog index, Compatibility, Contact, and Changelog copy, lengthened two titles into the 50–60 character range, and added Speakable markup on the three posts.",
    ],
  },
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

      <p className="mb-6 text-muted-foreground">
        This page is the product history for Local2PDF. Entries are dated newest first. They
        record when tools shipped, when the brand renamed from the earlier project, and when the
        operator facts, limits, and crawler files were published. Local2PDF is operated by Firmify
        EOOD in Bulgaria. The tools process files in the browser: no upload, no account, and no
        watermark on the download.
      </p>
      <p className="mb-6 text-muted-foreground">
        In July 2026 the site refreshed to the Local2PDF brand and published About, Contact, and
        Security. On July 22 the interactive PDF tools launched: Merge, Split, Rotate, Reorder,
        Delete, Extract Pages, PDF to JPG, PDF to PNG, PDF to Text, Add Page Numbers, Crop,
        Resize, N-Up, Compress, and Extract Images. On July 23 the Compatibility matrix and this
        Changelog page went live. On July 24 the tool pages gained WebApplication, FAQPage, and
        BreadcrumbList JSON-LD, Twitter cards, a content-security-policy header, and AI crawler
        directives in robots.txt.
      </p>
      <p className="mb-10 text-muted-foreground">
        On October 17, 2026 the blog opened with three guides by Atanas Ignatov, manager of
        Firmify EOOD: the 25-image limit on image-to-PDF, how files stay on the device, and when
        to compress locally. The same day the site linked Firmify EOOD as parentOrganization,
        stated that display advertising is off to match ads.txt, and published a browser support
        table for Chrome, Firefox, Edge 90+, Safari 15+, HEIC decode, and offline JPG, PNG, and
        WebP after the first visit. Later copy updates on that date expanded the blog index,
        Compatibility, Contact, and this Changelog, brought two titles into the 50–60 character
        range, and added Speakable markup on the three posts. Use About for the company story and
        Security for the Network-tab check that confirms a conversion does not upload the file.
      </p>

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
