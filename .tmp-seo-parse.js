const fs = require("fs");
const html = fs.readFileSync(process.env.TEMP + "/imam-home.html", "utf8");
const title = (html.match(/<title[^>]*>(.*?)<\/title>/s) || [])[1];
const desc = (html.match(/name="description" content="([^"]*)"/) || [])[1];
console.log("TITLE LEN", title && [...title].length);
console.log("TITLE", title);
console.log("DESC LEN", desc && [...desc].length);
console.log("DESC", desc);
const h = [...html.matchAll(/<h([1-6])[^>]*>(.*?)<\/h\1>/gs)].map(
  (m) => m[1] + ": " + m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
);
console.log("HEADINGS");
h.forEach((x) => console.log(x));
const hrefs = [...new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]))];
const internal = hrefs.filter((h) => h.startsWith("/") || h.includes("imamadvokat.bg"));
console.log("INTERNAL", internal.length);
internal.forEach((h) => console.log(h));
console.log("---JSONLD---");
[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].forEach((m) =>
  console.log(m[1])
);
const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();
console.log("WORDS", text.split(" ").length);
console.log("TEXT SAMPLE", text.slice(0, 2500));
