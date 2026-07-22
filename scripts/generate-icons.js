const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

const sizes = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "icon-512-maskable.png", size: 512, maskable: true },
];

const outDir = path.join(__dirname, "..", "public", "icons");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const { name, size, maskable } of sizes) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  const safeZone = maskable ? 0.8 : 1;
  const margin = maskable ? size * (1 - safeZone) / 2 : 0;
  const inner = maskable ? size * safeZone : size;

  ctx.fillStyle = "#2563eb";
  ctx.beginPath();
  ctx.roundRect(margin, margin, inner, inner, inner * 0.2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${inner * 0.4}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("P", size / 2, size / 2 + inner * 0.02);

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(path.join(outDir, name), buffer);
  console.log(`Generated ${name} (${size}x${size})`);
}
