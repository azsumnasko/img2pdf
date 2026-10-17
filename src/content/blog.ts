export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  paragraphs: string[];
};

/** Publisher byline. No personal name is invented; Firmify EOOD is the named operator. */
export const BLOG_AUTHOR = {
  name: "Firmify EOOD",
  url: "https://firmify.bg",
  role: "Operator of Local2PDF",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "image-to-pdf-limit",
    title: "The 25-image limit applies only to image-to-PDF",
    description:
      "Local2PDF caps image-to-PDF at 25 images per conversion. Merge, split, compress, and other PDF tools are not limited to 25 pages.",
    date: "2026-10-17",
    paragraphs: [
      "Local2PDF is free, and the only fixed job size is on image conversion: up to 25 images in one PDF. That includes JPG, PNG, WebP, and HEIC, whether you start from Image to PDF or from a format page such as JPG to PDF. It is a per-conversion cap, not a daily quota. You can convert again immediately.",
      "PDF tools do not inherit that number. Merge, split, rotate, reorder, delete, extract, crop, resize, n-up, page numbers, PDF to JPG, PDF to PNG, and PDF to Text are limited by the memory of the browser on your device. A 40-page PDF is a normal merge. A 200-page file may be slow or may fail on a phone, but it is not blocked because of a 25-page rule.",
      "Compress PDF is in beta and follows the same device limit. Safe compression and image-heavy recompression are quality choices, not page-count choices. If a page on the site says “25 pages” without saying images, treat it as a mistake: the published limit is 25 images per image-to-PDF conversion.",
      "If you have more than 25 pictures, convert them in batches and join the PDFs with Merge PDF. The pictures stay on your device the whole time. Local2PDF is operated by Firmify EOOD in Bulgaria.",
    ],
  },
  {
    slug: "how-local2pdf-processes-files",
    title: "How Local2PDF processes files on your device",
    description:
      "Local2PDF, operated by Firmify EOOD, reads and writes PDFs in the browser. Document contents are not uploaded.",
    date: "2026-10-17",
    paragraphs: [
      "Local2PDF is a browser toolkit operated by Firmify EOOD. The tools that convert, merge, split, and edit PDFs run in the page you already have open. The file is read from your device, processed in memory, and downloaded back to your device. The document is not sent to a Local2PDF server to be converted.",
      "You can check that yourself. Open developer tools, choose the Network panel, and run a tool. You should not see a request that carries the PDF or image body. The site can still load its own HTML, scripts, and — if ads are enabled — advertising resources. Those requests are not your document.",
      "Local processing has limits that a server product hides. A very large PDF can run out of memory. A password-protected file has to be unlocked before the browser can read it. PDF to Text only returns text that is already embedded; it does not OCR a scan. Changing a signed PDF can invalidate the signature. Those limits are product facts, not reasons to upload the file somewhere else.",
      "Firmify EOOD also publishes Firmify and StoryKind. Local2PDF is the document product: free, no account, and no watermark on the file you download.",
    ],
  },
  {
    slug: "when-to-compress-a-pdf-locally",
    title: "When to compress a PDF locally",
    description:
      "Use local PDF compression for email-sized files. Safe mode keeps structure; image-heavy mode changes the pages.",
    date: "2026-10-17",
    paragraphs: [
      "Compress a PDF locally when the file is too large to email and you do not want to upload it to a converter. Local2PDF’s compressor runs in the browser. It is in beta, and the amount you save depends on the file.",
      "Start with safe optimization. It trims overhead and is the right choice for a text document or a file that is already reasonably compressed. If the size barely moves, the PDF was probably optimized already. Keeping the original is better than recompressing it for a one-percent change.",
      "Use image-heavy mode only for scans and photo-heavy exports, and only if a softer page is acceptable. That mode re-renders pages. Text selection, form fields, and vector art can be lost. Do not use it on a signed agreement or a form someone still has to complete.",
      "Compression is not capped at 25 pages. That number is only for image-to-PDF. If the compressed file is still too big, split it or export fewer pages. Compare the before and after size in the tool, then download. The source file stays on your device until you delete it.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
