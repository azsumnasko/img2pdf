import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "app");

const imagesBlock = `    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Local2PDF — Private PDF tools in your browser",
      },
    ],`;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (/\.(tsx|ts)$/.test(entry.name)) files.push(full);
  }
  return files;
}

let updated = 0;
for (const file of walk(root)) {
  let src = fs.readFileSync(file, "utf8");
  if (!src.includes("openGraph:")) continue;
  if (src.includes('url: "/og-image.png"') || src.includes("url: '/og-image.png'")) {
    console.log(`skip (already has images): ${path.relative(root, file)}`);
    continue;
  }

  // Insert images before the closing of openGraph object.
  // Match openGraph blocks that end with type/url/description/siteName lines then `},`
  const next = src.replace(
    /(openGraph:\s*\{[\s\S]*?)(\n  \},)/,
    (match, body, closer) => {
      if (body.includes('url: "/og-image.png"')) return match;
      // Ensure we don't double-insert if somehow nested
      return `${body}\n${imagesBlock}${closer}`;
    }
  );

  if (next === src) {
    console.warn(`FAILED to update: ${path.relative(root, file)}`);
    continue;
  }

  fs.writeFileSync(file, next);
  updated++;
  console.log(`updated: ${path.relative(root, file)}`);
}

console.log(`\nUpdated ${updated} files`);
