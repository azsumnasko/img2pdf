# LocalPDF — Product & SEO Specification for Organic Growth

**Версия:** 1.0  
**Дата на проучването:** 22 юли 2026 г.  
**Основна цел:** увеличаване на органичния трафик чрез разширяване на LocalPDF от image-to-PDF инструмент към privacy-first PDF toolkit, работещ локално в браузъра.  
**Обхват:** Tier 1 и Tier 2 инструменти, информационна архитектура, UX, техническа реализация, on-page SEO, content strategy, internal linking, измерване и rollout.

---

## 1. Резюме

LocalPDF има добър начален differentiator:

> **Файловете се обработват локално и не се качват на сървър.**

Това е реална продуктова полза, но вече не е достатъчно уникална сама по себе си. Drawboard, PDFgear, EmbedPDF и множество нови browser-based инструменти също използват „no upload“, „runs in your browser“ и „private“ позициониране.

Следователно SEO стратегията не трябва да бъде:

> Да добавим много страници, които повтарят „private PDF tool“.

Тя трябва да бъде:

> Да изградим най-добрата компактна колекция от надеждни локални PDF инструменти, всеки от които отговаря на отделно търсене и има отличен UX, техническа достоверност и ясно съдържание.

### Основна препоръка

Изграждането да бъде разделено на два продуктови слоя:

1. **Tier 1 — high-demand, high-confidence tools**
   - Merge PDF
   - Split PDF
   - PDF to JPG
   - PDF to PNG
   - Rotate PDF
   - Organize/Reorder PDF Pages
   - Delete PDF Pages
   - Extract PDF Pages

2. **Tier 2 — long-tail и topical authority tools**
   - PDF to Text
   - Extract Images from PDF
   - Add Page Numbers
   - Crop PDF
   - Resize PDF Pages
   - N-up PDF
   - Compress PDF — ограничен и ясно обозначен browser-local вариант

### Промяна спрямо първоначалната идея

**PDF to PowerPoint не се препоръчва за Tier 2.** Потребителите, които търсят „PDF to PowerPoint“, обикновено очакват редактируеми слайдове. Локален export, при който всяка PDF страница е изображение върху слайд, може да изглежда визуално добре, но не покрива основното search intent. Такъв инструмент може да бъде добавен по-късно като ясно именуван:

> PDF to PowerPoint Slides — visual copy, not editable

### Най-важният SEO принцип

Всеки инструмент трябва да има:

- собствен indexable URL;
- собствено server-rendered съдържание;
- уникален title, H1 и описание;
- работещ инструмент над fold-а;
- специфични use cases, ограничения и FAQ;
- crawlable internal links към свързани инструменти;
- реална функционална разлика, а не само сменено заглавие.

---

## 2. Методология и ограничения на проучването

Проучването включва:

- преглед на текущата homepage структура на LocalPDF;
- анализ на публичните search results за основните PDF задачи;
- преглед на продуктови страници на Adobe Acrobat, Smallpdf, iLovePDF, PDF24, PDFgear, Drawboard, PDFResizer, Sejda и други;
- преглед на текущите Google Search Central изисквания;
- преглед на browser-side технологии като PDF.js, pdf-lib, Web Workers, File API, JSZip и WebAssembly;
- преглед на публични Semrush, Ahrefs и Similarweb snippets за мащаба на PDF search категорията.

### Ограничения

Този документ не използва:

- Google Search Console на LocalPDF;
- Google Analytics данни;
- Google Keyword Planner account data;
- платен Ahrefs/Semrush export;
- реални conversion и retention данни от LocalPDF.

Затова всички оценки за demand и competition са **относителни**, а не официални search-volume прогнози.

Преди финалното фиксиране на roadmap-а трябва да се добавят:

- Search Console query export;
- top countries;
- device split;
- current indexed URLs;
- current impressions and average positions;
- конкурентен keyword gap export от Ahrefs/Semrush, ако има бюджет.

---

## 3. Основни изводи от проучването

### 3.1. PDF инструментите са силно SEO-driven категория

Публичните данни показват, че organic search е основен канал за големите PDF платформи. Similarweb показва organic search като водещ desktop traffic source за Smallpdf през юни 2026 г. Публичен Ahrefs snippet оценява Smallpdf на десетки милиони месечни search visits и десетки хиляди ranking keywords.

Публичните Semrush snippets показват multi-million search demand в отделни пазари за заявки като:

- JPG to PDF;
- PDF to Word;
- Merge PDF;
- PDF Compressor.

Тези числа не трябва да се приемат като глобални точни обеми, но доказват, че PDF tasks са голяма search category.

### 3.2. Най-силните SERP-и се доминират от големи брандове

За broad keywords като:

- merge pdf;
- split pdf;
- pdf to jpg;
- rotate pdf;
- delete pdf pages;

се срещат Adobe, Smallpdf, iLovePDF, PDF24, Canva, PDFgear, Sejda и други утвърдени домейни.

LocalPDF не трябва да разчита на бързо класиране на първо място по head term. Първоначалната възможност е комбинация от:

- broad keyword relevance;
- privacy/local modifiers;
- long-tail use cases;
- превъзходен UX;
- topical cluster;
- backlinks от privacy, security и productivity източници.

### 3.3. „No upload“ вече е конкурентна характеристика, не уникална категория

Drawboard предлага browser-based PDF to JPG/PNG, merge, split и rotate инструменти с no-upload messaging. PDFgear също заявява локална обработка за част от инструментите си. EmbedPDF предлага open-source browser-local merge tool. Има и много нови малки privacy-first toolkits.

Следователно LocalPDF трябва да надгради „no upload“ с доказуеми ползи:

- ясно техническо обяснение;
- self-hosted processing dependencies;
- offline/PWA support;
- Network verification guide;
- липса на file metadata в analytics;
- performance benchmarks;
- честно описани ограничения.

### 3.4. Tool pages печелят, когато съчетават функция и съдържание

Конкурентните страници обикновено съдържат:

- tool interface;
- 3–5 стъпки;
- feature blocks;
- FAQs;
- device/platform sections;
- related tools;
- tutorials.

Само converter UI без crawlable текст ограничава keyword coverage. Само дълъг SEO текст без силен инструмент води до ниска удовлетвореност.

### 3.5. Един общ „Organize PDF“ workspace може да захранва няколко SEO landing pages

Технически следните операции могат да използват един editor shell:

- reorder;
- rotate;
- delete;
- extract;
- add pages;
- merge at page level.

SEO обаче всяко основно intent трябва да има отделна landing page и preset:

- `/tools/reorder-pdf-pages`
- `/tools/rotate-pdf`
- `/tools/delete-pdf-pages`
- `/tools/extract-pdf-pages`

Страниците могат да зареждат един и същ component, но:

- default state;
- explanatory copy;
- H1;
- primary action;
- related content;
- metadata;

трябва да са различни.

---

## 4. Текущо състояние на LocalPDF

Текущата homepage комуникира:

- JPG, PNG, WebP и HEIC към PDF;
- до 25 страници;
- no signup;
- no watermark;
- no uploads;
- browser-local processing;
- offline support след първо посещение за част от форматите.

Това е добра основа.

### Текущи силни страни

- ясно обещание;
- нисък friction;
- privacy differentiation;
- работещ продукт, а не content-only сайт;
- format-specific pages;
- HEIC support;
- cross-device utility;
- потенциал за PWA.

### Текущи слабости

1. **Твърде тесен topic cluster**  
   Сайтът е предимно „images to PDF“, а не „PDF tools“.

2. **Липсва централен PDF tools hub**  
   Няма ясна архитектура за „Convert from PDF“, „Organize PDF“, „Improve PDF“.

3. **Крос-реферирането към Firmify и StoryKind е твърде високо на homepage**  
   „Also by the maker“ се появява преди „How it works“. Това разсейва от primary intent и трябва да бъде преместено във footer или след основното съдържание.

4. **Privacy claim трябва да бъде доказано, не само повторено**  
   При растяща конкуренция е необходима техническа trust страница.

5. **Липсва достатъчно content depth за цял PDF topic**  
   Нужни са специфични инструкции, ограничения, use cases и troubleshooting.

---

## 5. Стратегическо позициониране

### Препоръчано основно позициониране

> **Private PDF tools that work on your device.**

### Вторично обещание

> No uploads. No account. No watermark.

### Препоръчан homepage headline след Tier 1

> **Private PDF Tools — Process Files on Your Device**

### Homepage subheadline

> Merge, split, organize and convert PDF files directly in your browser. Your documents never leave your device.

### Основен differentiation stack

1. **Local processing**
2. **No account**
3. **No watermark**
4. **Fast start**
5. **Works offline where technically possible**
6. **Honest limits**
7. **No hidden file upload**
8. **Useful free tier**
9. **Optional Pro, без aggressive paywall**

### Какво да не се обещава

- „100% secure“;
- „perfect conversion“;
- „unlimited file size“;
- „works on every PDF“;
- „no data leaves your device“, ако има analytics/ads requests, без уточнение, че самият файл не се изпраща;
- „editable PowerPoint“, ако output-ът е image-based;
- „lossless compression“, когато PDF е rasterized или изображенията се recompress-ват.

---

## 6. Обновена приоритизация

### Scoring model

Всеки tool е оценен по:

- **Demand:** относителна ширина на search intent;
- **SERP difficulty:** сила на конкурентите;
- **Local fit:** колко естествено работи в browser;
- **Engineering confidence:** вероятност за надежден MVP;
- **Cluster value:** колко добре подкрепя останалите страници;
- **Retention:** вероятност потребителят да използва други инструменти;
- **Risk:** вероятност за разочарование или технически проблеми.

Скалата е 1–5, като при „Risk“ 5 означава висок риск.

| Tool | Demand | Local fit | Eng. confidence | Cluster value | Risk | Tier |
|---|---:|---:|---:|---:|---:|---|
| Merge PDF | 5 | 5 | 5 | 5 | 1 | 1 |
| Split PDF | 5 | 5 | 5 | 5 | 1 | 1 |
| PDF to JPG | 5 | 5 | 5 | 5 | 2 | 1 |
| PDF to PNG | 4 | 5 | 5 | 4 | 2 | 1 |
| Rotate PDF | 4 | 5 | 5 | 5 | 1 | 1 |
| Reorder PDF Pages | 4 | 5 | 5 | 5 | 1 | 1 |
| Delete PDF Pages | 4 | 5 | 5 | 5 | 1 | 1 |
| Extract PDF Pages | 4 | 5 | 5 | 5 | 1 | 1 |
| PDF to Text | 4 | 4 | 4 | 4 | 3 | 2 |
| Extract Images | 3 | 4 | 3 | 4 | 3 | 2 |
| Add Page Numbers | 3 | 5 | 5 | 4 | 1 | 2 |
| Crop PDF | 3 | 5 | 4 | 4 | 2 | 2 |
| Resize PDF Pages | 3 | 5 | 4 | 4 | 2 | 2 |
| N-up PDF | 2 | 5 | 4 | 3 | 2 | 2 |
| Compress PDF | 5 | 3 | 2–3 | 5 | 5 | 2 / Beta |
| PDF to PPTX | 5 | 2 | 2 | 3 | 5 | Later |
| PDF to editable DOCX | 5 | 1–2 | 1 | 3 | 5 | Do not prioritize |
| PDF to XLSX | 4 | 1 | 1 | 2 | 5 | Do not prioritize |

---

# PART A — SHARED PRODUCT FOUNDATION

## 7. Information architecture

### 7.1. Recommended URL structure

```text
/
├── /pdf-tools
│
├── /tools/
│   ├── jpg-to-pdf
│   ├── png-to-pdf
│   ├── webp-to-pdf
│   ├── heic-to-pdf
│   ├── images-to-pdf
│   │
│   ├── merge-pdf
│   ├── split-pdf
│   ├── rotate-pdf
│   ├── reorder-pdf-pages
│   ├── delete-pdf-pages
│   ├── extract-pdf-pages
│   │
│   ├── pdf-to-jpg
│   ├── pdf-to-png
│   ├── pdf-to-text
│   ├── extract-images-from-pdf
│   │
│   ├── add-page-numbers-to-pdf
│   ├── crop-pdf
│   ├── resize-pdf-pages
│   ├── n-up-pdf
│   └── compress-pdf
│
├── /guides/
│   ├── how-local-pdf-processing-works
│   ├── merge-pdf-without-uploading
│   ├── split-confidential-pdf-safely
│   ├── pdf-to-jpg-vs-png
│   ├── verify-files-are-not-uploaded
│   ├── browser-pdf-file-size-limits
│   └── local-vs-cloud-pdf-tools
│
├── /privacy
├── /security
├── /about
├── /contact
└── /terms
```

### 7.2. Main navigation

Desktop:

```text
LocalPDF | All Tools | Convert | Organize | Improve | Privacy
```

Mobile:

```text
Menu
- All PDF Tools
- Images to PDF
- Convert from PDF
- Organize PDF
- Improve PDF
- Privacy
```

### 7.3. PDF Tools hub

URL:

```text
/pdf-tools
```

H1:

> Private PDF Tools — No File Uploads

Categories:

#### Convert to PDF
- JPG to PDF
- PNG to PDF
- WebP to PDF
- HEIC to PDF
- Images to PDF

#### Convert from PDF
- PDF to JPG
- PDF to PNG
- PDF to Text
- Extract Images

#### Organize PDF
- Merge PDF
- Split PDF
- Reorder Pages
- Rotate Pages
- Delete Pages
- Extract Pages

#### Improve and Prepare PDF
- Add Page Numbers
- Crop PDF
- Resize Pages
- N-up PDF
- Compress PDF

The hub must not be a list of plain links only. Each card should contain:

- tool name;
- one-sentence use case;
- privacy indicator;
- direct crawlable `<a href>`;
- status badge only when relevant: New, Beta, Offline-ready.

---

## 8. Shared landing page template

Every tool page should use the following structure.

### 8.1. Above the fold

1. Breadcrumbs
2. H1
3. One-sentence benefit
4. Local-processing badge
5. Tool dropzone or primary UI
6. Brief trust line

Example:

> Merge PDF files directly on your device. No uploads, account or watermark.

Trust line:

> Your PDFs are processed in browser memory and are not sent to LocalPDF servers.

### 8.2. Immediately after the tool

- successful output/download area;
- related next action;
- optional cross-tool flow;
- no intrusive ad before download.

Example:

> Need to remove pages first? Open **Delete PDF Pages**.

### 8.3. Supporting content

1. How it works
2. Key capabilities
3. Common use cases
4. Local processing explanation
5. Limitations
6. Browser/device support
7. FAQ
8. Related tools
9. Relevant guides

### 8.4. Page length

No universal word count is required.

Recommended:

- Tier 1 page: 700–1,300 useful words;
- Tier 2 page: 600–1,100 useful words;
- no filler paragraphs;
- tool UI visible without scrolling excessively;
- repeated privacy messaging limited to 3–4 strategically placed instances.

### 8.5. Shared SEO metadata pattern

Title:

```text
[Primary Task] Locally — Private, No Upload | LocalPDF
```

Alternative for broad CTR:

```text
[Primary Task] Online Free — Files Stay on Your Device | LocalPDF
```

H1:

```text
[Primary Task] Locally
```

Meta description pattern:

```text
[Action] directly in your browser. No file uploads, signup or watermark. Fast, private PDF processing on your device.
```

Avoid identical meta descriptions across all pages.

---

## 9. Shared tool UX requirements

### 9.1. File input

Support:

- click-to-select;
- drag and drop;
- keyboard activation;
- paste from clipboard where relevant;
- mobile Files picker;
- mobile camera only where relevant;
- multiple file selection where relevant.

### 9.2. Local processing indicator

Display a persistent badge:

> Processed locally

On click, open a short explanation:

> The selected file is read by your browser and processed in local memory. The document itself is not uploaded to LocalPDF.

### 9.3. Progress and cancellation

Every operation longer than approximately one second should show:

- current stage;
- progress where measurable;
- cancel button;
- memory warning where relevant;
- error recovery.

Bad:

> Processing…

Better:

> Rendering page 12 of 40  
> 30% complete

### 9.4. File limits

Do not advertise arbitrary fixed limits unless technically necessary.

Use dynamic guidance:

- low-memory mobile device;
- large page count;
- high-resolution pages;
- encrypted PDF;
- corrupted PDF.

Suggested messages:

> This PDF is large for browser processing. It may work, but closing other tabs can improve reliability.

> Your device may not have enough free memory to render every page at 300 DPI. Try 150 DPI.

### 9.5. Privacy-safe analytics

Never send:

- filename;
- document title;
- author;
- extracted text;
- page content;
- image thumbnails;
- exact file path;
- passwords.

Allowed aggregated properties:

- tool slug;
- file-count bucket;
- file-size bucket;
- page-count bucket;
- device class;
- browser family;
- selected output format;
- processing duration;
- success/error code;
- user-initiated download.

Example buckets:

```text
file_size_bucket:
- <1MB
- 1–10MB
- 10–50MB
- 50–100MB
- >100MB

page_count_bucket:
- 1
- 2–10
- 11–25
- 26–50
- 51–100
- >100
```

---

## 10. Shared technical architecture

### 10.1. Recommended core stack

- **PDF.js** — PDF parsing, page rendering, thumbnails, text content;
- **pdf-lib** — copying, merging, removing, rotating and writing PDF pages;
- **Web Workers** — heavy processing outside the main UI thread;
- **OffscreenCanvas**, when supported — rendering away from the main DOM;
- **JSZip or fflate** — multi-file ZIP output;
- **File API / Blob / ArrayBuffer** — local file handling;
- **Service Worker** — offline shell and cached processing libraries;
- **IndexedDB** — optional caching of large WASM and OCR language resources, not user documents by default.

### 10.2. Bundle strategy

Do not load every PDF library on every page.

Recommended:

```text
Base landing page:
- HTML/CSS
- lightweight tool shell
- analytics/consent layer

On file interaction:
- load PDF.js or pdf-lib
- initialize Worker
- load ZIP library only when multiple output files are needed
- load OCR data only after explicit OCR selection
```

### 10.3. Memory strategy

- render thumbnails at low resolution;
- virtualize page grids;
- render only visible thumbnails;
- revoke Object URLs after use;
- reuse canvases;
- clear canvas dimensions after export;
- process conversion pages sequentially;
- avoid retaining full-resolution images for all pages;
- transfer ArrayBuffers to workers where possible;
- expose Cancel and clean worker state.

### 10.4. Licensing review

Before selecting any WASM PDF engine:

- verify license compatibility;
- verify whether AGPL obligations apply;
- document commercial licensing requirements;
- avoid accidentally introducing a copyleft obligation incompatible with the product strategy.

MuPDF.js and Ghostscript offer AGPL/commercial licensing models. They should not be added casually without legal review.

### 10.5. Browser support target

Primary:

- current Chrome;
- current Edge;
- current Firefox;
- current Safari;
- current iOS Safari;
- current Android Chrome.

Graceful degradation:

- no OffscreenCanvas → regular canvas with sequential rendering;
- no File System Access API → normal Blob download;
- low memory → reduced preview quality;
- offline assets not cached → explain that first load requires internet.

---

# PART B — TIER 1 SPECIFICATIONS

## 11. Tier 1 release objective

Tier 1 should transform LocalPDF from a single-purpose converter into a credible PDF toolkit.

### Tier 1 success criteria

- eight live, indexable tool pages;
- all tools operate without uploading documents;
- shared page organizer architecture;
- server-rendered tool copy;
- strong internal-link cluster;
- reliable mobile fallback;
- Search Console monitoring by page and query;
- no major Core Web Vitals regression;
- no misleading output claims.

---

## 12. Merge PDF

### URL

```text
/tools/merge-pdf
```

### Primary intent

Combine two or more PDF files into one PDF.

### Keyword map

Primary:

- merge PDF;
- combine PDF files;
- PDF merger.

Secondary:

- merge PDF locally;
- merge PDF without upload;
- private PDF merger;
- combine PDF files offline;
- merge confidential PDFs;
- join PDF files in browser.

### Recommended metadata

**Title**

> Merge PDF Locally — Private, No Upload | LocalPDF

**H1**

> Merge PDF Files Locally

**Meta description**

> Combine PDF files directly in your browser. Reorder documents, merge them privately and download one PDF—no upload, signup or watermark.

### MVP functionality

- multiple PDF selection;
- drag-to-reorder files;
- filename and page-count display;
- remove a selected input;
- merge into one output;
- preserve page dimensions;
- preserve page content without rasterizing;
- output filename control;
- local download.

### Recommended V1.1 functionality

- expand each file to page thumbnails;
- reorder individual pages across documents;
- rotate selected pages;
- delete selected pages;
- add more PDFs after initial selection;
- undo/redo.

### Edge cases

- encrypted/password-protected PDFs;
- damaged xref table;
- zero-page PDF;
- huge PDFs;
- mixed orientations;
- mixed page dimensions;
- forms and annotations;
- PDFs with signatures.

### Important limitation copy

> Merging a digitally signed PDF can invalidate its existing signature because the document structure changes.

### Acceptance criteria

- merging does not rasterize pages;
- page dimensions remain unchanged;
- bookmarks may be omitted in MVP, but limitation is documented;
- output opens in Chrome, Firefox, Safari Preview and Adobe Reader;
- 20 test fixture combinations pass;
- error does not destroy already selected files;
- documents are not sent over network.

### Supporting content sections

- Merge invoices into one PDF;
- Combine scanned documents;
- Merge contracts without uploading;
- Merge PDFs with different page sizes;
- What happens to signatures and forms?;
- Difference between merge and organize.

### Related links

- Reorder PDF Pages;
- Delete PDF Pages;
- Split PDF;
- Images to PDF.

---

## 13. Split PDF

### URL

```text
/tools/split-pdf
```

### Primary intent

Break one PDF into several files.

### Keyword map

Primary:

- split PDF;
- separate PDF pages;
- PDF splitter.

Secondary:

- split PDF by page range;
- split PDF into individual pages;
- split PDF without upload;
- extract pages from PDF;
- private PDF splitter.

### Recommended metadata

**Title**

> Split PDF Locally — Separate Pages Without Upload | LocalPDF

**H1**

> Split PDF Files Locally

### Split modes

1. **Every page**
2. **Custom ranges**
3. **Split after selected pages**
4. **Every N pages**
5. **Extract selected pages as one PDF**
6. **Extract selected pages as separate PDFs**

### Range syntax

Support:

```text
1-3, 5, 8-10
```

Validate:

- duplicate pages;
- reversed range;
- page beyond document;
- invalid characters;
- empty output.

### Output

- single output → direct download;
- multiple outputs → ZIP;
- predictable filenames:

```text
original-pages-1-3.pdf
original-page-5.pdf
```

### UX requirements

- thumbnail overview;
- visual split markers;
- range text input synchronized with selection;
- preview output groups;
- page count per output;
- total output count.

### Acceptance criteria

- no rasterization;
- page order preserved;
- custom ranges produce exact expected output;
- ZIP filenames are deterministic;
- 100-page test PDF can be split without UI freeze on a normal desktop;
- mobile UI supports range input even if thumbnail grid is simplified.

### Content opportunities

- split a large PDF for email;
- separate chapters;
- split invoices;
- extract a signed appendix;
- split scanned documents privately.

### Related links

- Extract PDF Pages;
- Delete PDF Pages;
- Merge PDF;
- Reorder PDF Pages.

---

## 14. PDF to JPG

### URL

```text
/tools/pdf-to-jpg
```

### Primary intent

Render each PDF page as a JPG image.

### Keyword map

Primary:

- PDF to JPG;
- PDF to JPEG;
- convert PDF to image.

Secondary:

- PDF to JPG without upload;
- PDF to JPG locally;
- save PDF pages as JPEG;
- high resolution PDF to JPG;
- PDF pages to images.

### Recommended metadata

**Title**

> PDF to JPG Locally — No Upload, High Quality | LocalPDF

**H1**

> Convert PDF to JPG Locally

### MVP functionality

- one or multiple PDFs;
- page selection;
- output DPI presets;
- JPG quality control;
- background color;
- ZIP output;
- individual image download;
- filename pattern.

### Recommended presets

- Screen: 96 DPI;
- Standard: 150 DPI;
- Print: 300 DPI;
- Custom scale, with safe upper limit.

### Default

150 DPI and quality approximately 0.88–0.92.

### Important UX distinction

Do not combine two different actions without explaining them:

1. **Convert full pages to JPG**
2. **Extract embedded images**

The second belongs to a separate tool.

### Acceptance criteria

- page dimensions map consistently to selected DPI;
- white background used for transparent PDF areas;
- page count and estimated output size shown;
- pages processed sequentially;
- generated images remain correctly ordered;
- user can stop conversion.

### Content opportunities

- JPG vs PNG;
- best DPI for web, email and printing;
- converting selected pages;
- privacy for IDs and statements;
- why text is no longer selectable after conversion.

### Related links

- PDF to PNG;
- Extract Images from PDF;
- JPG to PDF;
- Split PDF.

---

## 15. PDF to PNG

### URL

```text
/tools/pdf-to-png
```

### Primary intent

Render PDF pages as lossless/high-quality PNG images.

### Keyword map

Primary:

- PDF to PNG;
- convert PDF to PNG;
- PDF pages to PNG.

Secondary:

- PDF to PNG without upload;
- private PDF to PNG;
- transparent PDF to PNG;
- high resolution PDF to PNG.

### Product difference from JPG

Explain clearly:

- PNG is better for screenshots, diagrams and text-heavy pages;
- JPG is usually smaller for photographs;
- PDF transparency behavior may vary;
- full-page rendering is not the same as image extraction.

### Functionality

Same base renderer as PDF to JPG, with:

- PNG output;
- transparency option where technically valid;
- white background default;
- resolution presets;
- ZIP.

### Acceptance criteria

- no JPEG artifacts;
- correct alpha behavior;
- predictable dimensions;
- memory-safe sequential render;
- output opens correctly on mobile and desktop.

### Related links

- PDF to JPG;
- Extract Images;
- PNG to PDF;
- Crop PDF.

---

## 16. Rotate PDF

### URL

```text
/tools/rotate-pdf
```

### Primary intent

Permanently rotate PDF pages.

### Keyword map

Primary:

- rotate PDF;
- rotate PDF pages;
- turn PDF pages.

Secondary:

- rotate one page in PDF;
- rotate PDF locally;
- fix sideways PDF;
- rotate scanned PDF without upload.

### Recommended metadata

**Title**

> Rotate PDF Pages Locally — Private & Free | LocalPDF

**H1**

> Rotate PDF Pages Locally

### Functionality

- rotate left 90°;
- rotate right 90°;
- rotate 180°;
- apply to:
  - selected pages;
  - all pages;
  - odd pages;
  - even pages;
  - portrait pages;
  - landscape pages;
- multi-select;
- undo/redo.

### UX

- thumbnail grid;
- per-page rotation buttons;
- batch toolbar;
- selected count;
- keyboard shortcuts;
- visible orientation.

### Acceptance criteria

- rotation changes page rotation metadata or page transform without rasterization;
- page content remains sharp;
- repeated rotations normalize correctly;
- mixed orientation documents work;
- selection is accessible by keyboard.

### Related links

- Reorder PDF;
- Delete PDF Pages;
- Crop PDF;
- Merge PDF.

---

## 17. Reorder PDF Pages / Organize PDF

### Recommended URL

```text
/tools/reorder-pdf-pages
```

Optional secondary alias:

```text
/tools/organize-pdf
```

Use one canonical URL. Do not keep two independently indexable duplicates.

### Primary intent

Change the order of pages.

### Keyword map

Primary:

- reorder PDF pages;
- rearrange PDF pages;
- organize PDF.

Secondary:

- sort PDF pages;
- move pages in PDF;
- reorder PDF locally;
- organize scanned PDF.

### Recommended metadata

**Title**

> Reorder PDF Pages Locally — Drag, Sort & Save | LocalPDF

**H1**

> Reorder PDF Pages

### Functionality

- thumbnail grid;
- drag and drop;
- move selected pages;
- reverse all pages;
- sort odd/even;
- duplicate page;
- rotate;
- delete;
- add another PDF;
- undo/redo.

### Important strategic role

This should become the shared workspace used by:

- rotate;
- delete;
- extract;
- merge page-level mode.

Each landing page opens the same editor with a different primary toolbar and onboarding.

### Acceptance criteria

- drag works with mouse and touch;
- keyboard alternative exists;
- large page counts use virtualization;
- selected pages can be moved as a group;
- output preserves page fidelity;
- no accidental deletion without undo.

### Related links

- Rotate PDF;
- Delete PDF Pages;
- Extract PDF Pages;
- Merge PDF.

---

## 18. Delete PDF Pages

### URL

```text
/tools/delete-pdf-pages
```

### Primary intent

Remove unwanted pages.

### Keyword map

Primary:

- delete PDF pages;
- remove pages from PDF;
- PDF page remover.

Secondary:

- delete blank PDF pages;
- remove PDF pages locally;
- remove one page from PDF;
- delete pages without upload.

### Functionality

- select thumbnails;
- click trash icon;
- Shift range selection;
- page-range input;
- select all;
- invert selection;
- undo;
- preview remaining page count.

### Guardrails

- do not allow zero-page output;
- warn before deleting every page;
- mark deleted pages until Save instead of immediately destroying state;
- offer restore.

### Acceptance criteria

- exact pages removed;
- remaining order preserved;
- no rasterization;
- fast selection for large documents;
- range input and thumbnail selection stay synchronized.

### Content opportunities

- remove blank pages;
- clean scanned PDFs;
- remove confidential appendices;
- reduce a document before sharing.

### Related links

- Extract Pages;
- Split PDF;
- Reorder Pages;
- Compress PDF.

---

## 19. Extract PDF Pages

### URL

```text
/tools/extract-pdf-pages
```

### Primary intent

Create a new PDF from selected pages.

### Keyword map

Primary:

- extract PDF pages;
- save pages from PDF;
- extract one page from PDF.

Secondary:

- extract selected PDF pages;
- extract PDF pages locally;
- save PDF page as PDF;
- pull pages from PDF.

### Functionality

- select pages;
- range syntax;
- create one combined PDF;
- create separate PDFs;
- direct or ZIP download;
- preserve order;
- custom output filename.

### Difference from Split PDF

Explain:

- **Extract** = choose the pages you want;
- **Delete** = remove the pages you do not want;
- **Split** = produce multiple grouped files.

### Acceptance criteria

- selected order can follow original order by default;
- optional custom selected order;
- exact page fidelity;
- deterministic filenames;
- no empty outputs.

### Related links

- Split PDF;
- Delete PDF Pages;
- PDF to JPG;
- Merge PDF.

---

# PART C — TIER 2 SPECIFICATIONS

## 20. Tier 2 objective

Tier 2 expands topical coverage and captures long-tail tasks after the core organize/convert cluster is stable.

Tier 2 should begin only when:

- Tier 1 pages are indexed;
- key tools have stable completion rates;
- page organizer architecture is reusable;
- real Search Console queries reveal demand;
- Core Web Vitals remain healthy.

---

## 21. PDF to Text

### URL

```text
/tools/pdf-to-text
```

### Primary intent

Extract text from a PDF.

### Keyword map

Primary:

- PDF to text;
- extract text from PDF;
- PDF to TXT.

Secondary:

- PDF to text without upload;
- local PDF text extractor;
- copy text from PDF;
- PDF text extraction offline;
- scanned PDF to text.

### Two modes

#### Mode A — Embedded text

- fast;
- uses the existing text layer;
- preserves page boundaries;
- outputs TXT;
- optional JSON;
- optional copy-to-clipboard.

#### Mode B — OCR

- explicit opt-in;
- separate label;
- slower;
- downloads language resources;
- can work on scanned pages;
- marked Beta initially.

### Do not blur the modes

The UI must state:

> Text-based PDF: fast extraction.

> Scanned PDF: OCR is required and results may contain recognition errors.

### Output options

- plain text;
- text with page separators;
- JSON with page number and text blocks;
- copy;
- download.

### Risks

- reading order;
- columns;
- ligatures;
- missing font mapping;
- scanned pages;
- mixed languages;
- rotated text;
- password protection.

### Acceptance criteria

- selectable-text PDFs produce useful text;
- page boundaries retained optionally;
- no extracted content enters analytics;
- OCR resources are loaded only on demand;
- OCR language is user-selected;
- clear error/quality warning.

### SEO content

- difference between text extraction and OCR;
- why copy/paste can be broken;
- supported languages;
- privacy of contracts and records;
- limitations with columns and tables.

---

## 22. Extract Images from PDF

### URL

```text
/tools/extract-images-from-pdf
```

### Primary intent

Save embedded images from a PDF without rendering the entire page.

### Keyword map

Primary:

- extract images from PDF;
- save images from PDF;
- PDF image extractor.

Secondary:

- extract PDF images locally;
- extract original images from PDF;
- download all pictures from PDF;
- no-upload PDF image extractor.

### Important distinction

This tool should attempt to extract embedded raster assets. It is not simply PDF-to-JPG.

Provide fallback:

> No standalone images were found. Convert full pages with PDF to JPG instead.

### Functionality

- list detected images;
- thumbnail;
- dimensions;
- format where identifiable;
- page reference;
- duplicate filtering;
- download individually;
- ZIP all;
- minimum dimension filter.

### Risks

PDF image extraction is complex because:

- images can be tiled;
- masks can be separate;
- color spaces may require conversion;
- some graphics are vector content;
- an apparent image can be composed of multiple objects.

### Acceptance criteria

- common JPEG and PNG-like image objects work;
- masks are handled or excluded clearly;
- duplicate filters are optional;
- unsupported image objects do not crash the tool;
- fallback to page rendering is shown.

---

## 23. Add Page Numbers

### URL

```text
/tools/add-page-numbers-to-pdf
```

### Primary intent

Add pagination to PDF documents.

### Keyword map

Primary:

- add page numbers to PDF;
- number PDF pages;
- PDF pagination.

Secondary:

- add page numbers locally;
- page numbers without upload;
- number legal PDF pages;
- add footer page numbers.

### Functionality

- top/bottom;
- left/center/right;
- page range;
- first number;
- skip cover;
- odd/even styles;
- format:
  - 1
  - Page 1
  - 1 of 10
  - Page 1 of 10;
- font size;
- margin;
- text color;
- live preview.

### Font strategy

Start with a limited set of embedded fonts that support the expected character set.

Do not use a font selector containing system fonts that cannot be reliably embedded.

### Acceptance criteria

- numbers do not clip;
- mixed page sizes work;
- rotation-aware placement;
- page range and offset work;
- preview matches output;
- file remains vector-based.

### Use cases

- legal bundles;
- reports;
- submissions;
- printed handouts;
- academic documents.

---

## 24. Crop PDF

### URL

```text
/tools/crop-pdf
```

### Primary intent

Trim PDF margins or keep a selected region.

### Keyword map

Primary:

- crop PDF;
- trim PDF margins;
- PDF cropper.

Secondary:

- crop PDF locally;
- remove white margins from PDF;
- crop shipping label PDF;
- crop all PDF pages;
- add PDF margins.

### Functionality

- visual crop rectangle;
- apply to current page;
- apply to all pages;
- apply to selected pages;
- numeric margin input;
- copy crop box to other pages;
- reset;
- optional add margins;
- later: auto-crop white margins.

### Coordinate requirements

Must account for:

- CropBox;
- MediaBox;
- page rotation;
- different page sizes;
- user units.

### Acceptance criteria

- crop result matches preview;
- content is not rasterized;
- existing content outside crop is hidden according to PDF box behavior;
- page rotations are handled;
- all/selected page application is accurate.

### SEO use cases

- shipping labels;
- scanned book margins;
- white border removal;
- prepare pages for printing;
- crop a certificate or receipt.

---

## 25. Resize PDF Pages

### URL

```text
/tools/resize-pdf-pages
```

### Primary intent

Change PDF paper size and scale or position content.

### Keyword map

Primary:

- resize PDF pages;
- change PDF page size;
- PDF to A4;
- resize PDF to Letter.

Secondary:

- change PDF paper size locally;
- make all PDF pages same size;
- add margins to PDF;
- scale PDF content;
- PDF A4 to Letter.

### Modes

1. **Change page canvas only**
2. **Scale content to fit**
3. **Fill page and crop**
4. **Center without scaling**
5. **Add margins**
6. **Normalize mixed page sizes**

### Presets

- A4;
- A3;
- A5;
- US Letter;
- US Legal;
- Tabloid;
- custom width/height;
- portrait/landscape.

### Acceptance criteria

- output page dimensions are exact;
- preserve aspect ratio by default;
- scale and crop behavior is previewed;
- mixed-size pages normalize correctly;
- vector content remains vector.

### Important naming

Avoid calling this „compress PDF“. Page-size normalization and file-size reduction are separate tasks.

---

## 26. N-up PDF

### URL

```text
/tools/n-up-pdf
```

### Primary intent

Place several PDF pages on one sheet for printing.

### Keyword map

Primary:

- multiple PDF pages per sheet;
- N-up PDF;
- PDF pages per sheet.

Secondary:

- 2 pages per sheet PDF;
- 4 pages per sheet PDF;
- print PDF handouts;
- combine PDF pages on one page;
- N-up PDF locally.

### Functionality

- 2-up;
- 4-up;
- 6-up;
- 8-up;
- 9-up;
- 16-up;
- output sheet size;
- portrait/landscape;
- page order across/down;
- margins;
- spacing/gutter;
- borders;
- page labels;
- optional blank fill.

### Acceptance criteria

- correct reading order;
- correct page scaling;
- no clipping;
- printable output;
- mixed page sizes fit;
- preview shows one representative sheet.

### Content opportunities

- save paper;
- print presentation handouts;
- proof sheets;
- booklet-related explanation;
- difference between N-up and booklet imposition.

Do not call it a full booklet maker unless booklet ordering and duplex logic are implemented.

---

## 27. Compress PDF — Beta

### URL

```text
/tools/compress-pdf
```

### Why it belongs in Tier 2, not Tier 1

Search demand is high, but local compression is technically and commercially risky.

A PDF can contain:

- already compressed images;
- vector graphics;
- fonts;
- object streams;
- duplicate resources;
- scans;
- forms;
- embedded files;
- metadata.

A simple library save operation often produces little or no reduction. Full-page rasterization can reduce or increase size and destroys selectable text and vectors.

### Recommended V1 scope

Offer two explicit strategies:

#### A. Safe optimization

- remove unused objects where possible;
- deduplicate selected resources where supported;
- normalize metadata;
- compress uncompressed streams;
- preserve vector content and selectable text;
- expected savings may be small.

#### B. Image-heavy compression

- detect image-heavy or scanned PDFs;
- recompress page images;
- resolution presets:
  - Email;
  - Balanced;
  - Print;
- warn that quality can change.

### Do not present

- guaranteed percentage;
- „lossless“ unless technically verified;
- universal high compression;
- exact parity with server-side Ghostscript/Acrobat.

### Output screen

Show:

- original size;
- output size;
- percentage change;
- strategy used;
- quality warning;
- retain original recommendation.

### Stop condition

If output is larger:

> This PDF was already efficiently compressed. The optimized result is larger, so we recommend keeping the original.

### Technology decision gate

Before implementation, run a benchmark across at least:

- scanned PDF;
- presentation PDF;
- text report;
- image portfolio;
- form PDF;
- mixed office export;
- already optimized PDF;
- large PDF.

Compare:

- pdf-lib rewrite;
- qpdf-based WASM candidate;
- commercial/AGPL engine options;
- image recompression pipeline.

### Acceptance criteria

- never silently produce a larger output as success;
- no hidden rasterization;
- quality mode clearly explained;
- original text remains selectable in Safe mode;
- output tested in common readers;
- license review complete.

---

# PART D — SEO IMPLEMENTATION

## 28. Search intent and page differentiation

### 28.1. Do not collapse all tools into one indexable page

A single `/pdf-tools` application with client-side tabs will not give each task enough:

- title relevance;
- H1 relevance;
- specific content;
- link target;
- snippet optimization;
- query reporting.

Use shared code but unique URLs.

### 28.2. Avoid duplicate pages

Examples of potential duplication:

- `/merge-pdf`
- `/combine-pdf`
- `/join-pdf`

Recommended:

- one canonical tool page `/tools/merge-pdf`;
- secondary wording inside the copy;
- guides only when they solve a genuinely distinct scenario.

### 28.3. Do not create thin OS pages immediately

Avoid mass-generating:

```text
/merge-pdf-on-windows
/merge-pdf-on-mac
/merge-pdf-on-iphone
/merge-pdf-on-android
```

First include platform-specific instructions inside the main page.

Create a separate platform page only if:

- workflow is genuinely different;
- page includes device-specific UI;
- Search Console shows demand;
- content is not a paraphrased duplicate.

---

## 29. Internal linking specification

### 29.1. Hub links

`/pdf-tools` links to every tool page with descriptive anchors.

### 29.2. Tool-to-tool links

Each tool page links to 3–5 closest next actions.

Example:

**Merge PDF**

- Reorder pages before merging;
- Delete unwanted pages;
- Split the merged PDF later;
- Convert images to PDF.

### 29.3. Contextual anchors

Good:

- merge PDF files locally;
- extract selected PDF pages;
- convert PDF pages to PNG;
- add page numbers.

Weak:

- click here;
- learn more;
- best free secure private no-upload PDF merger.

### 29.4. Breadcrumbs

Example:

```text
Home > PDF Tools > Organize PDF > Merge PDF
```

Use visible breadcrumbs and `BreadcrumbList` structured data.

### 29.5. Homepage priority

Homepage should link directly to:

- Merge PDF;
- Split PDF;
- PDF to JPG;
- Images to PDF;
- Organize PDF;
- All Tools.

Tier 2 tools can initially sit one level deeper.

---

## 30. On-page content template

### 30.1. H1 and intro

One H1 only.

Example:

> Merge PDF Files Locally

Intro:

> Combine multiple PDF files directly in your browser. Your documents stay on your device and are never uploaded to LocalPDF.

### 30.2. How-to section

Use numbered steps, matching actual UI.

Example:

1. Select PDF files.
2. Drag them into the required order.
3. Click Merge PDF.
4. Download the combined document.

### 30.3. Feature section

Use specific capabilities, not generic adjectives.

Bad:

> Fast, easy and powerful.

Good:

> Reorder files before merging, preserve original page sizes and download one PDF without rasterizing its contents.

### 30.4. Use-case section

Use 3–5 relevant examples.

### 30.5. Limitations section

This is a trust and quality advantage.

Examples:

- existing digital signatures may become invalid after editing;
- password-protected files require the password;
- very large files depend on available device memory;
- OCR can contain recognition errors;
- image conversion removes selectable text.

### 30.6. FAQ

FAQ should answer real product questions.

Do not add FAQ solely to obtain a rich result. Google no longer displays FAQ rich results broadly for ordinary commercial sites, but FAQs can still improve relevance and user understanding.

---

## 31. Structured data

Recommended:

### Site-wide

- `Organization`;
- `WebSite`;
- `BreadcrumbList`.

### Tool pages

- `SoftwareApplication` or `WebApplication`;
- `Offer` only when pricing is real;
- `AggregateRating` only with genuine qualifying reviews;
- no fabricated ratings.

Example conceptual fields:

```json
{
  "@type": "WebApplication",
  "name": "LocalPDF Merge PDF",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any modern web browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

Validate with Google Rich Results Test and Schema.org validator.

Structured data helps search engines understand the page but does not guarantee a rich result or ranking increase.

---

## 32. Technical SEO requirements

### 32.1. Rendering

All SEO-critical content must be available in initial HTML:

- title;
- meta description;
- H1;
- intro;
- how-to content;
- FAQ;
- internal links;
- structured data.

The converter itself may hydrate client-side.

Preferred:

- static generation or server rendering;
- progressive enhancement;
- no dependency on interaction to reveal core text.

### 32.2. Crawlability

- standard `<a href>` links;
- no navigation implemented only through click handlers;
- no blocked JavaScript required for rendering content;
- no accidental `noindex`;
- canonical self-reference;
- HTTP 200 for live pages;
- 301 for renamed URLs;
- custom 404 page with tool navigation.

### 32.3. Sitemap

Generate sitemap entries for:

- tool pages;
- guides;
- policy/trust pages;
- localized versions.

Do not include:

- temporary result URLs;
- Blob URLs;
- query-state variants;
- internal previews;
- duplicate aliases;
- noindex pages.

### 32.4. Robots

Verify:

- `/robots.txt` exists;
- CSS/JS needed for rendering are not blocked;
- sitemap location is listed;
- temporary processing paths are not crawlable.

### 32.5. Canonicals

Every indexable tool page has self-canonical.

State parameters must canonicalize to clean URL:

```text
/tools/pdf-to-jpg?dpi=300
→ canonical /tools/pdf-to-jpg
```

### 32.6. Status and redirects

- retired tool → 301 to closest equivalent;
- temporary outage → 503 with Retry-After, not soft 404;
- invalid dynamic path → 404;
- do not redirect every missing URL to homepage.

---

## 33. Core Web Vitals and performance

Google’s current recommended good thresholds include:

- LCP ≤ 2.5 s;
- INP ≤ 200 ms;
- CLS ≤ 0.1.

### 33.1. LCP

- tool shell must load without full PDF engine;
- no large hero video;
- local font or system font;
- optimize logo;
- preload only critical resources;
- do not load HEIC/PDF/OCR WASM on homepage unless used.

### 33.2. INP

Heavy PDF work must run in Worker.

Avoid:

- rendering all thumbnails synchronously;
- drag interactions that trigger expensive reflow;
- state updates for every canvas pixel;
- ZIP generation on main thread.

### 33.3. CLS

- reserve tool area height;
- reserve ad slots;
- do not insert privacy banners above content after load;
- fixed thumbnail aspect placeholders;
- stable progress area;
- avoid late-loading font swaps.

### 33.4. Performance budgets

Suggested initial budgets:

```text
Tool landing initial JS:
- target < 170 KB gzip
- hard warning > 250 KB gzip

Tool-specific lazy chunk:
- PDF.js chunk accepted separately
- pdf-lib chunk accepted separately
- OCR language data excluded from normal bundle

Initial page:
- no PDF engine execution until user action
```

### 33.5. Field measurement

Use:

- Search Console Core Web Vitals;
- CrUX/PageSpeed;
- real-user `web-vitals` collection;
- breakdown by tool, device and country.

---

## 34. Privacy and trust pages

### 34.1. `/security`

Explain:

- processing model;
- memory lifecycle;
- third-party scripts;
- analytics boundaries;
- ads boundaries;
- dependency hosting;
- encryption limitations;
- vulnerability reporting contact.

### 34.2. `/guides/verify-files-are-not-uploaded`

Show users how to:

1. Open browser DevTools.
2. Open Network.
3. Clear existing requests.
4. Select a test PDF.
5. Run the tool.
6. Verify that the PDF bytes are not transmitted.

Be precise:

- the page itself may make analytics, consent or advertising requests;
- the selected document must not be included in those requests.

### 34.3. Offline mode

If supported:

> After the required app assets are cached, selected tools can work without an internet connection.

Do not claim full offline support if:

- ads require network;
- OCR model is not cached;
- first tool use loads a library;
- Safari storage eviction removes cached assets.

---

## 35. International SEO

### Recommended sequence

1. English;
2. Spanish;
3. German;
4. French;
5. Portuguese;
6. Italian;
7. Polish;
8. Bulgarian.

This sequence should be adjusted using actual Search Console geography.

### Requirements

- dedicated URLs;
- full translation of UI and content;
- localized title/H1;
- hreflang;
- `x-default`;
- localized internal links;
- no automatic redirect based only on IP;
- user-controlled language switch;
- canonical to the same-language page, not English.

Example:

```text
/en/tools/merge-pdf
/es/herramientas/unir-pdf
/de/tools/pdf-zusammenfuegen
```

Alternative: keep English at root and locale prefixes for translations. Choose once and remain consistent.

---

# PART E — CONTENT AND AUTHORITY

## 36. Content strategy

The tool pages are the primary SEO assets. Guides support them.

### 36.1. Priority trust guides

1. How Local PDF Processing Works
2. How to Verify a PDF Is Not Uploaded
3. Local vs Cloud PDF Tools
4. Browser Memory Limits for Large PDFs
5. What Happens to Digital Signatures When You Edit a PDF
6. PDF to JPG vs PDF to PNG
7. Why PDF Compression Sometimes Makes a File Larger

These pages can earn links because they explain real technical issues.

### 36.2. High-intent use-case guides

- Merge invoices into one PDF;
- Combine bank statements securely;
- Split a PDF for email attachment limits;
- Remove blank pages from a scanned PDF;
- Extract one page from a contract;
- Convert a PDF page to a high-resolution image;
- Add page numbers to a legal document;
- Crop a shipping label PDF;
- Convert mixed PDF page sizes to A4;
- Print multiple PDF pages per sheet.

### 36.3. Content rules

Every guide must:

- solve a specific task;
- show LocalPDF workflow;
- include limitations;
- link to the relevant tool;
- avoid pretending to be independent review content;
- avoid generic AI-generated filler;
- have a real screenshot or diagram where useful;
- state last reviewed date.

### 36.4. What not to publish

- 100 near-identical „on Windows/Mac/iPhone“ pages;
- fake comparison reviews;
- auto-generated city/location pages;
- pages targeting typo variants;
- empty glossary pages;
- content unrelated to PDF tasks only to chase traffic.

---

## 37. Digital PR and backlinks

### 37.1. Linkable assets

The strongest potential link assets are:

- open technical privacy explanation;
- interactive “verify no upload” demo;
- local vs cloud benchmark;
- browser PDF performance benchmark;
- transparent dependency and license page;
- offline PWA;
- open-source verification component;
- public changelog;
- sample test corpus and compatibility results.

### 37.2. Distribution

Relevant channels:

- Product Hunt;
- AlternativeTo;
- GitHub;
- Hacker News, only when there is a technically interesting release;
- privacy and security communities;
- productivity newsletters;
- legal/accounting/education workflow guides;
- browser and WebAssembly communities;
- relevant tool directories.

### 37.3. Firmify cross-reference

Firmify can provide relevant editorial links through guides such as:

- how to combine company-registration documents into one PDF;
- how to prepare scanned business documents;
- how to convert photographed documents to PDF without cloud upload.

This is contextually stronger than a generic sitewide reciprocal link.

### 37.4. StoryKind cross-reference

Only where relevant:

- printable activity packs;
- convert completed worksheets/photos into PDF;
- teacher resources.

Do not use StoryKind primarily as an SEO link source for LocalPDF.

---

# PART F — HOMEPAGE AND CONVERSION UX

## 38. Homepage revision

### Recommended order

1. Hero
2. Popular tools
3. Privacy proof
4. Tool categories
5. How it works
6. Why local processing
7. Use cases
8. FAQ
9. More products from our team
10. Footer

### Remove/move

Move „Also by the maker“ from its current early position to:

- footer;
- or after FAQ.

### Hero after Tier 1

**H1**

> Private PDF Tools — Process Files on Your Device

**Subheading**

> Merge, split, organize and convert PDF files directly in your browser. No uploads, no account and no watermark.

**Primary CTA**

> Choose a PDF Tool

**Secondary CTA**

> Convert Images to PDF

### Popular tools

- Merge PDF;
- Split PDF;
- PDF to JPG;
- Images to PDF;
- Organize PDF;
- Compress PDF only after it is stable.

---

## 39. Advertising considerations

Ads must not undermine tool trust or Core Web Vitals.

### Recommended placements

- after successful output;
- between content sections below the tool;
- desktop sidebar only when it does not reduce workspace;
- guide pages after meaningful content.

### Avoid

- above the converter;
- between file selection and action;
- near Download buttons;
- fake download visual treatment;
- popups before completion;
- expanding ad slots;
- auto-refresh that shifts layout.

### Privacy copy

Separate file privacy from advertising privacy:

> Your selected files are processed locally and are not uploaded. Advertising and analytics providers may process device or browsing data according to your consent choices.

---

# PART G — ANALYTICS AND KPI

## 40. Event specification

### Discovery

```text
tool_page_view
tool_category_click
internal_tool_link_click
guide_to_tool_click
```

### Product funnel

```text
file_picker_open
file_selected
file_validation_error
processing_started
processing_progress
processing_cancelled
processing_completed
processing_failed
output_downloaded
new_task_started
related_tool_opened
```

### Recommended properties

```text
tool_slug
locale
device_class
file_count_bucket
file_size_bucket
page_count_bucket
output_count_bucket
processing_duration_bucket
error_code
selected_preset
source_page_type
```

### Do not collect

- filenames;
- extracted text;
- document metadata;
- passwords;
- page previews;
- user file contents.

---

## 41. SEO KPI framework

### 41.1. Indexation

- submitted URLs;
- indexed URLs;
- excluded URLs;
- crawl errors;
- canonical mismatch;
- rendered content check.

### 41.2. Visibility

Per tool:

- impressions;
- clicks;
- CTR;
- average position;
- number of queries;
- non-brand clicks;
- top countries;
- mobile vs desktop.

### 41.3. Product quality

- file-selection rate;
- processing start rate;
- completion rate;
- error rate;
- download rate;
- median processing duration;
- cancellation rate;
- repeat tool usage;
- related-tool click-through.

### 41.4. Recommended benchmark targets

These are product targets, not ranking guarantees.

#### Tier 1 tool quality

- processing completion: >90% for supported test files;
- download after completion: >80%;
- unexpected error: <3%;
- mobile crash/error: <5%;
- tool-to-tool continuation: >8%;
- indexed pages: 100% of intended tool URLs;
- no critical CWV regression.

#### Organic leading indicators

- impressions increasing across non-brand queries;
- each tool ranking for multiple query variants;
- long-tail queries appearing before broad head terms;
- increasing clicks to tool pages rather than homepage only;
- more pages receiving organic clicks each month.

---

## 42. Reporting dashboard

Weekly:

- tool errors;
- completion rate;
- Search Console indexing;
- CWV regressions.

Monthly:

- clicks/impressions by tool;
- query clusters;
- country/device mix;
- pages moving into positions 4–20;
- internal-link clicks;
- backlinks;
- top content-assisted tool entries.

Quarterly:

- Tier prioritization;
- localization decisions;
- monetization tests;
- content pruning;
- library and browser support review.

---

# PART H — DELIVERY ROADMAP

## 43. Recommended build sequence

### Phase 0 — Foundation

- `/pdf-tools` hub;
- new navigation;
- shared tool-page template;
- structured data;
- sitemap;
- analytics events;
- privacy/security copy;
- shared Worker infrastructure;
- common PDF test fixtures.

### Phase 1 — Shared page organizer engine

Build reusable capabilities:

- load PDF;
- thumbnail virtualization;
- selection;
- drag reorder;
- rotate;
- delete;
- export.

This unlocks:

- Reorder;
- Rotate;
- Delete;
- Extract;
- part of Split;
- page-level Merge.

### Phase 2 — Tier 1 organize cluster

Launch:

1. Merge PDF
2. Split PDF
3. Rotate PDF
4. Reorder PDF Pages
5. Delete PDF Pages
6. Extract PDF Pages

### Phase 3 — Tier 1 conversion cluster

Launch:

7. PDF to JPG
8. PDF to PNG

### Phase 4 — Tier 2 document preparation

Launch:

1. Add Page Numbers
2. Crop PDF
3. Resize PDF Pages
4. N-up PDF

### Phase 5 — Tier 2 extraction

Launch:

5. PDF to Text
6. Extract Images from PDF

### Phase 6 — Compression experiment

- benchmark;
- licensing decision;
- Safe vs Image-heavy modes;
- Beta page;
- quality and output-size telemetry;
- no broad promotion until stable.

---

## 44. Relative engineering effort

| Component | Effort | Shared value |
|---|---:|---:|
| PDF loading and validation | M | Very high |
| Thumbnail virtualization | L | Very high |
| Page selection model | M | Very high |
| Reorder via drag/touch/keyboard | L | Very high |
| Merge | S–M | High |
| Split/range parser | M | High |
| Rotate | S | High |
| Delete | S | High |
| Extract | S–M | High |
| PDF to JPG/PNG worker renderer | M–L | High |
| ZIP output | S–M | Medium |
| Page numbers | M | Medium |
| Crop UI and box math | L | Medium |
| Resize/scaling | L | Medium |
| N-up layout engine | L | Medium |
| Text extraction | M | Medium |
| OCR | L | Medium |
| Embedded image extraction | L–XL | Medium |
| Compression | XL | High but risky |

---

## 45. Definition of Done for every tool

A tool is complete only when all categories pass.

### Product

- primary task works;
- output is downloadable;
- cancel and retry work;
- errors are understandable;
- mobile workflow is usable;
- accessibility basics pass.

### Privacy

- no document upload;
- no filename/content in analytics;
- dependencies reviewed;
- network behavior tested;
- privacy copy accurate.

### SEO

- unique title;
- unique H1;
- unique meta description;
- server-rendered content;
- canonical;
- sitemap entry;
- breadcrumbs;
- internal links;
- structured data validated;
- page returns 200.

### Performance

- tool library lazy-loaded;
- heavy work in Worker;
- no major CLS;
- no main-thread freeze during test workflow;
- memory cleanup confirmed.

### Quality

- fixture test set;
- common browsers tested;
- corrupt/encrypted file behavior tested;
- output opens in multiple readers;
- limitations documented.

### Analytics

- funnel events fire;
- no sensitive properties;
- error codes actionable;
- dashboard page grouping configured.

---

# PART I — TESTING

## 46. PDF fixture library

Create an internal fixture set containing:

1. simple text PDF;
2. scanned PDF;
3. mixed page sizes;
4. mixed portrait/landscape;
5. 100+ page PDF;
6. PDF with forms;
7. PDF with annotations;
8. digitally signed PDF;
9. password-protected PDF;
10. corrupted/truncated PDF;
11. PDF with transparency;
12. PDF with embedded JPEG;
13. PDF with image masks;
14. PDF with vector diagrams;
15. non-Latin text PDF;
16. very large page dimensions;
17. already optimized PDF;
18. image-heavy brochure;
19. PDF with bookmarks;
20. PDF/A sample.

Do not upload confidential real-user documents into the test suite.

---

## 47. Browser test matrix

| Browser | Desktop | Mobile | Priority |
|---|---:|---:|---:|
| Chrome | Yes | Android | P0 |
| Safari | macOS | iOS/iPadOS | P0 |
| Edge | Windows | — | P0 |
| Firefox | Windows/macOS/Linux | Android optional | P1 |
| Samsung Internet | — | Android | P2 |

Test:

- file selection;
- drag/drop;
- touch reorder;
- Worker behavior;
- large-file memory;
- ZIP download;
- Blob download;
- offline cached mode;
- cancellation;
- page preview.

---

# PART J — FINAL PRIORITIES

## 48. What to build first

### Highest priority

1. Shared organizer workspace
2. Merge PDF
3. Split PDF
4. Reorder PDF Pages
5. Delete PDF Pages
6. Rotate PDF
7. Extract PDF Pages
8. PDF to JPG
9. PDF to PNG
10. `/pdf-tools` hub and homepage repositioning

### Second priority

1. Add Page Numbers
2. Crop PDF
3. Resize PDF Pages
4. PDF to Text
5. N-up PDF
6. Extract Images
7. Compress PDF Beta

### Do not prioritize yet

- editable PDF to Word;
- PDF to Excel;
- editable PDF to PowerPoint;
- Office to PDF with fidelity claims;
- MOBI/AZW3;
- hundreds of programmatic landing pages;
- AI PDF chat before the core tools rank and work reliably.

---

## 49. 90-day execution plan

This is a prioritization framework, not a traffic guarantee.

### Days 1–30

- technical SEO audit;
- Search Console baseline;
- `/pdf-tools`;
- navigation and homepage changes;
- page template;
- organizer core;
- Merge and Rotate MVP;
- privacy verification guide;
- analytics event schema.

### Days 31–60

- Split;
- Reorder;
- Delete;
- Extract;
- internal linking;
- first trust/use-case guides;
- browser fixture testing;
- initial outreach.

### Days 61–90

- PDF to JPG;
- PDF to PNG;
- performance optimization;
- Search Console query review;
- update titles/copy based on impressions;
- begin Add Page Numbers and Crop PDF;
- localization decision using actual traffic.

---

## 50. Decision rules after launch

### Build more tools when

- Tier 1 completion is stable;
- new pages are indexed;
- relevant impressions are growing;
- users continue to related tools;
- technical support load is manageable.

### Improve existing pages when

- impressions grow but CTR is low;
- average positions are 4–20;
- file selection is low;
- completion is low;
- a competitor clearly answers intent better.

### Do not add new pages when

- existing tool output is unreliable;
- pages are not indexed due technical issues;
- Core Web Vitals are poor;
- content is mostly duplicated;
- there is no distinct search intent.

---

# 51. Final recommendation

LocalPDF should not try to become a full Adobe replacement immediately.

The strongest strategy is:

> **Own the reliable, privacy-first browser PDF workflow.**

The product should first dominate a coherent set of tasks:

- merge;
- split;
- reorder;
- rotate;
- delete;
- extract;
- PDF to JPG;
- PDF to PNG;
- images to PDF.

This creates:

- multiple organic landing pages;
- strong internal linking;
- repeat usage;
- a clear brand category;
- defensible trust positioning;
- a foundation for ads, Pro features and future localization.

The key competitive advantage will not be the number of tools. It will be the combination of:

1. reliable output;
2. immediate use;
3. browser-local processing;
4. transparent privacy;
5. fast UX;
6. honest limitations;
7. excellent task-specific landing pages.

---

# 52. Research sources

## LocalPDF

1. LocalPDF homepage — https://local2pdf.com/

## Competitor product research

2. PDFResizer — https://pdfresizer.com/  
3. PDFResizer Merge — https://pdfresizer.com/merge  
4. PDFResizer Split — https://pdfresizer.com/split  
5. PDFResizer Crop — https://pdfresizer.com/crop  
6. PDFResizer Rotate — https://pdfresizer.com/rotate  
7. PDFResizer Resize — https://pdfresizer.com/resize  
8. PDFResizer N-up — https://pdfresizer.com/multipage  
9. Drawboard Merge — https://www.drawboard.com/tools/merge-pdfs  
10. Drawboard Split — https://www.drawboard.com/tools/split-pdf  
11. Drawboard Rotate — https://www.drawboard.com/tools/rotate-pages  
12. Drawboard PDF to JPG — https://www.drawboard.com/tools/convert-pdf-to-jpg  
13. Drawboard PDF to PNG — https://www.drawboard.com/tools/convert-pdf-to-png  
14. PDFgear Merge — https://www.pdfgear.com/merge-pdf/  
15. PDFgear Split — https://www.pdfgear.com/split-pdf/  
16. PDFgear Delete Pages — https://www.pdfgear.com/delete-pdf-pages/  
17. PDFgear Extract Pages — https://www.pdfgear.com/extract-pdf-pages/  
18. Smallpdf — https://smallpdf.com/  
19. Smallpdf Merge — https://smallpdf.com/merge-pdf  
20. Smallpdf Split — https://smallpdf.com/split-pdf  
21. Smallpdf Organize — https://smallpdf.com/organize-pdf  
22. Smallpdf PDF to JPG — https://smallpdf.com/pdf-to-jpg  
23. iLovePDF — https://www.ilovepdf.com/  
24. iLovePDF Merge — https://www.ilovepdf.com/merge_pdf  
25. iLovePDF Split — https://www.ilovepdf.com/split_pdf  
26. iLovePDF PDF to JPG — https://www.ilovepdf.com/pdf_to_jpg  
27. iLovePDF Add Page Numbers — https://www.ilovepdf.com/add_pdf_page_number  
28. PDF24 tools — https://tools.pdf24.org/  
29. Sejda Organize — https://www.sejda.com/organize-pdf  
30. Sejda Crop — https://www.sejda.com/crop-pdf  
31. Sejda N-up — https://www.sejda.com/n-up-pdf  
32. Adobe Merge PDF — https://www.adobe.com/acrobat/online/merge-pdf.html  
33. Adobe Split PDF — https://www.adobe.com/acrobat/online/split-pdf.html  
34. Adobe PDF to JPG — https://www.adobe.com/acrobat/online/pdf-to-jpg.html  
35. EmbedPDF browser merge — https://www.embedpdf.com/tools/pdf-merge  

## Google Search and performance guidance

36. Google Search Essentials — https://developers.google.com/search/docs/essentials  
37. SEO Starter Guide — https://developers.google.com/search/docs/fundamentals/seo-starter-guide  
38. Crawlable links — https://developers.google.com/search/docs/crawling-indexing/links-crawlable  
39. JavaScript SEO basics — https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics  
40. Sitemaps — https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview  
41. Core Web Vitals and Search — https://developers.google.com/search/docs/appearance/core-web-vitals  
42. Page experience — https://developers.google.com/search/docs/appearance/page-experience  
43. Mobile-first indexing — https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing  
44. SoftwareApplication structured data — https://developers.google.com/search/docs/appearance/structured-data/software-app  
45. Organization structured data — https://developers.google.com/search/docs/appearance/structured-data/organization  
46. Web Vitals thresholds — https://web.dev/articles/vitals  

## Browser and PDF implementation sources

47. PDF.js examples — https://mozilla.github.io/pdf.js/examples/  
48. PDF.js getting started — https://mozilla.github.io/pdf.js/getting_started/  
49. pdf-lib — https://pdf-lib.js.org/  
50. MDN Web Workers — https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API  
51. MDN File System API — https://developer.mozilla.org/en-US/docs/Web/API/File_System_API  
52. JSZip limitations — https://stuk.github.io/jszip/documentation/limitations.html  
53. Tesseract.js — https://github.com/naptha/tesseract.js/  
54. MuPDF.js — https://mupdf.com/mupdf-js  
55. MuPDF licensing/package information — https://www.npmjs.com/package/mupdf  
56. Ghostscript licensing — https://ghostscript.readthedocs.io/  
57. qpdf — https://github.com/qpdf/qpdf  

## Public market/traffic indicators

58. Semrush Smallpdf overview — https://www.semrush.com/website/smallpdf.com/overview/  
59. Similarweb Smallpdf overview — https://www.similarweb.com/website/smallpdf.com/  
60. Ahrefs Smallpdf overview — https://ahrefs.com/websites/smallpdf.com  
61. Semrush PDFguru overview — https://www.semrush.com/website/pdfguru.com/overview/  

---

**End of specification**
