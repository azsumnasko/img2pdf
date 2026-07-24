import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";

const W = 1200;
const H = 630;
const OUT_DIR = path.join("public", "og");

const TOOLS = [
  { slug: "image-to-pdf", title: "Image to PDF", subtitle: "JPG · PNG · WebP · HEIC — private & free" },
  { slug: "jpg-to-pdf", title: "JPG to PDF", subtitle: "Convert JPEG images privately in your browser" },
  { slug: "png-to-pdf", title: "PNG to PDF", subtitle: "Screenshots & graphics — no upload" },
  { slug: "webp-to-pdf", title: "WebP to PDF", subtitle: "Modern images to PDF, locally" },
  { slug: "heic-to-pdf", title: "HEIC to PDF", subtitle: "iPhone photos to PDF — no upload" },
  { slug: "combine-images-to-pdf", title: "Combine Images to PDF", subtitle: "Merge many images into one PDF" },
  { slug: "photos-to-pdf", title: "Photos to PDF", subtitle: "iPhone & Android — no app needed" },
  { slug: "screenshot-to-pdf", title: "Screenshot to PDF", subtitle: "Paste, arrange, download locally" },
  { slug: "merge-pdf", title: "Merge PDF", subtitle: "Combine PDFs locally — no upload" },
  { slug: "split-pdf", title: "Split PDF", subtitle: "Separate pages privately in your browser" },
  { slug: "rotate-pdf", title: "Rotate PDF", subtitle: "Rotate pages left, right, or 180°" },
  { slug: "reorder-pdf-pages", title: "Reorder PDF Pages", subtitle: "Drag, sort & save — no upload" },
  { slug: "delete-pdf-pages", title: "Delete PDF Pages", subtitle: "Remove pages privately & free" },
  { slug: "extract-pdf-pages", title: "Extract PDF Pages", subtitle: "Keep only the pages you need" },
  { slug: "pdf-to-jpg", title: "PDF to JPG", subtitle: "High-quality page export — no upload" },
  { slug: "pdf-to-png", title: "PDF to PNG", subtitle: "Lossless page export locally" },
  { slug: "pdf-to-text", title: "PDF to Text", subtitle: "Extract selectable text locally" },
  { slug: "extract-images-from-pdf", title: "Extract Images from PDF", subtitle: "Save images locally — beta" },
  { slug: "add-page-numbers-to-pdf", title: "Add Page Numbers", subtitle: "Number PDF pages privately" },
  { slug: "crop-pdf", title: "Crop PDF", subtitle: "Trim margins in your browser" },
  { slug: "resize-pdf-pages", title: "Resize PDF Pages", subtitle: "A4, Letter & custom sizes" },
  { slug: "n-up-pdf", title: "N-Up PDF", subtitle: "Multiple pages per sheet" },
  { slug: "compress-pdf", title: "Compress PDF", subtitle: "Reduce file size locally" },
];

function drawOg(title, subtitle) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, W, H);

  // Accent bar
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(0, 0, 16, H);

  // Soft right panel
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(W - 280, 0, 280, H);

  // Decorative PDF page cards
  ctx.fillStyle = "#334155";
  roundRect(ctx, W - 220, 140, 140, 180, 10);
  ctx.fill();
  ctx.fillStyle = "#475569";
  roundRect(ctx, W - 200, 160, 140, 180, 10);
  ctx.fill();
  ctx.fillStyle = "#f8fafc";
  roundRect(ctx, W - 180, 180, 140, 180, 10);
  ctx.fill();
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(W - 180, 180, 140, 18);

  // Brand
  ctx.fillStyle = "#60a5fa";
  ctx.font = "600 28px sans-serif";
  ctx.fillText("Local2PDF", 64, 96);

  // Title
  ctx.fillStyle = "#f8fafc";
  ctx.font = "700 64px sans-serif";
  const titleLines = wrapText(ctx, title, 760);
  let y = 220;
  for (const line of titleLines.slice(0, 2)) {
    ctx.fillText(line, 64, y);
    y += 76;
  }

  // Subtitle
  ctx.fillStyle = "#94a3b8";
  ctx.font = "400 28px sans-serif";
  const subLines = wrapText(ctx, subtitle, 760);
  y += 12;
  for (const line of subLines.slice(0, 2)) {
    ctx.fillText(line, 64, y);
    y += 40;
  }

  // Footer chips
  ctx.fillStyle = "#1e293b";
  roundRect(ctx, 64, H - 90, 180, 40, 8);
  ctx.fill();
  ctx.fillStyle = "#cbd5e1";
  ctx.font = "500 18px sans-serif";
  ctx.fillText("No upload", 84, H - 64);

  ctx.fillStyle = "#1e293b";
  roundRect(ctx, 260, H - 90, 140, 40, 8);
  ctx.fill();
  ctx.fillStyle = "#cbd5e1";
  ctx.fillText("Free", 290, H - 64);

  ctx.fillStyle = "#1e293b";
  roundRect(ctx, 420, H - 90, 200, 40, 8);
  ctx.fill();
  ctx.fillStyle = "#cbd5e1";
  ctx.fillText("No watermark", 440, H - 64);

  return canvas.toBuffer("image/png");
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const tool of TOOLS) {
  const buf = drawOg(tool.title, tool.subtitle);
  const out = path.join(OUT_DIR, `${tool.slug}.png`);
  fs.writeFileSync(out, buf);
  console.log("wrote", out);
}

// Default/home OG
const home = drawOg("Private PDF Tools", "Merge, split, convert & compress — no upload");
fs.writeFileSync(path.join("public", "og-image.png"), home);
console.log("wrote public/og-image.png");
console.log("done", TOOLS.length + 1);
