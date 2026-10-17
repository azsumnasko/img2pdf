const fs = require("fs");
const path = require("path");
const xml = fs.readFileSync(path.join(process.env.TEMP, "imam-audit", "imamadvokat.bg_sitemap.xml.html"), "utf8");
const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
console.log("SITEMAP URLS", locs.length);
const groups = {};
for (const u of locs) {
  const p = new URL(u).pathname;
  let g = "other";
  if (p === "/" || p === "/en") g = "home";
  else if (p.includes("/blog/")) g = "blog-post";
  else if (p.endsWith("/blog")) g = "blog";
  else if (p.includes("/advokati/")) g = "directory";
  else if (p.includes("/uslugi/")) g = "service";
  else if (p.includes("/specialist/") && !p.includes("/join")) g = "profile";
  else if (p.includes("/faq")) g = "faq";
  else if (p.includes("/ai")) g = "ai";
  else if (p.includes("/about") || p.includes("/team") || p.includes("/contact")) g = "trust";
  else g = p.split("/").filter(Boolean).slice(0, 2).join("/") || "root";
  groups[g] = groups[g] || [];
  groups[g].push(p);
}
for (const [k, v] of Object.entries(groups)) {
  console.log("\n##", k, v.length);
  v.slice(0, 40).forEach((p) => console.log(p));
  if (v.length > 40) console.log("... +" + (v.length - 40));
}

const summary = JSON.parse(fs.readFileSync(path.join(process.env.TEMP, "imam-audit", "summary.json"), "utf8"));
for (const r of summary) {
  if (!r.title && r.url.includes("sitemap")) continue;
  if (r.status === 404 && r.url.includes("sitemap")) continue;
  if (r.status === 404 && (r.url.includes("llms"))) continue;
  console.log("\n====", r.url, r.status);
  console.log("T", r.titleLen, r.title);
  console.log("D", r.descLen, r.desc);
  console.log("H1", (r.h1 || []).join(" || "));
  console.log("CANON", r.canon, "ROBOTS", r.robots, "OGIMG", r.og && r.og.image, "WORDS", r.words);
  console.log("HREFLANG", (r.hreflang || []).join(" | "));
  console.log("JSONLD", JSON.stringify(r.jsonld));
  console.log("IMGS", r.imgCount, "emptyAlt", r.imgEmptyAlt, "missingAlt", r.imgMissingAlt);
  console.log("HEADS");
  (r.headings || []).forEach((h) => console.log("  H" + h.level, h.text));
}
