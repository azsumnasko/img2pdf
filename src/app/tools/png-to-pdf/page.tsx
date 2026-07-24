import Link from "next/link";
import { PrivacyBadge } from "@/components/tool/PrivacyBadge";

export default function PngToPdfPage() {
  return (
    <main className="content-page">
      <h1>Convert PNG to PDF — Free, Private, No Upload</h1>
      <p>Convert your PNG screenshots, graphics, and images to PDF directly in your browser. PNG transparency is composited onto a white background. No files are ever uploaded.</p>
      <PrivacyBadge />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf" className="btn btn--primary btn--large">Start converting PNG to PDF</Link>
      </div>
      <h2>PNG Transparency Handling</h2>
      <p>PNG images often contain transparent backgrounds. Local2PDF automatically renders transparent areas as white in the output PDF for reliable viewing across all PDF readers. The Balanced quality preset ensures good text readability for screenshots while keeping file sizes manageable.</p>
      <h2>When to Use PNG vs JPEG for PDF</h2>
      <p>PNG is ideal for screenshots, diagrams, logos, and images with text — anything with sharp edges or transparency. JPEG is better for photos. Local2PDF handles both formats and optimizes the output accordingly.</p>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Select PNG screenshots or graphics and drop them into the converter</li>
          <li>Transparent areas are automatically rendered as white for PDF compatibility</li>
          <li>Images are positioned on your chosen page size with adjustable margins and saved as PDF</li>
        </ol>
      </section>
      <section>
        <h2>Why Convert PNG to PDF</h2>
        <ul>
          <li><strong>Professional screenshots:</strong> Convert sharp PNG screenshots into a clean, organized PDF document for documentation or presentations.</li>
          <li><strong>Graphics and logos:</strong> Preserve the crisp quality of diagrams, icons, and logos in a universally viewable PDF format.</li>
        </ul>
      </section>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/tools/image-to-pdf">Open the free converter</Link> |{" "}
        <Link href="/tools/jpg-to-pdf">JPG to PDF</Link> |{" "}
        <Link href="/tools/webp-to-pdf">WebP to PDF</Link>
      </p>
    </main>
  );
}
