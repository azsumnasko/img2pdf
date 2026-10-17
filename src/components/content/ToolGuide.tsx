const GUIDES: Record<string, { heading: string; paragraphs: string[] }> = {
  "image-to-pdf": {
    heading: "Convert images to PDF without uploading them",
    paragraphs: [
      "Image to PDF on Local2PDF turns JPEG, PNG, WebP, and HEIC files into one PDF in the browser. The 25-image cap applies only to this conversion and the related image landings. Merge, split, rotate, compress, and the other PDF tools do not use that cap. Their practical limit is the memory of the device you are using, and you can run as many conversions as you need.",
      "Each selected image becomes a page. You choose the paper size — A4, A3, A5, US Letter, US Legal, fit to the image, or a custom size — then set orientation, margins, and a quality preset. Drag pages into order and rotate any image before you convert. The PDF is built with local canvas and PDF APIs and downloaded to your device. Local2PDF does not receive the image bytes.",
      "Use JPEG for photographs and scans when file size matters. Use PNG for screenshots, diagrams, and logos, knowing that transparent pixels are filled with white so the page looks the same in every PDF reader. WebP is decoded by current Chrome, Firefox, Edge, and Safari. HEIC from an iPhone is decoded natively in Safari and with an on-device decoder in other browsers. You can mix those formats in one job, up to 25 images.",
      "Typical jobs include a stack of scanned receipts, a set of phone photos for printing, a screenshot sequence for a bug report, and a short visual appendix for a report. If you have more than 25 images, run a second conversion and combine the resulting PDFs with Merge PDF. Very large photos can be slow on older phones; closing other tabs usually helps.",
      "The output has no watermark and does not require an account. After the first visit, JPEG, PNG, and WebP conversion can continue offline. HEIC on non-Safari browsers may need the decoder to load once. Nothing in this tool uploads the document to a Local2PDF server.",
    ],
  },
  "compress-pdf": {
    heading: "What local PDF compression can and cannot do",
    paragraphs: [
      "Compress PDF reduces file size in your browser. It does not upload the PDF, and it is not limited to 25 pages. That cap belongs only to image-to-PDF. Compression is in beta: savings depend on how the file was built, and some documents barely shrink.",
      "Safe optimization rewrites PDF structures and drops unnecessary overhead. It is the right first pass for email, because it tries to keep the document readable and selectable. If the PDF is already well compressed, the new file may be almost the same size. That is expected, not a failed conversion.",
      "Image-heavy mode re-renders pages so large embedded photos take less space. That mode always changes the visual result. Text may no longer be selectable, form fields can disappear, and vector drawings become images. Use it when a scanned packet is too large to send and a slightly softer page is acceptable. Do not use it on a signed contract or a fillable form you still need to edit.",
      "Good candidates are photo-heavy exports, phone scans, and slide decks stuffed with uncompressed images. Poor candidates are text-only PDFs, files that were already exported at screen resolution, and anything that must keep a digital signature. Editing a signed PDF, including compressing it, can invalidate the signature.",
      "Compare the size shown after compression before you replace the original. If the reduction is small, keep the source file. For a hard email limit, split the PDF or export fewer pages instead of forcing a destructive recompress. All of this stays on your device.",
    ],
  },
  "combine-images-to-pdf": {
    heading: "Combine different image formats into one PDF",
    paragraphs: [
      "Combine Images to PDF is for mixed batches: a JPEG photo, a PNG diagram, a WebP export, and an HEIC shot from a phone, in one document. The same 25-image limit as Image to PDF applies, because both paths use the image converter. PDF tools such as merge and split are separate and are not capped at 25 pages.",
      "Order matters more here than on a single-format job. Drop the files in, then drag pages until the sequence matches the document you want to send. Rotate any sideways photo before converting. Pick A4 or Letter when the PDF will be printed, or fit-to-image when each picture should keep its own proportions.",
      "People use this for trip albums, homework photo sets, site-visit reports, and client proof packs. A single PDF is easier to email than a folder of mismatched formats, and recipients do not need a HEIC or WebP viewer.",
      "Transparent PNGs are placed on white. Animated WebP is not a multi-page animation; you get a still. Live Photos contribute the still frame. If a batch is larger than 25 images, convert it in parts and join the PDFs with Merge PDF.",
      "Processing is local. The images are read in the browser, drawn onto pages, and saved as a download. Local2PDF does not store the album.",
      "After you download the PDF, open two or three pages in a reader before you delete the originals. If a phone photo looks soft, raise the quality preset and convert that batch again. For a clean print set, number the merged file with Add Page Numbers once every batch is joined.",
    ],
  },
  "merge-pdf": {
    heading: "Merge PDF files without uploading them",
    paragraphs: [
      "Merge PDF combines several PDF files into one document in your browser. There is no 25-page product cap. How many files you can join depends on the memory of the device you are using. A short set of invoices is routine; a stack of large scanned books can be slow on a phone.",
      "Drop the files in, then drag pages from every source into the order you want. You can rotate a sideways page before you merge. The download is a new PDF. The originals on disk stay where they are until you replace them yourself.",
      "Typical jobs are combining invoices for an accountant, joining scanned chapters into one book, assembling a cover with a body and an appendix, and packing contract exhibits into a single file. If you only need a few pages from a large source, extract those pages first and then merge the shorter files.",
      "Password-protected PDFs must be unlocked before the browser can read them. Merging a signed PDF usually invalidates the digital signature, because the document bytes change. Interactive form fields from different files can conflict; open the result and check any fillable pages you still need.",
      "Nothing is uploaded. Close other tabs if a large merge stalls, then try again with fewer files or smaller sources. After the download, keep the originals until you have opened the merged file in your reader.",
    ],
  },
  "split-pdf": {
    heading: "Split a PDF into separate files on your device",
    paragraphs: [
      "Split PDF turns one PDF into several smaller PDFs in the browser. There is no 25-page product cap. You can split every page into its own file, cut the document every N pages, or enter custom ranges such as 1-3,5,8-10. Page numbers in those ranges start at 1.",
      "When the output is many files, the tool packs them into a ZIP so the browser can offer one download. That ZIP is built locally. The source PDF is never sent to a Local2PDF server.",
      "People split bank statements by month, pull chapters out of a report, break a bulk scan of receipts into separate files, and cut a file that is too large for an email attachment. If you only want a handful of pages as one new PDF, Extract PDF Pages is the shorter path.",
      "Encrypted PDFs must have their password removed first. Very large documents are limited by device memory. Custom ranges that skip pages produce one file per range, not one file per skipped gap. Keep the original until you have checked the first and last page of each result.",
      "Split does not reorder or rotate pages. Fix orientation with Rotate PDF, or rearrange with Reorder PDF Pages, before you cut the file if the reading order is wrong. All of that still stays on your device.",
    ],
  },
  "reorder-pdf-pages": {
    heading: "Reorder PDF pages without an upload",
    paragraphs: [
      "Reorder PDF Pages lets you drag pages into a new sequence and download a new PDF. There is no 25-image or 25-page product cap. The practical limit is browser memory. Each page moves one at a time with drag-and-drop or the arrow controls; there is no multi-select drag.",
      "Use this when a scanner fed pages out of order, when a presentation handout needs a different flow, when chapters were compiled wrong, or when an appendix should move to the end. You can rotate a page while you reorder if it is sideways.",
      "Reordering does not rasterize the page. Fonts, vectors, and image quality stay as they were in the source. The original file on disk is unchanged until you overwrite it. Digital signatures usually break once the page order changes.",
      "To reorder pages that currently live in several files, merge those PDFs first, then return here. To remove pages instead of moving them, use Delete PDF Pages. To keep a selection as a new file while leaving the rest alone, use Extract PDF Pages.",
      "Processing is local. Open the downloaded PDF and skim the first few pages before you discard the source. On a slow device, close other tabs if the thumbnails take a long time to appear.",
    ],
  },
  "extract-pdf-pages": {
    heading: "Extract selected PDF pages locally",
    paragraphs: [
      "Extract PDF Pages copies the pages you check into a new file and leaves the source PDF untouched. There is no 25-page product cap. You can combine the selection into one PDF or download each selected page as its own file. Several separate files come as a ZIP.",
      "This is the right tool when you want a few pages from a large packet: a single form, a signed page, or a chapter. Split PDF is better when you need every page or every N pages as separate files. Delete PDF Pages is better when the goal is a cleaned copy of the whole document with some pages removed.",
      "Combine mode keeps the original order of the pages you selected. Quality is preserved; pages are copied, not re-rendered as images. Password-protected files must be unlocked first. Changing a signed document for any reason can invalidate the signature on the copy you create.",
      "After you extract, you can merge the new file with other PDFs, add page numbers, or rotate a sideways page. None of those steps upload the document. Keep the original until you have opened the extract and confirmed the page count.",
      "Very large source files are limited by device memory. If the preview is slow, close other tabs or extract a smaller selection first. The work stays in the browser from the moment you choose the file until you download the result.",
    ],
  },
  "heic-to-pdf": {
    heading: "Convert HEIC photos to PDF in the browser",
    paragraphs: [
      "HEIC to PDF turns iPhone and iPad photos into a PDF you can send to anyone. Up to 25 images go into one conversion, the same cap as Image to PDF. Safari decodes HEIC natively. Other browsers use an on-device decoder that loads once and then runs locally.",
      "HEIC files are small on the camera roll, but many Windows apps and email systems still prefer PDF or JPEG. Converting before you share avoids a back-and-forth about formats. Live Photos contribute the still frame, not the short video.",
      "Arrange the pages, pick A4 or Letter for print, or fit-to-image when each photo should keep its shape. Rotate any sideways shot before you convert. If you have more than 25 photos, convert in batches and join the PDFs with Merge PDF.",
      "You can mix HEIC with JPEG, PNG, and WebP on Combine Images to PDF or the main Image to PDF tool. Starting here is enough when every file is HEIC. The photos are not uploaded to Local2PDF. After the first successful decode, later conversions on the same device are usually faster.",
      "Very large albums can be heavy on older phones. Close other tabs, or convert a smaller batch, if the page stalls. Keep the originals until you have opened the PDF and checked a few pages.",
    ],
  },
  "screenshot-to-pdf": {
    heading: "Turn screenshots into a PDF without uploading them",
    paragraphs: [
      "Screenshot to PDF builds a document from PNG or JPEG captures in your browser. The same 25-image cap as Image to PDF applies. That is a per-conversion limit, not a daily quota. PDF tools such as merge and split do not use that number.",
      "Screenshots often show emails, dashboards, or customer data. Local processing means those pixels stay on your device. Transparent PNG edges are placed on white so every PDF reader shows the same page.",
      "Use this for bug reports, onboarding guides, and short how-to packs. Order the captures so the story reads top to bottom. Fit-to-image keeps UI chrome sharp; A4 or Letter is better when you will print. If a flow has more than 25 frames, convert in parts and merge the PDFs afterward.",
      "For a single screenshot format you already know, PNG to PDF or JPG to PDF is the same converter with a narrower landing page. Combine Images to PDF is the right entry when the set mixes screenshots with phone photos.",
      "Nothing is uploaded. After you download, open the PDF and confirm the sequence before you delete the source images. On a long capture set, closing other tabs keeps memory free for the render.",
    ],
  },
  "pdf-to-jpg": {
    heading: "Export PDF pages as JPEG without an upload",
    paragraphs: [
      "PDF to JPG renders each page to a JPEG in your browser. There is no 25-page product cap. How many pages you can export depends on page size, the DPI you pick, and available memory. A short document at 150 DPI is routine; a long print-ready file at 300 DPI can be heavy.",
      "150 DPI is a practical default for sharing. 300 DPI is for print. Lower DPI keeps the ZIP smaller when you only need a preview. JPEG quality trades file size against artifacts. Photographs tolerate a lower quality setting; pages full of small text look cleaner closer to the high end of the slider.",
      "Multi-page PDFs download as a ZIP of images, one file per exported page. Choose JPEG when the page is a photo or a scan and size matters. If you need sharp UI text, diagrams, or line art, PDF to PNG is the better export because JPEG compression softens edges.",
      "The renderer reads the PDF locally. Password-protected files have to be unlocked before the browser can open them. Scanned pages export as pictures of those scans, which is what you want for an image archive, not for a text file. For selectable text, use PDF to Text instead.",
      "Nothing is uploaded. Close other tabs if a large export stalls, then retry at a lower DPI.",
    ],
  },
  "pdf-to-png": {
    heading: "Export PDF pages as PNG for sharp text and diagrams",
    paragraphs: [
      "PDF to PNG renders pages to lossless PNG images on your device. It is not limited to 25 pages. Memory and the DPI you choose set the practical limit. PNG files are larger than JPEG, which is the point: edges, labels, and UI screenshots stay crisp.",
      "Use PNG for diagrams, charts, screenshots embedded in a PDF, line art, and any page where text must stay readable when you zoom. Use PDF to JPG instead when the page is a photograph and you need a smaller file. 200 DPI is a strong default for diagrams; 300 DPI is for print; lower DPI is enough for a quick preview.",
      "Several pages download together as a ZIP. You can export a selection rather than every page when you only need a figure. The background is flattened for a normal image file, so the PNG is a picture of the page, not an editable PDF.",
      "This does not extract the original embedded image objects. It paints the page. If you need the pictures that were placed inside the PDF, that is a different job from a page render. Password-protected PDFs must be unlocked first. Very wide or very tall pages at high DPI can exhaust a laptop; lower the DPI or export fewer pages.",
      "Rendering stays in the browser. The PDF is not sent to Local2PDF.",
    ],
  },
  "pdf-to-text": {
    heading: "Extract selectable text from a PDF locally",
    paragraphs: [
      "PDF to Text reads the text layer already stored in the PDF and saves a .txt file. It does not run OCR, and it is not capped at 25 pages. A scanned page that is only an image will produce little or no text, because there is no text layer to read. Those files need a dedicated OCR tool before this extractor can help.",
      "Digital exports from Word, Google Docs, browsers, and most report generators include a text layer. Invoices, contracts, and ebooks usually work. The extractor keeps page breaks so you can see where each page ended. It does not preserve complex layout, columns, or the position of side notes. Treat the result as text, not as a clone of the page design.",
      "Copy from the on-page preview or download the .txt file. Both come from the same local read. If a paragraph looks garbled, the PDF may use a custom encoding or draw words as paths. In that case the characters are not real text, and no extractor can recover them without OCR.",
      "There is no upload. The file is parsed in browser memory. Large documents are fine until the tab runs out of memory; splitting the PDF first is a reliable workaround. Signed or password-protected files must be openable by the browser before text can be read.",
    ],
  },
  "resize-pdf-pages": {
    heading: "Resize PDF pages for A4, Letter, and custom paper",
    paragraphs: [
      "Resize PDF Pages changes the page box of an existing PDF in the browser. It is a PDF-to-PDF edit, so the 25-image limit does not apply. You can scale content to fit, center it on a larger sheet, or extend the canvas. Presets cover common sizes such as A4 and US Letter, and you can enter custom dimensions.",
      "Scale-to-fit is the usual choice when a Letter document must print on A4, or the reverse. Centering helps when you only need a different paper size and the artwork should stay the same scale, with extra margin around it. Extending the canvas adds space without shrinking the content.",
      "This is not the same as cropping. Crop removes a margin from the current page. Resize changes the destination size and how the existing content sits inside it. If a scan has a black border, crop first, then resize if the paper size is still wrong.",
      "Vector text stays in the PDF when you are changing the page box rather than re-rendering the page as an image. That keeps search and copy working in normal files. Very large page counts depend on device memory. A signed PDF can lose a valid signature once the bytes change.",
      "The file never leaves the browser. Download the resized PDF and keep the original until you have checked a couple of pages in your reader.",
      "If pages are sideways, rotate them before you resize so the new paper size matches the reading direction. For a packet that must be both A4 and numbered, resize first, then use Add Page Numbers so the margin matches the final page box.",
    ],
  },
  "rotate-pdf": {
    heading: "Rotate sideways PDF pages on your device",
    paragraphs: [
      "Rotate PDF turns pages by 90 degrees in either direction or by 180 degrees, then writes a new PDF locally. There is no 25-page cap. You can rotate one page, a selection, or the whole document. Phone scans and automatic document feeders often mix portrait and landscape; this fixes the reading direction without a desktop app.",
      "Rotation updates the page so viewers open it the right way up. It does not crop, resize, or recompress the page content. If a page is upside down, 180 degrees is the right move. If a landscape table was stored as a portrait page, rotate it until the table reads left to right.",
      "Use this before you merge files, so every packet faces the same way. Use it after a split if only one extracted page is sideways. For a document that also needs a new paper size, rotate first and then use Resize PDF Pages.",
      "Password-protected PDFs have to be unlocked before the browser can read them. Changing a signed PDF can invalidate the signature. Form fields usually remain, but you should open the result and confirm important pages. Processing happens in memory on your device and the download stays local.",
    ],
  },
  "delete-pdf-pages": {
    heading: "Delete PDF pages without sending the file away",
    paragraphs: [
      "Delete PDF Pages removes the pages you select and downloads the rest as a new PDF. It is not an image conversion, so the 25-image limit does not apply. You load one PDF, check the pages to drop, and save. The original file on disk is left untouched until you replace it yourself.",
      "Typical cleanups are blank pages at the end of a scan, a cover sheet you do not want to forward, and a confidential appendix that should not leave your machine. Because the edit is local, that appendix is not uploaded in order to be removed.",
      "If you need those pages as their own file, use Extract PDF Pages instead of deleting them. If the pages are only in the wrong order, use Reorder PDF Pages. Deletion is permanent in the output file: the new PDF simply does not contain the checked pages.",
      "Interactive forms and outlines can shift when pages disappear. Digital signatures usually break because the document bytes changed. Very large files are limited by browser memory, not by a fixed page count. Close other tabs if the preview is slow.",
      "After you download, open the cleaned file and confirm the page count before you overwrite the source. If you later need a continuous page sequence, number the cleaned PDF with Add Page Numbers. None of those steps leave your device.",
    ],
  },
  "webp-to-pdf": {
    heading: "Turn WebP images into a PDF anyone can open",
    paragraphs: [
      "WebP to PDF converts WebP images in the browser and downloads a normal PDF. Up to 25 images can go into one conversion, the same limit as the main image tool. PDF editing tools elsewhere on Local2PDF are not held to that number.",
      "WebP is common on the web because the files are small, but many email clients, printers, and older desktops still handle PDF more reliably than WebP. Converting before you send a set of images avoids a back-and-forth about formats. Current Chrome, Firefox, Edge, and Safari decode WebP natively, so no extra plugin is required.",
      "Arrange pages, pick a paper size, and set margins if you plan to print. Fit-to-image keeps each picture’s shape. A4 or Letter is better for a document packet. Animated WebP becomes a still frame, not a video page.",
      "You can mix WebP with JPEG, PNG, and HEIC in the main Image to PDF tool or on Combine Images to PDF. If you only have WebP, starting here is enough. The decoder and the PDF builder both run locally. The images are not uploaded to Local2PDF.",
    ],
  },
  "n-up-pdf": {
    heading: "Place several PDF pages on one sheet",
    paragraphs: [
      "N-Up PDF prints multiple pages of a document onto a single sheet — 2-up, 4-up, or similar layouts — and downloads a new PDF. There is no 25-page cap. The limit is how large a layout your browser can build from the source file.",
      "Handouts are the usual reason: a slide deck becomes a compact leave-behind, or a long reference becomes a proof sheet you can scan with your eyes. You pick how many pages sit on the sheet, the output paper size, and the gap between pages. The source pages are scaled down to fit those cells.",
      "Small type gets smaller. If the original is already dense, 2-up is safer than 6-up. This does not reorder the source; it flows pages in their current order. Rotate or reorder first if the reading sequence is wrong.",
      "The new file is a PDF, not a printer spool. You can still merge it or split it afterward. A signed source will not keep a valid signature after the pages are redrawn into a new layout. The work is done in the browser, and the file is not uploaded.",
    ],
  },
  "add-page-numbers-to-pdf": {
    heading: "Add page numbers without uploading the PDF",
    paragraphs: [
      "Add Page Numbers writes a number onto each page of an existing PDF and downloads a new file. The work happens in the browser. It is not an image conversion, so the 25-image cap does not apply. A long contract, a thesis, or a slide printout can all be numbered. The practical limit is the memory of the device you are using, not a fixed page count.",
      "You choose where the number sits: top or bottom of the page, and left, center, or right. The format is one of four patterns: a plain number, “Page 1”, “1 of N”, or “Page 1 of N”. N is the total number of pages in the file, including pages you chose not to number. The typeface is Helvetica. Font size runs from 6 to 48 points, and the default is 10. You also pick a color and a margin in millimetres. The default margin is 15 mm.",
      "Start page and start number are separate. Start page is the first page that receives a number, so setting it to 2 leaves a cover unnumbered. Start number is the figure printed on that first numbered page. A document that should begin at page 12, after a front section numbered elsewhere, uses start number 12. Pages before the start page are copied through unchanged.",
      "The number is drawn at the margin you set. It does not search for empty space. If a header, footer, or photo already occupies that edge, raise the margin until the number sits clear of it. Number the file after you rotate, crop, or resize, because those edits change where the edge is. Merging several PDFs first, then numbering the combined file, gives one continuous sequence.",
      "The original file on your device is not replaced until you save over it. Changing the PDF can invalidate a digital signature, so keep the signed original if the signature still matters. Password-protected files have to be openable in the browser before numbers can be added. Nothing in this tool uploads the document to a Local2PDF server.",
    ],
  },
  "crop-pdf": {
    heading: "Crop PDF margins on your device",
    paragraphs: [
      "Crop PDF trims the same margin from pages in the browser and downloads the tighter file. It is not limited to 25 pages. You set how many millimetres to remove from the top, right, bottom, and left. That suits scanner borders, a shipping label sitting on a full page, and documents with a wide empty frame.",
      "Cropping changes the visible page box. It is different from resizing. Resize fits the whole page onto a new paper size. Crop throws away a strip at the edge. If you only need A4 instead of Letter and the content should all remain, use Resize PDF Pages instead.",
      "Measure the unwanted border before you apply a large value. An aggressive crop can cut off headers, page numbers, or the edge of a photo. The preview is there so you can correct the numbers before downloading. Apply one set of margins to the document rather than guessing a different crop on every page.",
      "The original file stays where it is until you overwrite it. Signature validity can change because the PDF bytes change. Password-protected files must be unlocked first. Processing stays on the device.",
    ],
  },
};

export function ToolGuide({ id }: { id: keyof typeof GUIDES }) {
  const guide = GUIDES[id];
  if (!guide) return null;
  return (
    <section className="tool-seo" aria-labelledby={`${id}-guide`}>
      <h2 id={`${id}-guide`}>{guide.heading}</h2>
      {guide.paragraphs.map((text) => (
        <p key={text.slice(0, 48)}>{text}</p>
      ))}
    </section>
  );
}
