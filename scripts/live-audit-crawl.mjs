import fs from "fs";

const BASE = "https://local2pdf.com";
const paths = [
  "/",
  "/pdf-tools",
  "/tools/image-to-pdf",
  "/tools/jpg-to-pdf",
  "/tools/png-to-pdf",
  "/tools/webp-to-pdf",
  "/tools/heic-to-pdf",
  "/tools/combine-images-to-pdf",
  "/tools/photos-to-pdf",
  "/tools/screenshot-to-pdf",
  "/tools/merge-pdf",
  "/tools/split-pdf",
  "/tools/rotate-pdf",
  "/tools/reorder-pdf-pages",
  "/tools/delete-pdf-pages",
  "/tools/extract-pdf-pages",
  "/tools/pdf-to-jpg",
  "/tools/pdf-to-png",
  "/tools/pdf-to-text",
  "/tools/add-page-numbers-to-pdf",
  "/tools/crop-pdf",
  "/tools/resize-pdf-pages",
  "/tools/n-up-pdf",
  "/tools/compress-pdf",
  "/tools/extract-images-from-pdf",
  "/about",
  "/blog",
  "/blog/image-to-pdf-limit",
  "/blog/how-local2pdf-processes-files",
  "/blog/when-to-compress-a-pdf-locally",
  "/contact",
  "/security",
  "/compatibility",
  "/changelog",
  "/privacy",
  "/terms",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/llms-full.txt",
  "/ai.txt",
  "/ads.txt",
];

function pick(html, re) {
  const m = html.match(re);
  return m ? m[1].replace(/\s+/g, " ").trim() : "";
}

function all(html, re) {
  const out = [];
  let m;
  const flags = re.flags.includes("g") ? re.flags : re.flags + "g";
  const r = new RegExp(re.source, flags);
  while ((m = r.exec(html))) out.push(m[1].replace(/\s+/g, " ").trim());
  return out;
}

function meta(html, name) {
  const a = new RegExp(
    `<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`,
    "i",
  );
  const b = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`,
    "i",
  );
  return pick(html, a) || pick(html, b);
}

function prop(html, name) {
  const a = new RegExp(
    `<meta[^>]+property=["']${name}["'][^>]+content=["']([^"']*)["']`,
    "i",
  );
  const b = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${name}["']`,
    "i",
  );
  return pick(html, a) || pick(html, b);
}

const results = [];
for (const p of paths) {
  const url = BASE + (p === "/" ? "/" : p);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 Local2PDF-Audit" },
    });
    const html = await res.text();
    const isDoc = p.endsWith(".txt") || p.endsWith(".xml");
    const title = pick(html, /<title>([^<]*)<\/title>/i);
    const desc = meta(html, "description");
    const canon =
      pick(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) ||
      pick(html, /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i);
    const robots = meta(html, "robots");
    const h1s = all(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi).map((s) =>
      s.replace(/<[^>]+>/g, ""),
    );
    const h2s = all(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi).map((s) =>
      s.replace(/<[^>]+>/g, ""),
    );
    const h3s = all(html, /<h3[^>]*>([\s\S]*?)<\/h3>/gi).map((s) =>
      s.replace(/<[^>]+>/g, ""),
    );
    const schemas = all(
      html,
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    );
    const types = [];
    const schemaNotes = [];
    for (const s of schemas) {
      try {
        const j = JSON.parse(s);
        const walk = (o) => {
          if (!o || typeof o !== "object") return;
          if (o["@type"]) {
            types.push(Array.isArray(o["@type"]) ? o["@type"].join("+") : String(o["@type"]));
          }
          if (Array.isArray(o)) o.forEach(walk);
          else Object.values(o).forEach(walk);
        };
        walk(j);
        if (j["@type"] === "Organization" || (j["@graph"] && JSON.stringify(j).includes("Organization"))) {
          schemaNotes.push(JSON.stringify(j).slice(0, 400));
        }
      } catch {
        types.push("INVALID_JSON");
      }
    }
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const words = text.split(" ").filter(Boolean).length;
    const imgs = [...html.matchAll(/<img\b[^>]*>/gi)];
    const alts = imgs.filter((m) => /\balt=/.test(m[0])).length;
    const emptyAlt = imgs.filter((m) => /\balt=["']["']/.test(m[0])).length;
    results.push({
      path: p,
      status: res.status,
      final: res.url,
      words: isDoc ? html.split(/\s+/).filter(Boolean).length : words,
      title,
      titleLen: title.length,
      desc,
      descLen: desc.length,
      canon,
      robots,
      h1s,
      h2s,
      h3s: h3s.slice(0, 20),
      types: [...new Set(types)],
      ogTitle: prop(html, "og:title"),
      ogDesc: prop(html, "og:description"),
      ogImage: prop(html, "og:image"),
      twitter: /twitter:card/i.test(html),
      viewport: /name=["']viewport["']/i.test(html),
      imgs: imgs.length,
      alts,
      emptyAlt,
      speakable: /Speakable/i.test(html),
      adsPhrase: /advertis/i.test(text) ? text.match(/.{0,80}advertis.{0,80}/i)?.[0] : "",
      pagesPhrase: /25 pages/i.test(html),
      imagesPhrase: /25 images/i.test(html),
      doubleBrand: title.includes("Local2PDF | Local2PDF") || title.includes("Local2PDF — Local2PDF"),
      snippet: isDoc ? html.slice(0, 2500) : "",
    });
    console.error(`${res.status} ${p} words=${words} title=${title.length} desc=${desc.length}`);
  } catch (e) {
    results.push({ path: p, error: String(e) });
    console.error("ERR", p, e.message);
  }
}

fs.writeFileSync("reports/live-audit-raw.json", JSON.stringify(results, null, 2));
console.log("wrote", results.length);
