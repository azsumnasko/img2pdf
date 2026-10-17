const fs = require("fs");
const path = require("path");
const xml = fs.readFileSync(path.join(process.env.TEMP, "imam-audit", "imamadvokat.bg_sitemap.xml.html"), "utf8");
const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
const urls = blocks.map((b) => ({
  loc: (b.match(/<loc>(.*?)<\/loc>/) || [])[1],
  lastmod: (b.match(/<lastmod>(.*?)<\/lastmod>/) || [])[1] || "",
}));
console.log("count", urls.length, "with lastmod", urls.filter((u) => u.lastmod).length);
const byDepth = {};
for (const u of urls) {
  const p = new URL(u.loc).pathname;
  const segs = p.split("/").filter(Boolean);
  const key = (segs[0] || "home") + " depth" + segs.length;
  byDepth[key] = (byDepth[key] || 0) + 1;
}
console.log(byDepth);
const profiles = urls.filter((u) => {
  const segs = new URL(u.loc).pathname.split("/").filter(Boolean);
  return segs[0] === "advokati" && segs.length >= 3;
});
console.log("BG profiles or combos", profiles.length);
profiles.slice(0, 25).forEach((u) => console.log(u.loc, u.lastmod));
const combos = urls.filter((u) => /\/advokati\/[^/]+\/[^/]+$/.test(new URL(u.loc).pathname) && !/-[A-Za-z0-9]{6,}$/.test(u.loc));
console.log("possible city-area", combos.length);
combos.slice(0, 15).forEach((u) => console.log(u.loc));

const targets = [
  "https://imamadvokat.bg/ai",
  "https://imamadvokat.bg/advokati",
  "https://imamadvokat.bg/uslugi",
  "https://imamadvokat.bg/blog/registraciya-na-eood-prez-2026-g-stupka-po-stupka",
  "https://imamadvokat.bg/blog/urezhdane-na-roditelskite-prava-sled-razvod-kakvo-tryabva-da-znaem",
  "https://imamadvokat.bg/blog/evroto-veche-promeni-kapitala-na-hilyadi-firmi-kakvo-tryabva-da-napravite-do-31-dekemvri-2026-g",
  "https://imamadvokat.bg/blog/pravni-otnosheniya-s-advokat-kakvo-da-ochakvate-i-kak-da-se-podgotvite",
  "https://imamadvokat.bg/advokati/sofia/joana-kamenova-L53l8W16",
  "https://imamadvokat.bg/advokati/plovdiv/adv-ivelina-gyurova-SZJV9j6Q",
  "https://imamadvokat.bg/advokati/vidin",
  "https://imamadvokat.bg/en/about",
  "https://imamadvokat.bg/en/faq",
  "https://imamadvokat.bg/en/blog",
];

function analyze(url, status, html) {
  const title = ((html.match(/<title[^>]*>(.*?)<\/title>/s) || [])[1] || "").replace(/\s+/g, " ").trim();
  const desc = (html.match(/name="description" content="([^"]*)"/) || [])[1] || "";
  const canon = (html.match(/rel="canonical" href="([^"]+)"/) || [])[1] || "";
  const robots = (html.match(/name="robots" content="([^"]*)"/i) || [])[1] || "";
  const headings = [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: m[1],
    text: m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160),
  }));
  const jsonldTypes = [];
  const jsonldSnips = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    jsonldSnips.push(m[1].slice(0, 700));
    try {
      const j = JSON.parse(m[1]);
      const walk = (o) => {
        if (!o || typeof o !== "object") return;
        if (o["@type"]) jsonldTypes.push(Array.isArray(o["@type"]) ? o["@type"].join("+") : o["@type"]);
        if (Array.isArray(o)) o.forEach(walk);
        else if (!o["@context"] || o["@type"]) Object.values(o).forEach((v) => { if (v && typeof v === "object") walk(v); });
      };
      walk(j);
    } catch (e) {
      jsonldTypes.push("INVALID");
    }
  }
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const dates = [...html.matchAll(/datetime="([^"]+)"|(20\d{2}-\d{2}-\d{2})/g)].map((m) => m[1] || m[2]).slice(0, 8);
  const phone = text.match(/\+359[\d\s-]{6,}/);
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return {
    url, status, title, titleLen: [...title].length, desc, descLen: [...desc].length, canon, robots,
    h1: headings.filter((h) => h.level === "1").map((h) => h.text),
    headings: headings.filter((h) => h.level !== "4" || !["Имам адвокат","Адвокати по градове","Правни области","Онлайн услуги","Помощ","I Have a Lawyer"].includes(h.text)).slice(0, 25),
    jsonldTypes: [...new Set(jsonldTypes)],
    jsonldSnips,
    words: text.split(" ").length,
    textSample: text.slice(0, 900),
    dates,
    phone: phone && phone[0],
    email: email && email[0],
    author: (text.match(/Автор[:\s][^.]{0,80}/) || [])[0] || "",
  };
}

(async () => {
  const out = [];
  for (const url of targets) {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (compatible; SEOAudit/1.0)" } });
    const html = await res.text();
    const a = analyze(url, res.status, html);
    out.push(a);
    console.log("\n====", a.status, a.words, "w", a.titleLen, "t", a.descLen, "d", url);
    console.log("TITLE", a.title);
    console.log("DESC", a.desc);
    console.log("H1", a.h1.join(" | "));
    console.log("CANON", a.canon, "ROBOTS", a.robots);
    console.log("SCHEMA", a.jsonldTypes.join(", "));
    console.log("DATES", a.dates.join(", "), "PHONE", a.phone, "EMAIL", a.email, "AUTHOR", a.author);
    a.headings.forEach((h) => console.log(" H" + h.level, h.text));
    console.log("SAMPLE", a.textSample.slice(0, 500));
    if (a.jsonldSnips[0]) console.log("LD0", a.jsonldSnips[0].slice(0, 450));
  }
  fs.writeFileSync(path.join(process.env.TEMP, "imam-audit", "more.json"), JSON.stringify(out, null, 2));
})();
