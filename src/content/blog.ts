export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  paragraphs: string[];
};

/**
 * Named author. Atanas Ignatov is the manager of Firmify EOOD in the
 * Bulgarian Trade Register (UIC 208745197). Firmify EOOD remains the operator.
 */
export const BLOG_AUTHOR = {
  name: "Atanas Ignatov",
  url: "https://local2pdf.com/about",
  role: "manager of Firmify EOOD, the operator of Local2PDF",
  jobTitle: "Manager of Firmify EOOD",
  worksForName: "Firmify EOOD",
  worksForUrl: "https://firmify.bg",
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
      "If you have more than 25 pictures, convert them in batches and join the PDFs with Merge PDF. The pictures stay on your device the whole time. Local2PDF is operated by Firmify EOOD in Bulgaria. The guides on this blog are written by Atanas Ignatov, manager of that company.",
      "The cap is enforced when you add files, not after the PDF is built. Image to PDF, JPG to PDF, PNG to PDF, WebP to PDF, HEIC to PDF, Photos to PDF, Screenshot to PDF, and Combine Images to PDF all use the same converter, so each of those jobs stops at 25 images. Mixing JPEG, PNG, WebP, and HEIC in one job still counts each file toward that 25. A second job can start immediately. There is no account, no daily quota, and no watermark on the download.",
      "A PDF you already have is a different kind of file. Merge PDF, Split PDF, Rotate PDF, Reorder PDF Pages, Delete PDF Pages, Extract PDF Pages, Crop PDF, Resize PDF Pages, N-Up PDF, Add Page Numbers, PDF to JPG, PDF to PNG, and PDF to Text do not read the image-to-PDF setting. Opening a 30-page scan in Compress PDF is allowed. Exporting 30 pages to JPEG is allowed. The browser may run out of memory on a very large file, which is a device limit, and the page will say so instead of citing a 25-page rule.",
      "Batching is the intended way past 25 pictures. Convert images 1–25, then 26–50, and join the two PDFs with Merge PDF. You can also number the merged file afterward. Keep the originals until you have opened the result. None of those steps uploads the pictures or the PDF to a Local2PDF server.",
      "The message you see when a batch is too large names the conversion, not a site-wide page cap. Adding a 26th image on Image to PDF, or on a format page that uses the same converter, is rejected before a PDF is built. Closing the tab and starting a new conversion resets the count. PDF tools never show that message, because they do not share the counter. If a PDF tool fails, the cause is memory, a password, or a file the browser cannot read — not the number 25.",
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
      "Firmify EOOD also publishes Firmify and StoryKind. Local2PDF is the document product: free, no account, and no watermark on the file you download. Atanas Ignatov, manager of Firmify EOOD, writes these notes. The company, not a hosting vendor, is the operator named on the About page.",
      "Local processing covers the tools that read your file: image conversion, merge, split, rotate, reorder, delete, extract, crop, resize, n-up, page numbers, compress, and PDF to JPG, PNG, or text. The site itself is still a website. Loading the page fetches HTML, CSS, and JavaScript from the host. If you accept analytics or advertising, those services can make their own requests. Those requests are not a copy of the PDF. The privacy policy separates that site traffic from document contents.",
      "You can see the difference in the Network panel. A conversion adds no request whose body is the file you selected. A failed or slow job is usually memory, a password-protected PDF, or a scan with no text layer. Closing other tabs, splitting a huge PDF first, or unlocking the file are the fixes. Uploading the same file to a server converter is not required for the tools listed above.",
      "The output is a normal download: a PDF, a ZIP of images, or a text file, depending on the tool. It is saved where your browser saves downloads. Local2PDF does not keep a copy, does not ask you to create an account, and does not stamp a watermark on that file. If you close the tab, the in-memory copy is gone. Keep your own original until you have checked the download.",
      "A practical check takes one minute. Pick a small PDF you can afford to experiment with, open Merge PDF or Add Page Numbers, and watch the Network panel while the download is created. The new file appears in your downloads folder. The request list gains no upload of that PDF. Repeat with an image on Image to PDF if you want to see the same pattern for pictures. That is the evidence the privacy claim refers to: the document body stays in the tab, and only the site’s own files travel over the network.",
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
      "Read the size the tool shows before you replace the original. A small change means the PDF was already compact, and the safe mode has little left to remove. Image-heavy mode can shrink a scan further because it rebuilds the pages. That rebuild is why text selection, form fields, and vector drawings can disappear. Use it for a photo packet you only need to read, not for a form someone still has to fill in.",
      "A signed PDF is a poor candidate. Any edit, including compression, changes the bytes the signature covers, so the signature may no longer validate. Password-protected files have to be unlocked before the browser can read them. Very large files can exhaust the tab. Splitting first, then compressing each part, is more reliable than one job that stalls.",
      "After a local compress, the download is the only copy Local2PDF produces. The site does not store it. Open the file, check a few pages, and keep the source until you are satisfied. If you still need a smaller message, Split PDF can divide the document, and PDF to JPG can export selected pages as images. Those tools are also local, and none of them inherits the 25-image cap.",
      "Choose the mode from the file, not from a target percentage. A text export from a word processor is already small; safe mode is enough, and image-heavy mode would throw away selection for almost no gain. A phone scan of a 20-page packet is the opposite: the pages are pictures, so image-heavy mode is the one that can make an email attachment fit. The tool shows the size before and after. If the new file is larger, keep the original — the compressor warns you when that happens. Either way, the PDF is read and written on your device. Compress PDF does not use the 25-image rule, does not ask for an account, and does not upload the file while it measures the new size.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
