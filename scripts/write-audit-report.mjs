import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire(
  "file:///C:/Users/Nasko/AppData/Roaming/npm/node_modules/docx/package.json",
);
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, HeightRule,
} = require("docx");

const NAVY = "1B2A4A";
const GREEN = "16A34A";
const AMBER = "D97706";
const RED = "DC2626";
const ORANGE = "EA580C";
const LIGHT = "F8F9FA";
const BORDER = "E2E8F0";
const TEXT = "1E293B";
const BOX = "EFF6FF";
const GOODBG = "F0FDF4";
const MUTED = "64748B";
const W = 9360;

const thin = { style: BorderStyle.SINGLE, size: 4, color: BORDER };
const borders = { top: thin, bottom: thin, left: thin, right: thin };
const noLine = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noLine, bottom: noLine, left: noLine, right: noLine };

const outDir = path.resolve("reports");
const docxPath = path.join(outDir, "seo-audit-local2pdf-com-2026-10-17-v5.docx");

function run(text, opts = {}) {
  return new TextRun({
    text,
    font: "Arial",
    size: opts.size ?? 22,
    bold: opts.bold ?? false,
    italics: opts.italics ?? false,
    color: opts.color ?? TEXT,
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before ?? 0, after: opts.after ?? 120 },
    alignment: opts.align,
    children: [run(text, opts)],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    children: [run(text, { size: 48, bold: true, color: NAVY })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    children: [run(text, { size: 36, bold: true, color: NAVY })],
  });
}

function cell(text, width, opts = {}) {
  const fill = opts.fill;
  const lines = Array.isArray(text) ? text : [text];
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: fill ? { type: ShadingType.CLEAR, fill } : undefined,
    margins: { top: opts.top ?? 70, bottom: opts.bottom ?? 70, left: 90, right: 90 },
    borders: opts.borders ?? borders,
    verticalAlign: VerticalAlign.CENTER,
    columnSpan: opts.span,
    children: lines.map(
      (line, i) =>
        new Paragraph({
          alignment: opts.align ?? AlignmentType.LEFT,
          spacing: { before: i === 0 ? 0 : 40, after: 0 },
          children: [
            run(line, {
              size: opts.size ?? 20,
              bold: opts.bold ?? false,
              italics: opts.italics ?? false,
              color: opts.color ?? TEXT,
            }),
          ],
        }),
    ),
  });
}

function table(rows, widths) {
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: widths,
    rows,
  });
}

function headerRow(labels, widths) {
  return new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: labels.map((label, i) =>
      cell(label, widths[i], { fill: NAVY, color: "FFFFFF", bold: true, size: 18 }),
    ),
  });
}

function scoreColor(n) {
  if (n >= 8) return GREEN;
  if (n >= 5) return AMBER;
  return RED;
}

function statusWord(n) {
  if (n >= 8) return "Strong";
  if (n >= 5) return "On Track";
  return "Needs Work";
}

function signalRow(signal, finding, status, i) {
  const widths = [2100, 5760, 1500];
  const fill = i % 2 === 0 ? "FFFFFF" : LIGHT;
  const statusFill = status === "Good" ? GREEN : status === "Needs Attention" ? AMBER : RED;
  return new TableRow({
    cantSplit: true,
    children: [
      cell(signal, widths[0], { fill, bold: true, size: 18 }),
      cell(finding, widths[1], { fill, size: 18 }),
      cell(status, widths[2], {
        fill: statusFill,
        color: "FFFFFF",
        bold: true,
        size: 16,
        align: AlignmentType.CENTER,
      }),
    ],
  });
}

function signalTable(rows) {
  const widths = [2100, 5760, 1500];
  return table(
    [
      headerRow(["Signal", "Finding", "Status"], widths),
      ...rows.map((r, i) => signalRow(r[0], r[1], r[2], i)),
    ],
    widths,
  );
}

const pages = [
  ["https://local2pdf.com/", "Homepage", "714 words. FAQ, HowTo, Speakable. Ads stated as off. 25-image badge."],
  ["https://local2pdf.com/pdf-tools", "Directory", "612 words. Four tool groups. Shared OG image."],
  ["https://local2pdf.com/tools/image-to-pdf", "Tool", "640 words. Per-tool OG. FAQ + HowTo. 25-image cap stated."],
  ["https://local2pdf.com/tools/jpg-to-pdf", "Tool", "588 words. Question H2s. Description 156 characters."],
  ["https://local2pdf.com/tools/png-to-pdf", "Tool", "510 words. Description 139 characters, slightly short."],
  ["https://local2pdf.com/tools/webp-to-pdf", "Tool", "660 words. Description 131 characters."],
  ["https://local2pdf.com/tools/heic-to-pdf", "Tool", "723 words. Description 138 characters."],
  ["https://local2pdf.com/tools/combine-images-to-pdf", "Tool", "522 words. Duplicate How-do-I H2. 25-page line is a denial of a cap."],
  ["https://local2pdf.com/tools/photos-to-pdf", "Tool", "522 words. Phone-specific steps. Description 153."],
  ["https://local2pdf.com/tools/screenshot-to-pdf", "Tool", "703 words. Clipboard steps. Description 156."],
  ["https://local2pdf.com/tools/merge-pdf", "Tool", "671 words. Description 139 characters."],
  ["https://local2pdf.com/tools/split-pdf", "Tool", "608 words. Description 132 characters."],
  ["https://local2pdf.com/tools/rotate-pdf", "Tool", "553 words. Description 130 characters."],
  ["https://local2pdf.com/tools/reorder-pdf-pages", "Tool", "594 words. Description 142 characters."],
  ["https://local2pdf.com/tools/delete-pdf-pages", "Tool", "535 words. Shortest indexable description at 124 characters."],
  ["https://local2pdf.com/tools/extract-pdf-pages", "Tool", "720 words. Description 128 characters."],
  ["https://local2pdf.com/tools/pdf-to-jpg", "Tool", "516 words. Description 169 characters, slightly long."],
  ["https://local2pdf.com/tools/pdf-to-png", "Tool", "508 words. Explicitly not limited to 25 pages."],
  ["https://local2pdf.com/tools/pdf-to-text", "Tool", "516 words. Scanned-vs-text distinction. Description 148."],
  ["https://local2pdf.com/tools/add-page-numbers-to-pdf", "Tool", "678 words. Title 42 characters. Description 129."],
  ["https://local2pdf.com/tools/crop-pdf", "Tool", "515 words. Description 155. Not limited to 25 pages."],
  ["https://local2pdf.com/tools/resize-pdf-pages", "Tool", "529 words. Title 43 characters."],
  ["https://local2pdf.com/tools/n-up-pdf", "Tool", "518 words. Description 127 characters."],
  ["https://local2pdf.com/tools/compress-pdf", "Tool", "585 words. Description 155. Safe vs image-heavy modes."],
  ["https://local2pdf.com/tools/extract-images-from-pdf", "Beta tool", "noindex. 252 words. Omitted from the sitemap."],
  ["https://local2pdf.com/about", "About", "323 words. Person schema for Atanas Ignatov. UIC 208745197."],
  ["https://local2pdf.com/blog", "Blog index", "291 words. Three posts. No Blog schema on the index."],
  ["https://local2pdf.com/blog/image-to-pdf-limit", "Article", "634 words. BlogPosting + Person. Dated 2026-10-17. No H2s."],
  ["https://local2pdf.com/blog/how-local2pdf-processes-files", "Article", "617 words. States display advertising is currently off. No H2s."],
  ["https://local2pdf.com/blog/when-to-compress-a-pdf-locally", "Article", "592 words. Dated 2026-10-17. No H2s."],
  ["https://local2pdf.com/contact", "Contact", "164 words. Email roles. No phone or street address."],
  ["https://local2pdf.com/security", "Security", "321 words. Still says the site may display advertisements."],
  ["https://local2pdf.com/compatibility", "Compatibility", "173 words. Title renders Local2PDF | Local2PDF."],
  ["https://local2pdf.com/changelog", "Changelog", "181 words. Latest entry October 17, 2026."],
  ["https://local2pdf.com/privacy", "Policy", "500 words. Advertising section matches consent, not the homepage FAQ."],
  ["https://local2pdf.com/terms", "Policy", "523 words. Service description is local processing."],
  ["https://local2pdf.com/robots.txt", "Crawl file", "Allows GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended, anthropic-ai, CCBot."],
  ["https://local2pdf.com/sitemap.xml", "Sitemap", "HTTP 200. 36 indexable URLs. lastmod 2026-10-17. Beta tool excluded."],
  ["https://local2pdf.com/llms.txt", "AI summary", "370 words. Firmify EOOD, 25-image limit, preferred citation URLs."],
  ["https://local2pdf.com/llms-full.txt", "AI summary", "946 words. Libraries, browser matrix, security headers."],
  ["https://local2pdf.com/ai.txt", "AI policy", "Allow all. Names Atanas Ignatov and preferred citation pages."],
  ["https://local2pdf.com/ads.txt", "Ads file", "No publisher line. Comment says display ads are off."],
];

const priorityFill = {
  High: ORANGE,
  Medium: AMBER,
  "Quick Win": GREEN,
};

const priorities = [
  ["High", "Security still says “This site may display advertisements,” while the homepage FAQ, the processing article, and ads.txt say display ads are off.", "GEO", "Low", "High"],
  ["Quick Win", "Lengthen eight tool meta descriptions that sit at 124–132 characters: delete, n-up, extract pages, add page numbers, rotate, WebP, and split.", "SEO", "Low", "Medium"],
  ["Quick Win", "Stop the compatibility title template from appending a second brand, so it no longer reads Local2PDF | Local2PDF.", "SEO", "Low", "Medium"],
  ["Medium", "Add question-style H2s inside the three blog posts. Each post is about 600 words and currently has only an H1.", "AEO", "Low", "Medium"],
  ["Medium", "Extend Speakable beyond the single homepage selector #faq-image-limit-answer to the tool FAQ answers.", "AEO", "Medium", "Medium"],
  ["Medium", "Expand About (323 words), Security (321), and Compatibility (173) so the entity pages match the depth of the tool pages.", "GEO", "Medium", "Medium"],
];

const strengths = [
  ["25-image limit", "The homepage badge, homepage FAQ, llms.txt, and the limit article all say 25 images per image-to-PDF conversion. Tool pages that mention 25 pages do so to deny a page cap."],
  ["Answer markup", "Homepage and tool pages ship FAQPage and HowTo JSON-LD that parsed cleanly. The homepage FAQ answer is marked Speakable."],
  ["Named operator", "About and every post name Atanas Ignatov, manager of Firmify EOOD (Bulgaria, UIC 208745197), with Person schema and datePublished 2026-10-17."],
  ["AI crawl access", "robots.txt allows GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended, anthropic-ai, and CCBot, and points to llms.txt, llms-full.txt, and ai.txt."],
  ["Per-tool sharing images", "Each indexable tool has its own og:image under /og/. Twitter cards are present. Canonicals are self-referencing HTTPS URLs."],
  ["Beta tool kept out of the index", "/tools/extract-images-from-pdf returns noindex and is absent from sitemap.xml."],
];

function pageRows() {
  const widths = [3900, 1500, 3960];
  return table(
    [
      headerRow(["URL", "Page type", "Notes"], widths),
      ...pages.map((p, i) => {
        const fill = i % 2 === 0 ? "FFFFFF" : LIGHT;
        return new TableRow({
          cantSplit: true,
          children: [
            cell(p[0], widths[0], { fill, size: 16 }),
            cell(p[1], widths[1], { fill, size: 16 }),
            cell(p[2], widths[2], { fill, size: 16 }),
          ],
        });
      }),
    ],
    widths,
  );
}

function priorityTable() {
  const widths = [1300, 4460, 1100, 1200, 1300];
  return table(
    [
      headerRow(["Priority", "Issue", "Dimension", "Effort", "Impact"], widths),
      ...priorities.map((p) =>
        new TableRow({
          cantSplit: true,
          children: [
            cell(p[0], widths[0], { fill: priorityFill[p[0]], color: "FFFFFF", bold: true, size: 16, align: AlignmentType.CENTER }),
            cell(p[1], widths[1], { size: 16 }),
            cell(p[2], widths[2], { size: 16, align: AlignmentType.CENTER }),
            cell(p[3], widths[3], { size: 16, align: AlignmentType.CENTER }),
            cell(p[4], widths[4], { size: 16, align: AlignmentType.CENTER }),
          ],
        }),
      ),
    ],
    widths,
  );
}

function strengthTable() {
  const widths = [2400, 6960];
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      headerRow(["Strength", "Evidence from the live crawl"], widths),
      ...strengths.map(
        (s, i) =>
          new TableRow({
            cantSplit: true,
            children: [
              cell(s[0], widths[0], { fill: GOODBG, bold: true, size: 18 }),
              cell(s[1], widths[1], { fill: i % 2 ? "F0FDF4" : "FFFFFF", size: 18 }),
            ],
          }),
      ),
    ],
  });
}

const coverScores = [
  ["SEO", "9", "Strong"],
  ["GEO", "9", "Strong"],
  ["AEO", "9", "Strong"],
];

function coverScoreTable() {
  const col = 3000;
  return new Table({
    width: { size: col * 3, type: WidthType.DXA },
    columnWidths: [col, col, col],
    rows: [
      new TableRow({
        cantSplit: true,
        children: coverScores.map(
          ([label, score]) =>
            new TableCell({
              width: { size: col, type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, fill: GREEN },
              borders: noBorders,
              margins: { top: 160, bottom: 160, left: 80, right: 80 },
              verticalAlign: VerticalAlign.CENTER,
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { after: 60 },
                  children: [run(label, { size: 20, bold: true, color: "FFFFFF" })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 40, after: 40 },
                  children: [run(score, { size: 72, bold: true, color: "FFFFFF" })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [run("Strong", { size: 18, italics: true, color: "FFFFFF" })],
                }),
              ],
            }),
        ),
      }),
    ],
  });
}

function cover() {
  return new Table({
    width: { size: 12240, type: WidthType.DXA },
    columnWidths: [12240],
    rows: [
      new TableRow({
        height: { value: 15840, rule: HeightRule.EXACT },
        children: [
          new TableCell({
            width: { size: 12240, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: NAVY },
            borders: noBorders,
            verticalAlign: VerticalAlign.CENTER,
            margins: { top: 400, bottom: 200, left: 800, right: 800 },
            children: [
              para("local2pdf.com", { size: 72, bold: true, color: "FFFFFF", align: AlignmentType.CENTER, before: 1800, after: 200 }),
              para("SEO / GEO / AEO Audit Report", { size: 36, color: "93C5FD", align: AlignmentType.CENTER, before: 80, after: 200 }),
              para("FULL AUDIT", { size: 22, color: "FFFFFF", align: AlignmentType.CENTER, before: 80, after: 400 }),
              coverScoreTable(),
              para("Compared with the prior full audit the same day: 9 / 9 / 9, change 0.", {
                size: 18,
                color: "CBD5E1",
                align: AlignmentType.CENTER,
                before: 280,
                after: 200,
              }),
              para("17 October 2026", { size: 18, color: "94A3B8", align: AlignmentType.CENTER, before: 1400, after: 40 }),
              para("Claude Skill and Plugin by Alex Labat", { size: 18, color: "94A3B8", align: AlignmentType.CENTER, before: 0, after: 0 }),
            ],
          }),
        ],
      }),
    ],
  });
}

function scoreTable() {
  const widths = [1600, 1200, 1600, 4960];
  const rows = [
    ["SEO", "9/10", "Strong", "Unchanged. Titles, canonicals, and schema are solid. Short descriptions and one doubled title remain."],
    ["GEO", "9/10", "Strong", "Unchanged. Named author and llms.txt are in place. Security still contradicts the ads-off claim."],
    ["AEO", "9/10", "Strong", "Unchanged. FAQ and HowTo markup are live. Speakable covers one answer, and the posts have no H2s."],
    ["Combined", "27/30", "Strong", "Same combined score as the v4 audit earlier on 17 October 2026."],
  ];
  return table(
    [
      headerRow(["Dimension", "Score", "Status", "Key takeaway"], widths),
      ...rows.map((r, i) => {
        const fill = i === 3 ? BOX : i % 2 === 0 ? "FFFFFF" : LIGHT;
        return new TableRow({
          cantSplit: true,
          children: [
            cell(r[0], widths[0], { fill, bold: true, size: 18 }),
            cell(r[1], widths[1], { fill: i === 3 ? BOX : GREEN, color: i === 3 ? NAVY : "FFFFFF", bold: true, size: 20, align: AlignmentType.CENTER }),
            cell(r[2], widths[2], { fill, bold: true, size: 18, align: AlignmentType.CENTER }),
            cell(r[3], widths[3], { fill, size: 18 }),
          ],
        });
      }),
    ],
    widths,
  );
}

function diffTable() {
  const widths = [1800, 1800, 1800, 1800, 2160];
  const rows = [
    ["SEO", "9/10 Strong", "9/10 Strong", "0", "Short metas and the doubled compatibility title are still live."],
    ["GEO", "9/10 Strong", "9/10 Strong", "0", "Security advertising sentence is unchanged."],
    ["AEO", "9/10 Strong", "9/10 Strong", "0", "Speakable is still only on the homepage image-limit answer."],
    ["Combined", "27/30", "27/30", "0", "No scored signal moved between the two crawls."],
  ];
  return table(
    [
      headerRow(["Dimension", "v4 earlier today", "This audit", "Change", "Why"], widths),
      ...rows.map((r, i) => {
        const fill = i % 2 === 0 ? "FFFFFF" : LIGHT;
        return new TableRow({
          cantSplit: true,
          children: [
            cell(r[0], widths[0], { fill, bold: true, size: 18 }),
            cell(r[1], widths[1], { fill, size: 16, align: AlignmentType.CENTER }),
            cell(r[2], widths[2], { fill: GREEN, color: "FFFFFF", bold: true, size: 16, align: AlignmentType.CENTER }),
            cell(r[3], widths[3], { fill: "E2E8F0", bold: true, size: 20, align: AlignmentType.CENTER }),
            cell(r[4], widths[4], { fill, size: 16 }),
          ],
        });
      }),
    ],
    widths,
  );
}

const header = new Header({
  children: [
    new Table({
      width: { size: W, type: WidthType.DXA },
      columnWidths: [3200, 6160],
      rows: [
        new TableRow({
          children: [
            cell("local2pdf.com", 3200, { bold: true, size: 18, color: NAVY, borders: { ...noBorders, bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY } } }),
            cell("SEO / GEO / AEO Audit Report", 6160, { size: 18, color: MUTED, align: AlignmentType.RIGHT, borders: { ...noBorders, bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY } } }),
          ],
        }),
      ],
    }),
  ],
});

const footer = new Footer({
  children: [
    new Table({
      width: { size: W, type: WidthType.DXA },
      columnWidths: [7000, 2360],
      rows: [
        new TableRow({
          children: [
            cell("Claude Skill and Plugin by Alex Labat", 7000, {
              size: 16,
              color: MUTED,
              borders: { ...noBorders, top: { style: BorderStyle.SINGLE, size: 6, color: BORDER } },
            }),
            new TableCell({
              width: { size: 2360, type: WidthType.DXA },
              borders: { ...noBorders, top: { style: BorderStyle.SINGLE, size: 6, color: BORDER } },
              margins: { top: 70, bottom: 70, left: 90, right: 90 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    run("Page ", { size: 16, color: MUTED }),
                    new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: MUTED }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

const body = [
  h1("Executive Summary"),
  new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    rows: [
      new TableRow({
        children: [
          cell(
            "Local2PDF is a strong privacy-first PDF toolkit on the live site. The 25-image cap, named author, FAQ and HowTo schema, and AI crawler policy are all deployed. Nothing measured in this crawl moved a score versus the v4 full audit earlier on 17 October 2026, so SEO, GEO, and AEO stay at 9/10 and the combined score stays 27/30. The same three gaps are still the reason this is not a 10: the Security page says the site may display advertisements, eight tool descriptions are under 140 characters, and Compatibility titles itself Local2PDF | Local2PDF.",
            W,
            { fill: BOX, size: 22, borders: noBorders, top: 140, bottom: 140 },
          ),
        ],
      }),
    ],
  }),
  para(""),
  scoreTable(),
  h2("Score difference versus the prior full audit"),
  para("The baseline is the v4 full audit of local2pdf.com on 17 October 2026, which scored 9 / 9 / 9 after the score-max deploy. This crawl used the same 1–10 rubric on the live HTML. A dimension moves only when a scored signal on the live site has changed.", { size: 22, after: 140 }),
  diffTable(),
  para("Earlier the same day the site had scored 7/6/7, then 8/7/8, then 8/8/8, then 9/9/9. This pass does not add another step.", { size: 22, before: 140 }),

  h1("Pages Audited"),
  para("42 live URLs returned HTTP 200. Word counts are visible text after scripts and styles are removed. A markdown fetcher returned 500 once for sitemap.xml; a direct fetch of the same URL returned the sitemap below.", { size: 22 }),
  pageRows(),

  h1("SEO Analysis"),
  para("Score: 9/10 — Strong. Unchanged from v4.", { size: 24, bold: true, color: GREEN, after: 160 }),
  h2("Technical On-Page"),
  signalTable([
    ["Title tags", "Every HTML page has one title. The homepage decodes to 43 characters (“Private PDF Tools — No Upload, Free & Local”), short of 50–60. Compatibility is “Browser Compatibility — Local2PDF | Local2PDF”. Changelog is 29 characters, the blog index 34, privacy 26, and terms 24.", "Needs Attention"],
    ["Meta descriptions", "Present on all 36 HTML pages, with a call to stay on-device. Eight tool descriptions are 124–132 characters: delete 124, n-up 127, extract pages 128, add page numbers 129, rotate 130, WebP 131, split 132. Homepage and PDF-to-JPG are 169. The limit article is 174.", "Needs Attention"],
    ["Heading hierarchy", "Each HTML page has a single H1. Tool pages use “How do I…?” H2s. Combine Images repeats “How do I combine images into one PDF?” twice. The three posts have an H1 and no H2.", "Needs Attention"],
    ["URL structure", "Readable keyword paths such as /tools/merge-pdf and /blog/image-to-pdf-limit. No tracking parameters.", "Good"],
    ["Canonical", "Self-referencing https://local2pdf.com URLs on every HTML page, including the homepage at https://local2pdf.com.", "Good"],
    ["Robots meta", "index, follow on the indexable set. /tools/extract-images-from-pdf is noindex and is not in the sitemap.", "Good"],
    ["Viewport", "A viewport meta tag is present on the HTML pages.", "Good"],
    ["Image alt text", "The homepage and image-to-PDF each expose two images, both with alt text. Most tool pages are text and have no content images.", "Good"],
    ["Internal links", "Tool pages link to related tools. /pdf-tools groups the catalog. The blog index links to three posts.", "Good"],
    ["Open Graph and Twitter", "og:title, og:description, og:image, and twitter:card are present. Tool pages use /og/{slug}.png. Trust pages share https://local2pdf.com/og-image.png.", "Good"],
  ]),
  h2("Content Quality"),
  signalTable([
    ["Word count", "Core tools clear 500 words: image-to-PDF 640, merge 671, extract pages 720, add page numbers 678, HEIC 723, screenshot 703. About is 323, Security 321, the blog index 291, Compatibility 173, Contact 164, and Changelog 181.", "Needs Attention"],
    ["Keyword signals", "Titles, H1s, and opening lines name the tool and the private, no-upload constraint. Format pages (JPG, PNG, WebP, HEIC, photos, screenshots) keep distinct intents.", "Good"],
    ["Freshness", "The three posts carry datePublished and dateModified of 2026-10-17. The changelog’s newest heading is October 17, 2026. Sitemap lastmod matches that date.", "Good"],
    ["Readability", "Tool pages scan as steps, limitations, and FAQs. The posts are continuous prose without subheadings.", "Needs Attention"],
  ]),
  h2("Structured Data"),
  signalTable([
    ["Schema types", "Organization, WebSite, WebPage, WebApplication, Offer, FAQPage, HowTo, BreadcrumbList, BlogPosting, Person, and SpeakableSpecification. JSON-LD on the fetched pages parsed.", "Good"],
    ["Organization completeness", "Local2PDF declares a logo, support@local2pdf.com, parentOrganization Firmify EOOD, addressCountry BG, and sameAs links to GitHub and Product Hunt. There is no street address or telephone.", "Good"],
    ["Tool entities", "Indexable tools include WebApplication with an Offer, plus FAQPage, HowTo, and BreadcrumbList.", "Good"],
    ["Article entities", "Each post is a BlogPosting with a Person author. The blog index itself has Organization and WebSite only.", "Needs Attention"],
  ]),

  h1("GEO Analysis"),
  para("Score: 9/10 — Strong. GEO is how AI answer engines decide what to cite. Unchanged from v4.", { size: 24, bold: true, color: GREEN, after: 160 }),
  h2("E-E-A-T Assessment"),
  signalTable([
    ["Author", "Posts and About name Atanas Ignatov, jobTitle “Manager of Firmify EOOD”, with a Person node and worksFor Firmify EOOD.", "Good"],
    ["About page", "States Firmify EOOD is a Bulgarian company, UIC 208745197, and that it also publishes Firmify and StoryKind. The page is 323 words.", "Good"],
    ["Contact", "Contact offers Support, Privacy, Security, and Bug Reports. llms.txt lists support@, privacy@, and security@local2pdf.com. No phone number and no street address.", "Needs Attention"],
    ["Trust signals", "sameAs points to the GitHub repo and the Product Hunt listing. The crawled pages do not show testimonials, reviews, or awards.", "Needs Attention"],
    ["Advertising claim", "Homepage FAQ: “Display advertising is currently off; ads.txt lists no authorized sellers.” The processing article repeats that ads are off. ads.txt lists no publisher. Security still says: “This site may display advertisements.”", "Needs Attention"],
  ]),
  h2("Content for AI Synthesis"),
  signalTable([
    ["Factual density", "Citable facts include the 25-image cap, device-dependent PDF limits, Chrome/Firefox/Edge 90+, Safari 15+, Firmify UIC, and the library list in llms-full.txt (pdf-lib, pdfjs-dist, heic-decode).", "Good"],
    ["Clear claim", "The homepage H1 and the first paragraph say files are processed in the browser with no uploads, no account, and no watermark.", "Good"],
    ["External citations", "The pages state original product facts. They do not cite outside studies or standards.", "Needs Attention"],
    ["Entity clarity", "Local2PDF, Firmify EOOD, and Atanas Ignatov are named the same way in About, the posts, llms.txt, and ai.txt.", "Good"],
    ["Originality", "The processing article tells readers to confirm local handling in the browser Network tab. That is a specific, checkable claim.", "Good"],
    ["Limit consistency", "“25 images” is the cap on the badge, the FAQ, llms.txt, and the limit article. “25 pages” on crop, PDF-to-PNG, compress, and combine is used to say those tools are not capped at 25 pages.", "Good"],
  ]),
  h2("Technical GEO"),
  signalTable([
    ["AI discovery files", "llms.txt, llms-full.txt, and ai.txt all return 200. ai.txt names the operator, the author, and four preferred citation URLs.", "Good"],
    ["Crawler policy", "robots.txt allows OAI-SearchBot, ChatGPT-User, GPTBot, Google-Extended, PerplexityBot, anthropic-ai, CCBot, and * . The sitemap line is present.", "Good"],
    ["HTTPS", "Every fetched URL was served over HTTPS.", "Good"],
    ["sameAs", "Organization.sameAs includes https://github.com/azsumnasko/img2pdf and https://www.producthunt.com/products/local2pdf.", "Good"],
    ["Sitemap", "sitemap.xml returned 200 with the indexable routes and lastmod 2026-10-17. The beta extract-images URL is excluded.", "Good"],
  ]),

  h1("AEO Analysis"),
  para("Score: 9/10 — Strong. AEO is how a page gets lifted into a snippet or a spoken answer. Unchanged from v4.", { size: 24, bold: true, color: GREEN, after: 160 }),
  h2("Featured Snippet Eligibility"),
  signalTable([
    ["Direct answer", "The homepage FAQ answers “How many images can I convert at once?” in one short paragraph, and Speakable points at #faq-image-limit-answer.", "Good"],
    ["Definition pattern", "llms.txt opens with “Local2PDF is a privacy-first PDF toolkit.” About repeats the operator and the local-processing model.", "Good"],
    ["List content", "The homepage “How do I use Local2PDF?” block is four numbered steps. Tool pages repeat select, adjust, download.", "Good"],
    ["Table content", "No comparison table was present in the fetched HTML. A browser-support or format matrix would be eligible for a table snippet.", "Missing"],
  ]),
  h2("Structured Answer Formats"),
  signalTable([
    ["FAQ schema", "FAQPage with Question and Answer is on the homepage and on the tool pages, including the noindex beta tool.", "Good"],
    ["HowTo schema", "HowTo and HowToStep are on the homepage and the tool pages. The combine-images steps name the 25-image selection limit.", "Good"],
    ["Question headings", "Tool H2s use “How do I…?”. Homepage FAQ questions sit in the accordion rather than as H2s. Blog posts have no question headings.", "Needs Attention"],
    ["Speakable schema", "SpeakableSpecification appears only on the homepage, with cssSelector #faq-image-limit-answer. Tool FAQs are not speakable.", "Needs Attention"],
  ]),
  h2("Voice Search Readiness"),
  signalTable([
    ["Conversational language", "Answers use plain second-person lines: no account, no watermark, files stay on the device.", "Good"],
    ["Long-tail coverage", "Dedicated pages answer JPG vs PNG vs WebP vs HEIC, the 25-image cap, when to compress, and how local processing works.", "Good"],
    ["Local signals", "This is a software product, not a storefront. Schema has addressCountry BG and an email. There is no phone or street, which fits the product.", "Good"],
  ]),

  h1("Priority Recommendations"),
  para("These are the same open items as v4, restated against the live HTML from this crawl. None of them is severe enough to pull a 9 down to an 8, and none has been fixed, so none of them earns a 10.", { size: 22 }),
  priorityTable(),

  h1("What's Working Well"),
  strengthTable(),

  h1("What this audit did not measure"),
  para("Core Web Vitals, rendered layout, and lab performance need a PageSpeed Insights run at pagespeed.web.dev. Backlinks, rankings, and Search Console coverage are outside an HTML crawl. JavaScript-only text is not a concern here: the fetched HTML already contains the headings, FAQs, and JSON-LD.", { size: 22 }),

  h1("Glossary"),
  para("SEO is conventional search: titles, descriptions, headings, links, and structured data that help a page rank and get clicked.", { size: 22 }),
  para("GEO is generative engine optimization: writing and marking up pages so AI answer engines can identify the entity, trust the claim, and cite the URL.", { size: 22 }),
  para("AEO is answer engine optimization: shaping a direct answer, a list, a table, or a FAQ so a snippet or a voice assistant can read it back.", { size: 22 }),
];

const doc = new Document({
  styles: {
    default: {
      document: { styles: [{ id: "Normal", run: { font: "Arial", size: 22 } }] },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 0, bottom: 0, left: 0, right: 0 },
        },
      },
      children: [cover()],
    },
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440, header: 720, footer: 720 },
        },
      },
      headers: { default: header },
      footers: { default: footer },
      children: body,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(docxPath, buffer);
console.log("DOCX written", docxPath, buffer.length);
