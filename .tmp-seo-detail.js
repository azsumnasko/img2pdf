const pages = [
  "https://imamadvokat.bg/contact",
  "https://imamadvokat.bg/team",
  "https://imamadvokat.bg/advokati/sofia/semejno-pravo",
  "https://imamadvokat.bg/blog/urezhdane-na-roditelskite-prava-sled-razvod-kakvo-tryabva-da-znaem",
  "https://imamadvokat.bg/404",
];

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

(async () => {
  for (const url of pages) {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (compatible; SEOAudit/1.0)" } });
    const html = await res.text();
    const text = textOf(html);
    console.log("\n########", res.status, url, "words", text.split(" ").length);
    const main = text.replace(/^.*?(Свържи се с нас|Екипът зад|Намери|Уреждане|Страницата)/, "$1");
    console.log(main.slice(0, 1600));
    const types = [];
    for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
      const t = [...m[1].matchAll(/"@type":"([^"]+)"/g)].map((x) => x[1]);
      types.push(t.join("+"));
      if (/aggregateRating|Review|FAQPage|HowTo|legalName|contactPoint/.test(m[1])) {
        console.log("HIT", m[1].slice(0, 400));
      }
    }
    console.log("TYPES", types.join(" | "));
    const robots = (html.match(/name="robots" content="([^"]*)"/i) || [])[1] || "(none)";
    const canon = (html.match(/rel="canonical" href="([^"]+)"/) || [])[1] || "";
    console.log("ROBOTS", robots, "CANON", canon);
  }
})();
