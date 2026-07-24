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
};

const entries = [
  {
    date: "July 2026",
    changes: [
      "Added 15 PDF tools: Merge PDF, Split PDF, Rotate PDF, Reorder PDF Pages, Delete PDF Pages, Extract PDF Pages, PDF to JPG, PDF to PNG, PDF to Text, Add Page Numbers to PDF, Crop PDF, Resize PDF Pages, N-Up PDF, Compress PDF, and Extract Images from PDF.",
      "Brand refresh to Local2PDF.",
      "Added About, Contact, and Security pages.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
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
