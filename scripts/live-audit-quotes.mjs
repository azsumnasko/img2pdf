const urls = [
  "https://local2pdf.com/security",
  "https://local2pdf.com/about",
  "https://local2pdf.com/blog/image-to-pdf-limit",
  "https://local2pdf.com/tools/combine-images-to-pdf",
  "https://local2pdf.com/tools/pdf-to-png",
  "https://local2pdf.com/tools/crop-pdf",
  "https://local2pdf.com/contact",
  "https://local2pdf.com/",
];

function strip(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

for (const url of urls) {
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 Local2PDF-Audit" } });
  const html = await res.text();
  console.log("\n========", url);
  const schemas = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const m of schemas) {
    try {
      const j = JSON.parse(m[1]);
      const blob = JSON.stringify(j);
      if (blob.includes("Organization") || blob.includes("Person") || blob.includes("Speakable") || blob.includes("sameAs")) {
        const org = blob.match(/"@type":"Organization".{0,500}/);
        const person = blob.match(/"@type":"Person".{0,400}/);
        const speak = blob.match(/SpeakableSpecification.{0,300}/);
        const same = blob.includes("sameAs") ? blob.match(/sameAs.{0,200}/)?.[0] : "no sameAs";
        if (org) console.log("ORG", org[0].slice(0, 450));
        if (person) console.log("PERSON", person[0].slice(0, 350));
        if (speak) console.log("SPEAK", speak[0].slice(0, 250));
        console.log("SAME", same);
      }
    } catch (e) {
      console.log("bad json", e.message);
    }
  }
  const text = strip(html);
  for (const phrase of ["may display", "advertising", "25 pages", "25 images", "Atanas", "Firmify", "support@", "datePublished", "Bulgaria"]) {
    const i = text.toLowerCase().indexOf(phrase.toLowerCase());
    if (i >= 0) console.log("CTX", phrase, "=>", text.slice(Math.max(0, i - 90), i + 160));
  }
}
