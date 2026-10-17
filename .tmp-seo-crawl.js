const fs = require("fs");
const path = require("path");

const OUT = path.join(process.env.TEMP, "imam-audit");
fs.mkdirSync(OUT, { recursive: true });

const SEEDS = [
  "https://imamadvokat.bg/sitemap.xml",
  "https://imamadvokat.bg/sitemap-0.xml",
  "https://imamadvokat.bg/sitemap_index.xml",
  "https://imamadvokat.bg/server-sitemap.xml",
  "https://imamadvokat.bg/llms.txt",
  "https://imamadvokat.bg/llms-full.txt",
  "https://imamadvokat.bg/about",
  "https://imamadvokat.bg/team",
  "https://imamadvokat.bg/blog",
  "https://imamadvokat.bg/contact",
  "https://imamadvokat.bg/faq",
  "https://imamadvokat.bg/faq/specialists",
  "https://imamadvokat.bg/specialist/join",
  "https://imamadvokat.bg/en",
  "https://imamadvokat.bg/uslugi/registratsiya-na-firma",
  "https://imamadvokat.bg/uslugi/prevalutirane-na-kapitala",
  "https://imamadvokat.bg/uslugi/promyana-v-obstoyatelstvata",
  "https://imamadvokat.bg/advokati/semejno-pravo",
  "https://imamadvokat.bg/advokati/sofia",
  "https://imamadvokat.bg/advokati/nakazatelno-pravo",
  "https://imamadvokat.bg/advokati/plovdiv",
  "https://imamadvokat.bg/s/obshti-usloviya",
];

function strip(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function analyze(url, status, html, headers) {
  const title = ((html.match(/<title[^>]*>(.*?)<\/title>/s) || [])[1] || "").replace(/\s+/g, " ").trim();
  const desc = (html.match(/name="description" content="([^"]*)"/) || [])[1] || "";
  const canon = (html.match(/rel="canonical" href="([^"]+)"/) || [])[1] || "";
  const robots = (html.match(/name="robots" content="([^"]*)"/i) || [])[1] || "";
  const headings = [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: m[1],
    text: m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 180),
  }));
  const jsonld = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => {
    try {
      const j = JSON.parse(m[1]);
      const types = [];
      const walk = (o) => {
        if (!o || typeof o !== "object") return;
        if (o["@type"]) types.push(Array.isArray(o["@type"]) ? o["@type"].join(",") : o["@type"]);
        if (Array.isArray(o)) o.forEach(walk);
        else Object.values(o).forEach(walk);
      };
      walk(j);
      return { types: [...new Set(types)], rawLen: m[1].length, snippet: m[1].slice(0, 500) };
    } catch (e) {
      return { types: ["INVALID"], error: e.message, snippet: m[1].slice(0, 300) };
    }
  });
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => {
    const tag = m[0];
    const alt = (tag.match(/alt="([^"]*)"/) || [])[1];
    const src = (tag.match(/\ssrc="([^"]+)"/) || [])[1] || "";
    return { alt: alt === undefined ? null : alt, src: src.slice(0, 120) };
  });
  const links = [...new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]))];
  const text = strip(html);
  const og = {
    title: (html.match(/property="og:title" content="([^"]*)"/) || [])[1] || "",
    image: (html.match(/property="og:image" content="([^"]*)"/) || [])[1] || "",
    type: (html.match(/property="og:type" content="([^"]*)"/) || [])[1] || "",
  };
  const hreflang = [...html.matchAll(/rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map((m) => m[1] + " " + m[2]);
  return {
    url,
    status,
    bytes: html.length,
    title,
    titleLen: [...title].length,
    desc,
    descLen: [...desc].length,
    canon,
    robots,
    og,
    hreflang,
    h1: headings.filter((h) => h.level === "1").map((h) => h.text),
    headings: headings.slice(0, 40),
    jsonld,
    imgCount: imgs.length,
    imgMissingAlt: imgs.filter((i) => i.alt === null).length,
    imgEmptyAlt: imgs.filter((i) => i.alt === "").length,
    words: text ? text.split(" ").length : 0,
    textSample: text.slice(0, 1200),
    links: links.filter((l) => l.startsWith("/") || l.includes("imamadvokat.bg")).slice(0, 80),
    cache: headers.get("x-nextjs-cache") || "",
    xRobots: headers.get("x-robots-tag") || "",
  };
}

async function fetchOne(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "Mozilla/5.0 (compatible; SEOAudit/1.0)", accept: "text/html,application/xml,text/plain,*/*" },
  });
  const html = await res.text();
  const safe = url.replace(/https?:\/\//, "").replace(/[^\w.-]+/g, "_").slice(0, 120);
  fs.writeFileSync(path.join(OUT, safe + ".html"), html);
  return analyze(url, res.status, html, res.headers);
}

(async () => {
  const results = [];
  for (const url of SEEDS) {
    try {
      const r = await fetchOne(url);
      results.push(r);
      console.log(r.status, r.titleLen, r.words, r.h1.join(" | ").slice(0, 80), url);
    } catch (e) {
      console.log("ERR", url, e.message);
      results.push({ url, error: e.message });
    }
  }
  fs.writeFileSync(path.join(OUT, "summary.json"), JSON.stringify(results, null, 2));
  console.log("WROTE", results.length);
})();
