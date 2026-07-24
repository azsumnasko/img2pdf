import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outPath = path.join(root, "public", "og-image.png");
const tmpHtml = path.join(root, "public", "_og-temp.html");

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: linear-gradient(135deg, #eff6ff 0%, #ffffff 45%, #f8fafc 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.55;
  }
  .blob-1 {
    width: 480px; height: 480px;
    background: #93c5fd;
    top: -120px; right: -80px;
  }
  .blob-2 {
    width: 360px; height: 360px;
    background: #bfdbfe;
    bottom: -100px; left: -60px;
  }
  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
    padding: 0 96px;
    width: 100%;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .icon {
    width: 88px;
    height: 88px;
    border-radius: 22px;
    background: #2563eb;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.35);
  }
  .icon-inner {
    width: 58px;
    height: 44px;
    background: rgba(255,255,255,0.92);
    border-radius: 10px;
    position: relative;
  }
  .icon-inner::before,
  .icon-inner::after {
    content: "";
    position: absolute;
    left: 10px;
    height: 3px;
    background: #2563eb;
    border-radius: 2px;
  }
  .icon-inner::before { top: 14px; width: 38px; }
  .icon-inner::after { top: 24px; width: 28px; }
  .name {
    font-size: 56px;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.03em;
  }
  .tagline {
    font-size: 36px;
    font-weight: 600;
    color: #1e293b;
    letter-spacing: -0.02em;
    max-width: 900px;
    line-height: 1.25;
  }
  .sub {
    font-size: 24px;
    color: #475569;
    font-weight: 500;
  }
  .pills {
    display: flex;
    gap: 14px;
    margin-top: 4px;
  }
  .pill {
    font-size: 18px;
    font-weight: 600;
    color: #1d4ed8;
    background: #dbeafe;
    padding: 10px 18px;
    border-radius: 999px;
  }
</style>
</head>
<body>
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="content">
    <div class="brand">
      <div class="icon"><div class="icon-inner"></div></div>
      <div class="name">Local2PDF</div>
    </div>
    <div class="tagline">Private PDF tools that work in your browser</div>
    <div class="sub">No uploads. No signup. No watermark.</div>
    <div class="pills">
      <div class="pill">Merge &amp; Split</div>
      <div class="pill">Image to PDF</div>
      <div class="pill">100% Local</div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(tmpHtml, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`file://${tmpHtml.replace(/\\/g, "/")}`);
await page.screenshot({ path: outPath, type: "png" });
await browser.close();
fs.unlinkSync(tmpHtml);

const stats = fs.statSync(outPath);
console.log(`Created ${outPath} (${stats.size} bytes)`);
