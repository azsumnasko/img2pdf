import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire(
  "file:///C:/Users/Nasko/AppData/Roaming/npm/node_modules/docx/package.json",
);
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber,
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
const W = 9360;

const thin = { style: BorderStyle.SINGLE, size: 4, color: BORDER };
const borders = { top: thin, bottom: thin, left: thin, right: thin };
const noLine = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noLine, bottom: noLine, left: noLine, right: noLine };
const navyLine = { style: BorderStyle.SINGLE, size: 8, color: NAVY };
const grayLine = { style: BorderStyle.SINGLE, size: 6, color: BORDER };

const outDir = path.resolve("reports");
const docxPath = path.join(outDir, "seo-audit-local2pdf-com-2026-10-17-v7.docx");

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
  const lines = Array.isArray(text) ? text : [text];
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill } : undefined,
    margins: { top: opts.top ?? 70, bottom: opts.bottom ?? 70, left: 90, right: 90 },
    borders: opts.borders ?? borders,
    verticalAlign: VerticalAlign.CENTER,
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
    [headerRow(["Signal", "Finding", "Status"], widths), ...rows.map((r, i) => signalRow(r[0], r[1], r[2], i))],
    widths,
  );
}

function zebra(values, widths, i, fills) {
  const fill = i % 2 === 0 ? "FFFFFF" : LIGHT;
  return new TableRow({
    cantSplit: true,
    children: values.map((value, idx) =>
      cell(value, widths[idx], {
        fill: fills?.[idx] ?? fill,
        color: fills?.[idx] ? "FFFFFF" : TEXT,
        bold: Boolean(fills?.[idx]) || idx === 0,
        size: 18,
        align: fills?.[idx] ? AlignmentType.CENTER : AlignmentType.LEFT,
      }),
    ),
  });
}

const pages = [
  ["https://local2pdf.com/", "Homepage", "715 words. Title 51. FAQ H3s. Speakable on the 25-image answer."],
  ["https://local2pdf.com/pdf-tools", "Directory", "612 words. Title 54. Description 157."],
  ["https://local2pdf.com/tools/image-to-pdf", "Tool", "640 words. FAQ, HowTo, Speakable. 25-image cap."],
  ["https://local2pdf.com/tools/jpg-to-pdf", "Tool", "588 words. Title 51. Description 156."],
  ["https://local2pdf.com/tools/png-to-pdf", "Tool", "510 words. Title 51. Description 155."],
  ["https://local2pdf.com/tools/webp-to-pdf", "Tool", "660 words. Title 52. Description 160."],
  ["https://local2pdf.com/tools/heic-to-pdf", "Tool", "723 words. Title 52. Description 150."],
  ["https://local2pdf.com/tools/combine-images-to-pdf", "Tool", "547 words. No duplicate How-do-I heading."],
  ["https://local2pdf.com/tools/photos-to-pdf", "Tool", "522 words. Title 54."],
  ["https://local2pdf.com/tools/screenshot-to-pdf", "Tool", "703 words. Title 58."],
  ["https://local2pdf.com/tools/merge-pdf", "Tool", "671 words. Title 50. Speakable."],
  ["https://local2pdf.com/tools/split-pdf", "Tool", "608 words. Title 51."],
  ["https://local2pdf.com/tools/rotate-pdf", "Tool", "553 words. Title 57."],
  ["https://local2pdf.com/tools/reorder-pdf-pages", "Tool", "594 words. Title 61 (one over the 50–60 band)."],
  ["https://local2pdf.com/tools/delete-pdf-pages", "Tool", "535 words. Title 56."],
  ["https://local2pdf.com/tools/extract-pdf-pages", "Tool", "720 words. Title 58."],
  ["https://local2pdf.com/tools/pdf-to-jpg", "Tool", "537 words. Title 56."],
  ["https://local2pdf.com/tools/pdf-to-png", "Tool", "529 words. Title 50 — fixed from 48 in v6."],
  ["https://local2pdf.com/tools/pdf-to-text", "Tool", "541 words. Title 51."],
  ["https://local2pdf.com/tools/add-page-numbers-to-pdf", "Tool", "681 words. Title 54."],
  ["https://local2pdf.com/tools/crop-pdf", "Tool", "515 words. Title 54."],
  ["https://local2pdf.com/tools/resize-pdf-pages", "Tool", "531 words. Title 57."],
  ["https://local2pdf.com/tools/n-up-pdf", "Tool", "518 words. Title 55."],
  ["https://local2pdf.com/tools/compress-pdf", "Tool", "585 words. Title 51."],
  ["https://local2pdf.com/tools/extract-images-from-pdf", "Beta tool", "252 words. noindex. Not in sitemap."],
  ["https://local2pdf.com/about", "About", "540 words. Firmify EOOD, UIC, Atanas Ignatov. Library links."],
  ["https://local2pdf.com/blog", "Blog index", "721 words — fixed from 289 in v6. Blog + ItemList schema."],
  ["https://local2pdf.com/blog/image-to-pdf-limit", "Article", "710 words. Speakable. Question H2s."],
  ["https://local2pdf.com/blog/how-local2pdf-processes-files", "Article", "726 words. Speakable. PDF.js and pdf-lib links."],
  ["https://local2pdf.com/blog/when-to-compress-a-pdf-locally", "Article", "671 words. Title 54 — fixed from 42. Speakable."],
  ["https://local2pdf.com/contact", "Contact", "638 words — fixed from 202. Visible support/privacy/security emails."],
  ["https://local2pdf.com/security", "Security", "546 words. Ads-off wording matches homepage and ads.txt."],
  ["https://local2pdf.com/compatibility", "Compatibility", "584 words — fixed from 473. Two comparison tables."],
  ["https://local2pdf.com/changelog", "Changelog", "510 words — fixed from 209. Intro restates July and October history."],
  ["https://local2pdf.com/privacy", "Legal", "517 words. Conventional short title (26). Ads-off section."],
  ["https://local2pdf.com/terms", "Legal", "523 words. Conventional short title (24)."],
  ["https://local2pdf.com/robots.txt", "Crawl policy", "Allows major AI bots. Sitemap pointer present."],
  ["https://local2pdf.com/sitemap.xml", "Sitemap", "35 indexable URLs. lastmod 2026-10-17."],
  ["https://local2pdf.com/llms.txt", "AI summary", "Operator, 25-image cap, preferred pages."],
  ["https://local2pdf.com/llms-full.txt", "AI full text", "Libraries, browser floors, operator facts."],
  ["https://local2pdf.com/ai.txt", "AI policy", "Allow all. Preferred citation URLs."],
  ["https://local2pdf.com/ads.txt", "Ads policy", "No publisher record. Ads stated as off."],
];

const priorities = [
  ["Quick Win", "Shorten the Reorder PDF Pages title by one character so the rendered title is 60 or under (now 61: “Reorder PDF Pages Locally — Drag, Sort & Save | Local2PDF”).", "SEO", "Low", "Low"],
  ["Quick Win", "Optional: trim Privacy and Terms titles only if you want every legal page in the 50–60 band. Conventional short legal titles are acceptable.", "SEO", "Low", "Low"],
];

const cover = [
  new Paragraph({ spacing: { before: 1800, after: 0 }, children: [run("", { size: 20 })] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 },
    children: [run("local2pdf.com", { size: 72, bold: true, color: "FFFFFF" })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 },
    children: [run("SEO / GEO / AEO Audit Report", { size: 36, color: "93C5FD" })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 400 },
    children: [run("FULL AUDIT", { size: 22, color: "FFFFFF" })],
  }),
  new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [3120, 3120, 3120],
    rows: [
      new TableRow({
        cantSplit: true,
        children: ["SEO", "GEO", "AEO"].map((label) =>
          new TableCell({
            width: { size: 3120, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: GREEN },
            margins: { top: 180, bottom: 180, left: 80, right: 80 },
            borders: noBorders,
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [run(label, { size: 20, bold: true, color: "FFFFFF" })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [run("10", { size: 72, bold: true, color: "FFFFFF" })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [run("Strong", { size: 18, italics: true, color: "FFFFFF" })] }),
            ],
          }),
        ),
      }),
    ],
  }),
  new Paragraph({ spacing: { before: 1800, after: 0 }, children: [run("", { size: 20 })] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 40 },
    children: [run("17 October 2026", { size: 18, color: "94A3B8" })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [run("Claude Skill and Plugin by Alex Labat", { size: 18, color: "94A3B8" })],
  }),
];

function scoreTable() {
  const widths = [1800, 1200, 1800, 4560];
  const rows = [
    ["SEO", "10/10", "Strong", "The v6 blockers are gone: short titles, thin pages, and description length."],
    ["GEO", "10/10", "Strong", "Ads-off claim, author entity, contact emails, and library citations stay aligned."],
    ["AEO", "10/10", "Strong", "Tables, Speakable on tools and posts, and 40–60 word answers remain live."],
    ["Combined", "30/30", "Strong", "Up 1 from the v6 full audit earlier on 17 October 2026 (29/30)."],
  ];
  return table(
    [
      headerRow(["Dimension", "Score", "Status", "Key Takeaway"], widths),
      ...rows.map((r, i) => {
        const fill = GREEN;
        return new TableRow({
          cantSplit: true,
          children: [
            cell(r[0], widths[0], { fill: i % 2 ? LIGHT : "FFFFFF", bold: true, size: 18 }),
            cell(r[1], widths[1], { fill, color: "FFFFFF", bold: true, size: 18, align: AlignmentType.CENTER }),
            cell(r[2], widths[2], { fill: i % 2 ? LIGHT : "FFFFFF", size: 18 }),
            cell(r[3], widths[3], { fill: i % 2 ? LIGHT : "FFFFFF", size: 18 }),
          ],
        });
      }),
    ],
    widths,
  );
}

function diffTable() {
  const widths = [1800, 1600, 1600, 1600, 2760];
  const rows = [
    ["SEO", "9/10", "10/10", "+1", "PDF-to-PNG and compress titles fixed; blog, Contact, Compatibility, Changelog clear 500 words."],
    ["GEO", "10/10", "10/10", "0", "No GEO signal moved. Ads-off and entity facts still agree."],
    ["AEO", "10/10", "10/10", "0", "Speakable now covers the three posts as well as tools."],
    ["Combined", "29/30", "30/30", "+1", "Baseline is the v6 full audit from earlier on 17 October 2026."],
  ];
  return table(
    [
      headerRow(["Dimension", "v6", "Now", "Change", "Why it moved"], widths),
      ...rows.map((r, i) =>
        zebra(r, widths, i, {
          3: r[3].startsWith("+") ? GREEN : NAVY,
        }),
      ),
    ],
    widths,
  );
}

const header = new Header({
  children: [
    new Paragraph({
      border: { bottom: navyLine },
      spacing: { after: 120 },
      children: [
        run("local2pdf.com", { size: 18, bold: true, color: NAVY }),
        run("          SEO / GEO / AEO Audit Report", { size: 18, color: "64748B" }),
      ],
    }),
  ],
});

const footer = new Footer({
  children: [
    new Paragraph({
      border: { top: grayLine },
      spacing: { before: 80 },
      children: [
        run("Claude Skill and Plugin by Alex Labat", { size: 18, color: "64748B" }),
        run("          ", { size: 18 }),
        new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18, color: "64748B" }),
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
            "Local2PDF reaches 10/10/10 on this live crawl. Combined score: 30/30, up 1 from the v6 full audit earlier on 17 October 2026 (9/10/10, 29/30). SEO moves from 9 to 10 because the score-max deploy is live: PDF to PNG is 50 characters, the compress article is 54, the blog index is 721 words, Compatibility is 584, Contact is 638, and Changelog is 510. Every indexable meta description is 150–160 characters. GEO and AEO stay at 10. The only leftover polish is Reorder PDF Pages at 61 characters (one over the 50–60 band) and the conventional short Privacy and Terms titles.",
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
  para("The baseline is the v6 full audit of local2pdf.com on 17 October 2026, which scored 9 / 10 / 10. This crawl used the same 1–10 rubric on the live HTML. SEO moves when the signals that held it at 9 are no longer present. A 10 means the category has no Missing or Needs Attention signal left on scored indexable pages (Privacy and Terms short titles remain intentional exceptions).", { size: 22, after: 140 }),
  diffTable(),
  para("Earlier the same day the live site scored 7/6/7, then 8/7/8, then 8/8/8, then 9/9/9, then 9/10/10. This pass is 10/10/10.", { size: 22, before: 140 }),

  h1("Pages Audited"),
  para("42 live URLs returned HTTP 200. Word counts are visible text after scripts and styles are removed.", { size: 22 }),
  table(
    [
      headerRow(["URL", "Page type", "Notes"], [4200, 1400, 3760]),
      ...pages.map((p, i) => zebra(p, [4200, 1400, 3760], i)),
    ],
    [4200, 1400, 3760],
  ),

  h1("SEO Analysis"),
  para("Score: 10/10 — Strong. Up from 9/10 in v6. The short titles and thin content pages that held SEO at 9 are fixed on the live site.", { size: 24, bold: true, color: GREEN, after: 160 }),
  h2("Technical On-Page"),
  signalTable([
    ["Title tags", "Indexable tool and content titles sit in or next to the 50–60 band. PDF to PNG is 50 (“PDF to PNG Locally — Lossless, Private | Local2PDF”). The compress article is 54. Homepage is 51. Reorder is 61 (one over). Privacy (26) and Terms (24) remain conventional legal titles. The doubled Compatibility brand is gone.", "Good"],
    ["Meta descriptions", "Every indexable HTML description measures 150–160 characters. The noindex beta tool is 123 and is outside the indexable set.", "Good"],
    ["Heading hierarchy", "Each HTML page has a single H1. Tool pages use How-do-I H2s. Posts use question H2s. Homepage FAQ questions are H3s. No duplicate How-do-I heading on combine-images.", "Good"],
    ["URL structure", "Readable keyword paths. No tracking parameters.", "Good"],
    ["Canonical", "Self-referencing https://local2pdf.com URLs on every HTML page.", "Good"],
    ["Robots meta", "index, follow on the indexable set. Extract-images is noindex and absent from the sitemap.", "Good"],
    ["Viewport", "Present on HTML pages.", "Good"],
    ["Image alt text", "Homepage and image-to-PDF images have alt text.", "Good"],
    ["Internal links", "Tool pages, /pdf-tools, blog index, and About cross-link the catalog and operator pages.", "Good"],
    ["Open Graph and Twitter", "og:title, og:description, og:image, and twitter:card are present on HTML pages.", "Good"],
  ]),
  h2("Content Quality"),
  signalTable([
    ["Word count", "Core tools, posts, About (540), Security (546), Compatibility (584), Contact (638), Changelog (510), and the blog index (721) clear 500 words. Privacy and Terms also clear 500.", "Good"],
    ["Keyword signals", "Titles, H1s, and openings name the tool and the private, no-upload constraint.", "Good"],
    ["Freshness", "Posts and sitemap lastmod are 2026-10-17. Changelog newest heading is October 17, 2026.", "Good"],
    ["Readability", "Tools scan as steps and FAQs. Posts break into question H2s with a direct answer under the first one.", "Good"],
  ]),
  h2("Structured Data"),
  signalTable([
    ["Schema types", "Organization, WebSite, WebPage, WebApplication, Offer, FAQPage, HowTo, BreadcrumbList, Blog, BlogPosting, Person, ItemList, SpeakableSpecification.", "Good"],
    ["Organization completeness", "Logo, support email, parentOrganization Firmify EOOD, addressCountry BG, sameAs to GitHub and Product Hunt.", "Good"],
    ["Tool entities", "Indexable tools include WebApplication, Offer, FAQPage, HowTo, BreadcrumbList, SpeakableSpecification.", "Good"],
    ["Article entities", "Posts are BlogPosting with Person author and Speakable. Blog index has Blog, Person, BlogPosting, and ItemList.", "Good"],
  ]),

  h1("GEO Analysis"),
  para("Score: 10/10 — Strong. Unchanged from v6. GEO is how AI answer engines decide what to cite.", { size: 24, bold: true, color: GREEN, after: 160 }),
  h2("E-E-A-T Assessment"),
  signalTable([
    ["Author", "Posts and About name Atanas Ignatov, Manager of Firmify EOOD, with a Person node.", "Good"],
    ["About page", "540 words. Firmify EOOD, UIC 208745197, Firmify and StoryKind links.", "Good"],
    ["Contact", "638 words. Visible support@, privacy@, and security@ addresses. Email-only by design.", "Good"],
    ["Trust signals", "sameAs to GitHub and Product Hunt. No invented testimonials.", "Good"],
    ["Advertising claim", "Homepage, Security, Privacy, blog, and ads.txt agree: display advertising is currently off.", "Good"],
  ]),
  h2("Content for AI Synthesis"),
  signalTable([
    ["Factual density", "25-image cap, device-dependent PDF limits, browser floors, Firmify UIC, library list.", "Good"],
    ["Clear claim", "Homepage H1 and lead say no uploads, no account, no watermark.", "Good"],
    ["External citations", "About, Security, and the processing article link PDF.js and pdf-lib project pages.", "Good"],
    ["Entity clarity", "Local2PDF, Firmify EOOD, and Atanas Ignatov are consistent across pages and AI files.", "Good"],
    ["Originality", "Network-tab verification instructions remain on Security and the processing article.", "Good"],
    ["Limit consistency", "25 images is the image-to-PDF cap. 25 pages is used to deny a page cap on PDF tools.", "Good"],
  ]),
  h2("Technical GEO"),
  signalTable([
    ["AI discovery files", "llms.txt, llms-full.txt, and ai.txt return 200.", "Good"],
    ["Crawler policy", "robots.txt allows OAI-SearchBot, GPTBot, PerplexityBot, Google-Extended, anthropic-ai, CCBot, and *.", "Good"],
    ["HTTPS", "Every fetched URL was HTTPS.", "Good"],
    ["sameAs", "GitHub and Product Hunt on Organization.", "Good"],
    ["Sitemap", "35 indexable routes. Beta extract-images excluded.", "Good"],
  ]),

  h1("AEO Analysis"),
  para("Score: 10/10 — Strong. Unchanged from v6 on the primary signals. Posts now also carry Speakable markup.", { size: 24, bold: true, color: GREEN, after: 160 }),
  h2("Featured Snippet Eligibility"),
  signalTable([
    ["Direct answer", "Posts answer the first question in about 48–53 words. Homepage Speakable targets the 25-image FAQ.", "Good"],
    ["Definition pattern", "llms.txt and About define Local2PDF as a privacy-first PDF toolkit.", "Good"],
    ["List content", "Homepage four-step how-to. Tool pages use select, adjust, download.", "Good"],
    ["Table content", "Compatibility has two HTML tables: browser/HEIC/offline and File API/Canvas/WebAssembly/Workers.", "Good"],
  ]),
  h2("Structured Answer Formats"),
  signalTable([
    ["FAQ schema", "FAQPage on homepage and tools.", "Good"],
    ["HowTo schema", "HowTo and HowToStep on homepage and tools.", "Good"],
    ["Question headings", "Tool How-do-I H2s. Homepage FAQ H3s. Post question H2s.", "Good"],
    ["Speakable schema", "Homepage, every tool, and all three posts use SpeakableSpecification.", "Good"],
  ]),
  h2("Voice Search Readiness"),
  signalTable([
    ["Conversational language", "Plain second-person answers: no account, no watermark, files stay on device.", "Good"],
    ["Long-tail coverage", "Dedicated pages for formats, the 25-image cap, compression, and local processing.", "Good"],
    ["Local signals", "Software product: addressCountry BG and email. No phone or street by design.", "Good"],
  ]),

  h1("Priority Recommendations"),
  para("Nothing here is severe enough to pull a score down from 10. These are optional polish items.", { size: 22 }),
  table(
    [
      headerRow(["Priority", "Issue", "Dimension", "Effort", "Impact"], [1400, 4560, 1200, 1100, 1100]),
      ...priorities.map((p, i) => {
        const fill = p[0] === "Quick Win" ? GREEN : AMBER;
        const widths = [1400, 4560, 1200, 1100, 1100];
        const rowFill = i % 2 ? LIGHT : "FFFFFF";
        return new TableRow({
          cantSplit: true,
          children: [
            cell(p[0], widths[0], { fill, color: "FFFFFF", bold: true, size: 16, align: AlignmentType.CENTER }),
            cell(p[1], widths[1], { fill: rowFill, size: 18 }),
            cell(p[2], widths[2], { fill: rowFill, size: 18 }),
            cell(p[3], widths[3], { fill: rowFill, size: 18 }),
            cell(p[4], widths[4], { fill: rowFill, size: 18 }),
          ],
        });
      }),
    ],
    [1400, 4560, 1200, 1100, 1100],
  ),

  h1("What's Working Well"),
  table(
    [
      headerRow(["Strength", "Evidence from this crawl"], [2800, 6560]),
      ...[
        ["SEO score-max is live", "PDF-to-PNG title 50, compress article 54, blog 721 words, Compatibility 584, Contact 638, Changelog 510."],
        ["Descriptions stay in range", "All indexable descriptions are 150–160 characters."],
        ["Ads claim is consistent", "Homepage, Security, Privacy, and ads.txt say display advertising is off."],
        ["Speakable covers tools and posts", "Homepage, tool FAQs, and all three posts expose SpeakableSpecification."],
        ["Compatibility remains citable", "Two tables cover browser floors and Web APIs."],
        ["AI crawlers are invited", "robots.txt allows major AI agents. llms.txt, llms-full.txt, and ai.txt return 200."],
      ].map((r, i) => zebra(r, [2800, 6560], i)),
    ],
    [2800, 6560],
  ),
  para(""),
  new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    rows: [
      new TableRow({
        children: [
          cell(
            "The green rows above are observations from the 17 October 2026 live crawl. They are not a ranking guarantee.",
            W,
            { fill: GOODBG, size: 18, borders: noBorders, top: 80, bottom: 80 },
          ),
        ],
      }),
    ],
  }),

  h1("What this audit did not measure"),
  para("Core Web Vitals, rendered layout, and lab performance need a PageSpeed Insights run at pagespeed.web.dev. Backlinks, rankings, and Search Console coverage are outside an HTML crawl.", { size: 22 }),

  h1("Glossary"),
  para("SEO is traditional search optimization: titles, descriptions, headings, links, and structured data that help a page get crawled and ranked.", { size: 22 }),
  para("GEO is generative engine optimization: writing and marking up pages so AI answer engines such as ChatGPT Search, Perplexity, Gemini, and Google AI Overviews can cite them.", { size: 22 }),
  para("AEO is answer engine optimization: shaping a page so a featured snippet, a People Also Ask box, or a voice assistant can lift one direct answer.", { size: 22 }),
];

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, bottom: 1080, left: 1440, right: 1440 },
        },
      },
      children: cover,
    },
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: { default: header },
      footers: { default: footer },
      children: body,
    },
  ],
});

fs.mkdirSync(outDir, { recursive: true });
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(docxPath, buffer);
console.log("wrote", docxPath, buffer.length);
