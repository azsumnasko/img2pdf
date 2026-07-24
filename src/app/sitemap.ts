import type { MetadataRoute } from "next";

const BASE = "https://local2pdf.com";
const LAST_MOD = new Date("2026-07-24");

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

/** Indexable routes only — beta/noindex tools are omitted on purpose. */
const ENTRIES: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/pdf-tools", changeFrequency: "weekly", priority: 0.9 },

  { path: "/tools/image-to-pdf", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tools/jpg-to-pdf", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/png-to-pdf", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/webp-to-pdf", changeFrequency: "weekly", priority: 0.7 },
  { path: "/tools/heic-to-pdf", changeFrequency: "weekly", priority: 0.7 },
  { path: "/tools/combine-images-to-pdf", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/photos-to-pdf", changeFrequency: "weekly", priority: 0.7 },
  { path: "/tools/screenshot-to-pdf", changeFrequency: "weekly", priority: 0.7 },

  { path: "/tools/merge-pdf", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tools/split-pdf", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tools/rotate-pdf", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/reorder-pdf-pages", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/delete-pdf-pages", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/extract-pdf-pages", changeFrequency: "weekly", priority: 0.8 },

  { path: "/tools/pdf-to-jpg", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/pdf-to-png", changeFrequency: "weekly", priority: 0.7 },
  { path: "/tools/pdf-to-text", changeFrequency: "weekly", priority: 0.7 },

  { path: "/tools/add-page-numbers-to-pdf", changeFrequency: "weekly", priority: 0.6 },
  { path: "/tools/crop-pdf", changeFrequency: "weekly", priority: 0.6 },
  { path: "/tools/resize-pdf-pages", changeFrequency: "weekly", priority: 0.6 },
  { path: "/tools/n-up-pdf", changeFrequency: "weekly", priority: 0.5 },
  { path: "/tools/compress-pdf", changeFrequency: "weekly", priority: 0.5 },

  { path: "/about", changeFrequency: "monthly", priority: 0.4 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.3 },
  { path: "/security", changeFrequency: "monthly", priority: 0.4 },
  { path: "/compatibility", changeFrequency: "monthly", priority: 0.4 },
  { path: "/changelog", changeFrequency: "monthly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ENTRIES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE}${path === "/" ? "/" : path}`,
    lastModified: LAST_MOD,
    changeFrequency,
    priority,
  }));
}
