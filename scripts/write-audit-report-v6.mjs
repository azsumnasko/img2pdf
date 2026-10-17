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
const docxPath = path.join(outDir, "seo-audit-local2pdf-com-2026-10-17-v6.docx");

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
  ["https://local2pdf.com/", "Homepage", "715 words. Title 51. FAQ questions are H3s. Speakable on the 25-image answer."],
  ["https://local2pdf.com/pdf-tools", "Directory", "612 words. Title 54. Description 157. Tool groups with internal links."],
  ["https://local2pdf.com/tools/image-to-pdf", "Tool", "640 words. Title 54. FAQ, HowTo, Speakable. 25-image cap stated."],
  ["https://local2pdf.com/tools/jpg-to-pdf", "Tool", "588 words. Title 51. Description 156."],
  ["https://local2pdf.com/tools/png-to-pdf", "Tool", "510 words. Title 51. Description 155."],
  ["https://local2pdf.com/tools/webp-to-pdf", "Tool", "660 words. Title 52. Description 160."],
  ["https://local2pdf.com/tools/heic-to-pdf", "Tool", "723 words. Title 52. Description 150."],
  ["https://local2pdf.com/tools/combine-images-to-pdf", "Tool", "547 words. Duplicate How-do-I heading is gone."],
  ["https://local2pdf.com/tools/photos-to-pdf", "Tool", "522 words. Title 54. Description 153."],
  ["https://local2pdf.com/tools/screenshot-to-pdf", "Tool", "703 words. Title 58. Description 156."],
  ["https://local2pdf.com/tools/merge-pdf", "Tool", "671 words. Title 50. Description 158. Speakable on the main FAQ."],
  ["https://local2pdf.com/tools/split-pdf", "Tool", "608 words. Title 51. Description 155."],
  ["https://local2pdf.com/tools/rotate-pdf", "Tool", "553 words. Title 57. Description 154."],
  ["https://local2pdf.com/tools/reorder-pdf-pages", "Tool", "594 words. Decoded title 57. Description 158."],
  ["https://local2pdf.com/tools/delete-pdf-pages", "Tool", "535 words. Title 56. Description 156."],
  ["https://local2pdf.com/tools/extract-pdf-pages", "Tool", "720 words. Title 58. Description 153."],
  ["https://local2pdf.com/tools/pdf-to-jpg", "Tool", "537 words. Title 56. Description 152."],
  ["https://local2pdf.com/tools/pdf-to-png", "Tool", "529 words. Title 48 characters, two short of the 50–60 band."],
  ["https://local2pdf.com/tools/pdf-to-text", "Tool", "541 words. Title 51. Description 157."],
  ["https://local2pdf.com/tools/add-page-numbers-to-pdf", "Tool", "681 words. Title 54. Description 156."],
  ["https://local2pdf.com/tools/crop-pdf", "Tool", "515 words. Title 54. Description 155."],
  ["https://local2pdf.com/tools/resize-pdf-pages", "Tool", "531 words. Title 57. Description 154."],
  ["https://local2pdf.com/tools/n-up-pdf", "Tool", "518 words. Title 55. Description 152."],
  ["https://local2pdf.com/tools/compress-pdf", "Tool", "585 words. Title 51. Description 155."],
  ["https://local2pdf.com/tools/extract-images-from-pdf", "Beta tool", "252 words. noindex. Not in the sitemap. Title 45, description 123."],
  ["https://local2pdf.com/about", "About", "540 words. Firmify EOOD, UIC 208745197, Atanas Ignatov. Links to pdf-lib and PDF.js."],
  ["https://local2pdf.com/blog", "Blog index", "289 words. Blog, Person, BlogPosting, and ItemList schema."],
  ["https://local2pdf.com/blog/image-to-pdf-limit", "Article", "710 words. Question H2s. First answer is 53 words. Title 59."],
  ["https://local2pdf.com/blog/how-local2pdf-processes-files", "Article", "726 words. First answer is 48 words. Links PDF.js and pdf-lib."],
  ["https://local2pdf.com/blog/when-to-compress-a-pdf-locally", "Article", "665 words. Question H2s. Title is 42 characters."],
  ["https://local2pdf.com/contact", "Contact", "202 words. Visible support@, privacy@, and security@ addresses."],
  ["https://local2pdf.com/security", "Security", "546 words. Ads-off wording matches the homepage and ads.txt."],
  ["https://local2pdf.com/compatibility", "Compatibility", "473 words. Title 55. Two HTML comparison tables. No doubled brand."],
  ["https://local2pdf.com/changelog", "Changelog", "209 words. Newest heading is October 17, 2026. Title 51."],
  ["https://local2pdf.com/privacy", "Legal", "517 words. Ads-off section. Title is the conventional 26-character legal title."],
  ["https://local2pdf.com/terms", "Legal", "523 words. Title is the conventional 24-character legal title."],
  ["https://local2pdf.com/robots.txt", "Crawl policy", "Allows GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended, anthropic-ai, CCBot, and *."],
  ["https://local2pdf.com/sitemap.xml", "Sitemap", "200 on a direct fetch. 35 indexable URLs. lastmod 2026-10-17."],
  ["https://local2pdf.com/llms.txt", "AI summary", "Names Firmify EOOD, the 25-image cap, and the preferred pages."],
  ["https://local2pdf.com/llms-full.txt", "AI full text", "Libraries, browser floors, and the same operator facts."],
  ["https://local2pdf.com/ai.txt", "AI policy", "Allow all. Preferred citations: About, Security, Privacy, PDF tools."],
  ["https://local2pdf.com/ads.txt", "Ads policy", "No publisher record. Comment says display ads are off."],
];

const priorities = [
  ["Quick Win", "Lengthen two titles into 50–60 characters: PDF to PNG is 48 (“PDF to PNG Locally — Lossless Export | Local2PDF”) and the compress article is 42 (“When to compress a PDF locally | Local2PDF”).", "SEO", "Low", "Medium"],
  ["Quick Win", "Add a defining intro on the blog index. It is 289 words and mostly a list of three posts.", "SEO", "Low", "Low"],
  ["Medium", "Add one short paragraph of already-published browser facts on Compatibility. The page is 473 words, just under a 500-word content page.", "SEO", "Low", "Low"],
  ["Medium", "Add SpeakableSpecification to the three posts. Tools and the homepage already have it.", "AEO", "Low", "Low"],
];

function coverScore(label, score, status) {
  return cell([label, String(score), status], 3120, {
    fill: GREEN,
    color: "FFFFFF",
    align: AlignmentType.CENTER,
    borders: noBorders,
    top: 160,
    bottom: 160,
    size: 20,
    bold: true,
  });
}

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
        children: [
          new TableCell({
            width: { size: 3120, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: GREEN },
            margins: { top: 180, bottom: 180, left: 80, right: 80 },
            borders: noBorders,
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [run("SEO", { size: 20, bold: true, color: "FFFFFF" })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [run("9", { size: 72, bold: true, color: "FFFFFF" })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [run("Strong", { size: 18, italics: true, color: "FFFFFF" })] }),
            ],
          }),
          new TableCell({
            width: { size: 3120, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: GREEN },
            margins: { top: 180, bottom: 180, left: 80, right: 80 },
            borders: noBorders,
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [run("GEO", { size: 20, bold: true, color: "FFFFFF" })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [run("10", { size: 72, bold: true, color: "FFFFFF" })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [run("Strong", { size: 18, italics: true, color: "FFFFFF" })] }),
            ],
          }),
          new TableCell({
            width: { size: 3120, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: GREEN },
            margins: { top: 180, bottom: 180, left: 80, right: 80 },
            borders: noBorders,
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [run("AEO", { size: 20, bold: true, color: "FFFFFF" })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [run("10", { size: 72, bold: true, color: "FFFFFF" })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [run("Strong", { size: 18, italics: true, color: "FFFFFF" })] }),
            ],
          }),
        ],
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
    ["SEO", "9/10", "Strong", "Descriptions, headings, and blog schema are fixed. Two titles and a thin blog index keep this at 9."],
    ["GEO", "10/10", "Strong", "Ads wording, author pages, contact emails, and library citations now agree across the site."],
    ["AEO", "10/10", "Strong", "Compatibility has two snippet tables. Tools are speakable. Posts answer a question in 48–53 words."],
    ["Combined", "29/30", "Strong", "Up 2 from the v5 full audit earlier on 17 October 2026 (27/30)."],
  ];
  return table(
    [
      headerRow(["Dimension", "Score", "Status", "Key Takeaway"], widths),
      ...rows.map((r, i) => {
        const scoreNum = r[0] === "Combined" ? 10 : Number(r[1].split("/")[0]);
        const fill = scoreNum >= 8 ? GREEN : AMBER;
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
    ["SEO", "9/10", "9/10", "0", "Score held. The old blockers are gone; two short titles remain."],
    ["GEO", "9/10", "10/10", "+1", "Security, Privacy, and the homepage now use the same ads-off sentence."],
    ["AEO", "9/10", "10/10", "+1", "The missing comparison table and tool-level Speakable markup are live."],
    ["Combined", "27/30", "29/30", "+2", "Baseline is the v5 full audit from earlier on 17 October 2026."],
  ];
  return table(
    [
      headerRow(["Dimension", "v5", "Now", "Change", "Why it moved"], widths),
      ...rows.map((r, i) =>
        zebra(r, widths, i, {
          3: r[3].startsWith("+") ? GREEN : NAVY,
        }),
      ),
    ],
    widths,
  );
}

const body = [
  h1("Executive Summary"),
  new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    rows: [
      new TableRow({
        children: [
          cell(
            "Local2PDF is a privacy-first PDF toolkit, and this crawl of the live site is the first pass that moves a score. SEO stays 9/10. GEO moves from 9 to 10, and AEO moves from 9 to 10. Combined score: 29/30, up 2 from the v5 full audit earlier on 17 October 2026. The three items that held every score at 9 are fixed on the live HTML: Security and Privacy now say display advertising is off, matching the homepage FAQ and ads.txt; indexable meta descriptions are all 150–160 characters; Compatibility no longer titles itself Local2PDF | Local2PDF. SEO does not reach 10 because two indexable titles are still short of 50 characters and the blog index is 289 words.",
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
  para("The baseline is the v5 full audit of local2pdf.com on 17 October 2026, which scored 9 / 9 / 9. This crawl used the same 1–10 rubric on the live HTML. A dimension moves when the signals that held it below 10 are no longer present. A 10 means the category has no Missing or Needs Attention signal left. An 8 or 9 means the foundation is strong and a specific refinement is still available.", { size: 22, after: 140 }),
  diffTable(),
  para("Earlier the same day the live site scored 7/6/7, then 8/7/8, then 8/8/8, then 9/9/9. This pass is 9/10/10.", { size: 22, before: 140 }),

  h1("Pages Audited"),
  para("42 live URLs returned HTTP 200. Word counts are visible text after scripts and styles are removed. A markdown fetcher returned 500 once for sitemap.xml; a direct fetch of the same URL returned the sitemap.", { size: 22 }),
  table(
    [
      headerRow(["URL", "Page type", "Notes"], [4200, 1400, 3760]),
      ...pages.map((p, i) => zebra(p, [4200, 1400, 3760], i)),
    ],
    [4200, 1400, 3760],
  ),

  h1("SEO Analysis"),
  para("Score: 9/10 — Strong. Unchanged from v5. The description-length problem, the doubled Compatibility title, the repeated combine-images heading, and the blog index schema are fixed. Two titles and a short blog index are why this is not a 10.", { size: 24, bold: true, color: GREEN, after: 160 }),
  h2("Technical On-Page"),
  signalTable([
    ["Title tags", "Every HTML page has one title, and the doubled “Local2PDF | Local2PDF” Compatibility title is gone. It now reads “Check Browser Support for Private PDF Tools | Local2PDF” (55). Homepage is 51 (“Private PDF Tools — Free, No Upload, On Your Device”). Two indexable titles sit under 50: PDF to PNG at 48, and “When to compress a PDF locally | Local2PDF” at 42. Privacy (26) and Terms (24) are short legal titles on purpose.", "Needs Attention"],
    ["Meta descriptions", "Present on all 36 HTML pages. Every indexable description is 150–160 characters, including the eight tools that were 124–132 in v5 and the homepage and limit article that were over 160. The noindex beta tool is 123 and is outside the indexable set.", "Good"],
    ["Heading hierarchy", "Each HTML page has a single H1. The repeated “How do I combine images into one PDF?” heading is gone. The three posts now have question H2s. Homepage FAQ questions render as H3s under “Frequently asked questions”.", "Good"],
    ["URL structure", "Readable keyword paths such as /tools/merge-pdf and /blog/when-to-compress-a-pdf-locally. No tracking parameters.", "Good"],
    ["Canonical", "Self-referencing https://local2pdf.com URLs on every HTML page, including the homepage.", "Good"],
    ["Robots meta", "index, follow on the indexable set. /tools/extract-images-from-pdf is noindex and is not in the sitemap.", "Good"],
    ["Viewport", "A viewport meta tag is present on the HTML pages.", "Good"],
    ["Image alt text", "The homepage and image-to-PDF each expose two images, both with alt text. Other pages are text and have no content images.", "Good"],
    ["Internal links", "Tool pages link to related tools. /pdf-tools groups the catalog. The blog index links to three posts. About links the operator, the libraries, and the blog.", "Good"],
    ["Open Graph and Twitter", "og:title, og:description, og:image, and twitter:card are present on the HTML pages. Tool pages use /og/{slug}.png.", "Good"],
  ]),
  h2("Content Quality"),
  signalTable([
    ["Word count", "Core tools and the three posts clear 500 words (image-to-PDF 640, merge 671, limit article 710, processing article 726). About is 540 and Security is 546, both up from about 320. Compatibility is 473, the blog index 289, Contact 202, and Changelog 209.", "Needs Attention"],
    ["Keyword signals", "Titles, H1s, and opening lines name the tool and the private, no-upload constraint. Format pages keep distinct intents.", "Good"],
    ["Freshness", "The three posts carry 2026-10-17. The changelog’s newest heading is October 17, 2026. Sitemap lastmod matches that date.", "Good"],
    ["Readability", "Tool pages scan as steps, limitations, and FAQs. The posts now break into question H2s with a direct answer under the first one.", "Good"],
  ]),
  h2("Structured Data"),
  signalTable([
    ["Schema types", "Organization, WebSite, WebPage, WebApplication, Offer, FAQPage, HowTo, BreadcrumbList, Blog, BlogPosting, Person, ItemList, and SpeakableSpecification. JSON-LD on the fetched pages parsed.", "Good"],
    ["Organization completeness", "Local2PDF declares a logo, support@local2pdf.com, parentOrganization Firmify EOOD, addressCountry BG, and sameAs links to GitHub and Product Hunt. There is no street address or telephone, which fits a browser tool.", "Good"],
    ["Tool entities", "Indexable tools include WebApplication with an Offer, plus FAQPage, HowTo, BreadcrumbList, and SpeakableSpecification.", "Good"],
    ["Article entities", "Each post is a BlogPosting with a Person author. The blog index now also has Blog, Person, BlogPosting, and ItemList. In v5 the index had Organization and WebSite only.", "Good"],
  ]),

  h1("GEO Analysis"),
  para("Score: 10/10 — Strong. Up from 9/10 in v5. GEO is how AI answer engines decide what to cite. The advertising contradiction is gone, About and Security are long enough to cite, and the library claims point at the projects themselves.", { size: 24, bold: true, color: GREEN, after: 160 }),
  h2("E-E-A-T Assessment"),
  signalTable([
    ["Author", "Posts and About name Atanas Ignatov, Manager of Firmify EOOD, with a Person node. The processing article byline repeats that role and links About.", "Good"],
    ["About page", "540 words. States Firmify EOOD is a Bulgarian company, UIC 208745197, and that it also publishes Firmify and StoryKind, with links to firmify.bg and storykind.tech.", "Good"],
    ["Contact", "Visible sections for Support, Privacy, Security, and Bug Reports, with support@, privacy@, and security@local2pdf.com. No phone and no street address. That is the right contact set for this product.", "Good"],
    ["Trust signals", "sameAs points to the GitHub repo and the Product Hunt listing. The crawled pages do not invent a testimonial. Leaving a quote out is correct when no published quote was provided.", "Good"],
    ["Advertising claim", "Homepage FAQ, Security, Privacy, the processing article, the changelog, and ads.txt all say display advertising is currently off and that ads.txt lists no authorized sellers. The v5 line “This site may display advertisements” is gone.", "Good"],
  ]),
  h2("Content for AI Synthesis"),
  signalTable([
    ["Factual density", "Citable facts include the 25-image cap, device-dependent PDF limits, Chrome/Firefox/Edge 90+, Safari 15+, Firmify UIC 208745197, and the library list.", "Good"],
    ["Clear claim", "The homepage H1 and the first paragraph say files are processed in the browser with no uploads, no account, and no watermark.", "Good"],
    ["External citations", "About, Security, and the processing article link https://mozilla.github.io/pdf.js/ and https://pdf-lib.js.org/. About also links Firmify and StoryKind.", "Good"],
    ["Entity clarity", "Local2PDF, Firmify EOOD, and Atanas Ignatov are named the same way in About, the posts, llms.txt, and ai.txt.", "Good"],
    ["Originality", "The processing article tells readers to confirm local handling in the browser Network tab. Security repeats that check and says an ad-seller request should be absent.", "Good"],
    ["Limit consistency", "“25 images” is the cap on the badge, the FAQ, llms.txt, and the limit article. “25 pages” is used to say crop, PDF-to-PNG, compress, and combine are not capped at 25 pages.", "Good"],
  ]),
  h2("Technical GEO"),
  signalTable([
    ["AI discovery files", "llms.txt, llms-full.txt, and ai.txt all return 200. ai.txt names the operator, the author, and four preferred citation URLs.", "Good"],
    ["Crawler policy", "robots.txt allows OAI-SearchBot, ChatGPT-User, GPTBot, Google-Extended, PerplexityBot, anthropic-ai, CCBot, and *. The sitemap line is present.", "Good"],
    ["HTTPS", "Every fetched URL was served over HTTPS.", "Good"],
    ["sameAs", "Organization.sameAs includes https://github.com/azsumnasko/img2pdf and https://www.producthunt.com/products/local2pdf.", "Good"],
    ["Sitemap", "sitemap.xml returned 200 with 35 indexable routes and lastmod 2026-10-17. The beta extract-images URL is excluded.", "Good"],
  ]),

  h1("AEO Analysis"),
  para("Score: 10/10 — Strong. Up from 9/10 in v5. AEO is how a page gets lifted into a snippet or a spoken answer. The missing table, the homepage FAQ headings, the post question headings, and tool-level Speakable markup are all on the live pages.", { size: 24, bold: true, color: GREEN, after: 160 }),
  h2("Featured Snippet Eligibility"),
  signalTable([
    ["Direct answer", "The limit article answers “What is the Local2PDF image limit?” in 53 words. The processing article answers its first question in 48 words. The compress article answers in 50 words. The target band is 40–60.", "Good"],
    ["Definition pattern", "llms.txt opens with “Local2PDF is a privacy-first PDF toolkit.” About repeats that sentence and names the operator.", "Good"],
    ["List content", "The homepage “How do I use Local2PDF?” block is four numbered steps. Tool pages repeat select, adjust, download.", "Good"],
    ["Table content", "Compatibility has two HTML tables. One lists browser, minimum version, HEIC decode, and offline support for Chrome, Firefox, Safari, Edge, Mobile Safari, and Mobile Chrome. The second lists File API, Canvas, WebAssembly, and Web Workers as Supported on Chrome 90+, Firefox 90+, Safari 15+, and Edge 90+.", "Good"],
  ]),
  h2("Structured Answer Formats"),
  signalTable([
    ["FAQ schema", "FAQPage with Question and Answer is on the homepage and on the tool pages, including the noindex beta tool.", "Good"],
    ["HowTo schema", "HowTo and HowToStep are on the homepage and the tool pages.", "Good"],
    ["Question headings", "Tool H2s use “How do I…?”. Homepage FAQ questions are H3s. Each post has two or three question H2s, including “How does Local2PDF process a file?” and “When should I compress a PDF locally?”.", "Good"],
    ["Speakable schema", "SpeakableSpecification is on the homepage (#faq-image-limit-answer) and on every tool page (#faq-primary-answer). The three posts do not have Speakable markup. That is a refinement, and it does not remove the tool and homepage coverage that was missing in v5.", "Good"],
  ]),
  h2("Voice Search Readiness"),
  signalTable([
    ["Conversational language", "Answers use plain second-person lines: no account, no watermark, files stay on the device.", "Good"],
    ["Long-tail coverage", "Dedicated pages answer JPG vs PNG vs WebP vs HEIC, the 25-image cap, when to compress, and how local processing works.", "Good"],
    ["Local signals", "This is a software product, not a storefront. Schema has addressCountry BG and email. There is no phone or street, which fits the product.", "Good"],
  ]),

  h1("Priority Recommendations"),
  para("Nothing here is severe enough to pull a score down from the 9–10 band. These are the remaining refinements. The first one is what still separates SEO from a 10.", { size: 22 }),
  table(
    [
      headerRow(["Priority", "Issue", "Dimension", "Effort", "Impact"], [1400, 4560, 1200, 1100, 1100]),
      ...priorities.map((p, i) => {
        const fill = p[0] === "Quick Win" ? GREEN : p[0] === "Medium" ? AMBER : p[0] === "High" ? ORANGE : RED;
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
        ["Ads claim is consistent", "Security, Privacy, the homepage FAQ, the processing article, and ads.txt all say display advertising is off. v5 still had “This site may display advertisements” on Security."],
        ["Descriptions are in range", "All 35 indexable HTML descriptions measure 150–160 characters. v5 had eight tools at 124–132 and two pages over 160."],
        ["Compatibility is citable", "Title is 55 characters with a single brand. Two tables cover browser floors and the File API, Canvas, WebAssembly, and Web Workers."],
        ["Answers are extractable", "Each post opens a question H2 and answers it in 48–53 words. Tool FAQs carry SpeakableSpecification."],
        ["The entity is stable", "Firmify EOOD, UIC 208745197, and Atanas Ignatov appear on About, the posts, llms.txt, and ai.txt, with links to PDF.js and pdf-lib."],
        ["AI crawlers are invited", "robots.txt allows the major AI user agents. llms.txt, llms-full.txt, and ai.txt return 200 and name the pages to cite."],
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
  para("Core Web Vitals, rendered layout, and lab performance need a PageSpeed Insights run at pagespeed.web.dev. Backlinks, rankings, and Search Console coverage are outside an HTML crawl. JavaScript-only text is not a concern here: the fetched HTML already contains the headings, tables, FAQs, and JSON-LD.", { size: 22 }),

  h1("Glossary"),
  para("SEO is traditional search optimization: titles, descriptions, headings, links, and structured data that help a page get crawled and ranked.", { size: 22 }),
  para("GEO is generative engine optimization: writing and marking up pages so AI answer engines such as ChatGPT Search, Perplexity, Gemini, and Google AI Overviews can cite them.", { size: 22 }),
  para("AEO is answer engine optimization: shaping a page so a featured snippet, a People Also Ask box, or a voice assistant can lift one direct answer.", { size: 22 }),
];

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
          margin: { top: 720, bottom: 720, left: 720, right: 720 },
        },
      },
      children: [
        ...cover,
        new Paragraph({ children: [], pageBreakBefore: false }),
      ],
    },
  ],
});

// Rebuild with two sections properly: cover has no header, body has header.
const doc2 = new Document({
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
const buffer = await Packer.toBuffer(doc2);
fs.writeFileSync(docxPath, buffer);
console.log("wrote", docxPath, buffer.length);
void doc;
