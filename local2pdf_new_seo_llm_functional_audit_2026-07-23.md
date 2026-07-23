# Local2PDF — нов SEO, LLM/GEO и функционален одит

**Одитиран сайт:** [local2pdf.com](https://local2pdf.com/)  
**Дата:** 23 юли 2026 г.  
**Версия на доклада:** 3.0  
**Основна цел:** повишаване на органичния трафик, видимостта в AI/LLM отговори, доверието, техническите рейтинги и реалната надеждност на новите PDF инструменти.

---

## 1. Резюме

Local2PDF вече не е само image-to-PDF инструмент. На живия сайт вече са публикувани:

### Tier 1

- Merge PDF
- Split PDF
- PDF to JPG
- PDF to PNG
- Rotate PDF
- Reorder PDF Pages
- Delete PDF Pages
- Extract PDF Pages

### Tier 2

- PDF to Text
- Extract Images from PDF
- Add Page Numbers
- Crop PDF
- Resize PDF Pages
- N-up PDF
- Compress PDF

Това е голяма положителна промяна. Продуктовата структура вече може да поддържа сериозен SEO растеж.

Основният проблем вече не е липсата на инструменти, а следното:

1. **Новите страници са live, но не се появиха при точните `site:` проверки, направени по време на одита.**
2. **Title елементите на новите страници дублират бранда:**  
   `... | Local2PDF | Local2PDF`
3. **Сайтът използва едновременно LocalPDF и Local2PDF.**
4. **Старите image pages използват различен header, footer и branding от новите PDF pages.**
5. **Privacy и Terms още описват продукта като image-to-PDF converter.**
6. **Част от новите функции имат неточни или противоречиви обещания.**
7. **Няма публично видими About, Contact, Security, Compatibility и Changelog страници.**
8. **Реалната коректност на output файловете не може да се счита за сертифицирана без fixture-based automated QA.**

---

# 2. Как са изчислени оценките

Няма официален универсален „SEO score“ или „LLM score“.

Оценките по-долу са вътрешен audit модел. Те са предназначени за:

- сравнение във времето;
- приоритизиране;
- измерване на прогреса;
- откриване на слаби зони.

Те **не са официални оценки от Google, OpenAI, Ahrefs, Semrush или Lighthouse**.

## 2.1. SEO readiness модел

| Компонент | Тежест |
|---|---:|
| Crawlability и indexation | 20% |
| Titles, canonicals и metadata | 15% |
| On-page relevance и content | 15% |
| Information architecture и internal linking | 15% |
| Trust и entity signals | 15% |
| Performance и accessibility | 10% |
| External authority | 10% |

## 2.2. LLM/GEO readiness модел

| Компонент | Тежест |
|---|---:|
| Достъпност за search/AI crawlers | 20% |
| Entity clarity | 20% |
| Answerability | 20% |
| Trust и consistency | 15% |
| Citation-worthiness | 15% |
| External corroboration | 10% |

## 2.3. Functional confidence модел

| Компонент | Тежест |
|---|---:|
| Точност на публичното обещание | 20% |
| Покритие на основния use case | 20% |
| Ясни ограничения и error states | 15% |
| Performance readiness | 15% |
| Cross-browser и mobile readiness | 15% |
| Automated fixture evidence | 15% |

Когато output файл не е независимо тестван, оценката е обозначена като **provisional**.

---

# 3. Текущи оценки

| Област | Текуща оценка | Цел след P0/P1 | Дългосрочна цел |
|---|---:|---:|---:|
| **Общ SEO readiness** | **61/100** | 80/100 | 90+/100 |
| Technical SEO | 58/100 | 84/100 | 93/100 |
| On-page SEO | 70/100 | 84/100 | 91/100 |
| Indexation и discoverability | 42/100 | 78/100 | 90/100 |
| Information architecture | 77/100 | 88/100 | 94/100 |
| Internal linking | 68/100 | 85/100 | 92/100 |
| Content depth | 61/100 | 79/100 | 88/100 |
| Trust / E-E-A-T | 40/100 | 73/100 | 88/100 |
| External authority | 27/100 | 45/100 | 75/100 |
| **LLM/GEO readiness** | **49/100** | 72/100 | 86/100 |
| Entity clarity | 43/100 | 78/100 | 90/100 |
| Answerability | 74/100 | 87/100 | 93/100 |
| Citation-worthiness | 31/100 | 65/100 | 84/100 |
| OpenAI Search readiness | 55/100 | 82/100 | 90/100 |
| Google AI Search readiness | 58/100 | 81/100 | 91/100 |
| Product claim consistency | 54/100 | 85/100 | 94/100 |
| Functional quality confidence | **52/100 provisional** | 78/100 | 92/100 |
| Performance score | **Не е независимо измерен** | Lighthouse CI | ≥90 target |
| Accessibility score | **Не е независимо измерен** | axe + Lighthouse | ≥95 target |

---

# 4. Какво се е подобрило

## 4.1. Homepage позиционирането е разширено

Новият H1 е:

> Private PDF Tools — Process Files on Your Device

Homepage вече показва:

- Merge PDF;
- Split PDF;
- PDF to JPG;
- Images to PDF;
- Reorder PDF Pages;
- Rotate PDF.

Това е правилната посока.

## 4.2. Има централен All Tools hub

URL:

```text
/pdf-tools
```

Hub-ът разделя инструментите в логични категории:

- Organize PDF;
- Convert from PDF;
- Improve and Prepare PDF;
- Convert Images to PDF.

Това е силна SEO и UX основа.

## 4.3. Tier 1 и Tier 2 имат отделни URL-и

Това позволява:

- отделни search intents;
- уникални title/H1;
- собствена Search Console статистика;
- директни backlinks;
- AI citations към конкретната функция;
- по-добра вътрешна архитектура.

## 4.4. Страниците съдържат initial HTML content

При live прегледа се виждат:

- H1;
- интро;
- инструкции;
- FAQ или supportive sections;
- internal links.

Това е по-добре от client-only tool shell.

---

# 5. Критични SEO проблеми

## 5.1. Дублиран brand suffix в title-ите

Новите страници се показват с titles като:

```text
Merge PDF Locally — Private, No Upload | Local2PDF | Local2PDF
```

```text
All PDF Tools — Edit, Convert & Organize PDFs Locally | Local2PDF | Local2PDF
```

Това вероятно е резултат от:

- глобален metadata template;
- page-level title, който вече съдържа `| Local2PDF`.

## Решение

Ако layout има:

```ts
title: {
  default: "Local2PDF",
  template: "%s | Local2PDF"
}
```

page metadata трябва да бъде:

```ts
title: "Merge PDF Locally — Private, No Upload"
```

а не:

```ts
title: "Merge PDF Locally — Private, No Upload | Local2PDF"
```

## Приоритет

**P0**

## Очакван ефект

- по-чист SERP title;
- по-добър CTR;
- по-ясен brand;
- избягване на title rewriting;
- по-висок Lighthouse SEO hygiene.

---

## 5.2. Homepage title не отразява новия продукт

Live H1 позиционира продукта като PDF toolkit, но browser/search title продължава да е близък до:

> Convert Images to PDF Privately and Free

## Препоръчан title

```text
Private PDF Tools — No Upload | Local2PDF
```

Алтернатива:

```text
Free PDF Tools That Work on Your Device | Local2PDF
```

## Препоръчана meta description

> Merge, split, organize and convert PDF files directly in your browser. No uploads, account or watermark. Your documents stay on your device.

---

## 5.3. Новите tool pages не се появиха в точните site searches

По време на одита точните проверки за:

- Merge PDF;
- Split PDF;
- PDF to JPG;
- All PDF Tools;

не върнаха новите URL-и.

В същото време live страниците са достъпни.

Това показва вероятно:

- много скорошен deployment;
- recrawl lag;
- sitemap проблем;
- слаб internal crawl path;
- canonical/noindex проблем;
- search index още държи старото съдържание.

## P0 checklist

```text
[ ] Проверка на всеки URL в Search Console URL Inspection
[ ] Потвърждение: Indexing allowed = Yes
[ ] Потвърждение: User-declared canonical = правилният URL
[ ] Потвърждение: Google-selected canonical = същият URL
[ ] Request indexing
[ ] Добавяне в sitemap.xml
[ ] Link от /pdf-tools
[ ] Link от homepage
[ ] Link от поне 2 related tool pages
[ ] HTTP 200
[ ] Няма soft-404
[ ] Няма robots block
[ ] Няма X-Robots-Tag noindex
```

---

## 5.4. Две различни site architectures

### Новите PDF pages

Показват header с:

- All Tools;
- Merge PDF;
- Split PDF;
- PDF to JPG;
- Privacy;
- Terms.

Използват brand:

> Local2PDF

### Старите image pages

Показват основно:

- LocalPDF;
- Privacy;
- Terms.

Използват brand:

> LocalPDF

Това означава:

- inconsistent internal linking;
- inconsistent entity;
- по-слаб crawl path;
- по-нисък cross-tool discovery;
- два визуално и семантично различни продукта.

## Решение

Всички tool pages трябва да използват един shared layout:

```text
Local2PDF
All Tools
Convert
Organize
Improve
Privacy
```

Footer:

```text
Local2PDF — private PDF tools that process supported files on your device.
```

---

## 5.5. Footer е остарял

На новите PDF страници footer-ът продължава да казва:

> Privacy-first image to PDF converter

Това понижава:

- semantic consistency;
- entity clarity;
- LLM understanding;
- internal relevance;
- trust.

## Нов footer descriptor

> Privacy-first PDF tools that process supported files directly on your device.

---

## 5.6. Privacy Policy е остаряла

Privacy Policy все още казва основно:

> LocalPDF converts your images to PDF entirely in your browser.

Новият продукт обработва:

- input PDF files;
- extracted text;
- page thumbnails;
- generated images;
- ZIP archives;
- modified PDFs.

## Необходима актуализация

Privacy трябва да опише:

- PDF input;
- image input;
- generated outputs;
- text extraction;
- clipboard;
- temporary object URLs;
- memory lifecycle;
- local storage;
- service worker;
- browser cache;
- analytics;
- ads;
- error telemetry;
- file metadata;
- passwords;
- OCR, ако бъде добавен;
- third-party dependencies.

---

## 5.7. Terms са остарели

Terms описват услугата като:

> a free web-based tool that converts images to PDF format

Това вече е фактически непълно.

## Ново service description

> Local2PDF is a browser-based toolkit for converting, organizing and modifying supported PDF and image files. Supported processing is performed locally on the user’s device.

Добавете специфични disclaimer-и за:

- digital signatures;
- forms;
- annotations;
- encrypted files;
- large files;
- compression quality;
- OCR errors;
- unsupported PDF features;
- zero-data-loss guarantee — да не се обещава.

---

## 5.8. Няма публичен Contact

Privacy и Terms казват:

> contact us through the information provided on our website

Но footer-ът не показва contact email.

## P0 решение

Създайте:

```text
/contact
```

и публикувайте:

```text
support@local2pdf.com
privacy@local2pdf.com
security@local2pdf.com
```

Посочете legal operator.

---

## 5.9. Лимитът от 25 pages е неясно scoped

Homepage показва:

> Free: up to 25 pages per conversion.

Но Merge page казва, че няма hard limit.

Потребителят и LLM могат да разберат, че всички PDF инструменти са ограничени до 25 страници.

## Решение

На homepage:

> Image-to-PDF: up to 25 images per conversion. PDF tools use device-dependent limits.

На всяка tool page:

- конкретен limit;
- или „No fixed limit; performance depends on available memory.“

Не използвайте глобално limit statement, ако не важи за всички функции.

---

# 6. On-page content audit

## 6.1. Силни страни

- Primary keyword обикновено е в H1.
- Интрото дава директен отговор.
- Privacy differentiator се вижда.
- Стъпките са кратки.
- Част от страниците имат FAQ.
- PDF to JPG/PNG/Text имат полезни explanatory sections.

## 6.2. Слаби страни

Много pages съдържат само:

- H1;
- едно изречение;
- dropzone;
- 3 стъпки;
- 2 FAQ.

Това е достатъчно за MVP, но недостатъчно за:

- long-tail coverage;
- AI citations;
- user objections;
- troubleshooting;
- topical authority;
- editorial backlinks.

## 6.3. Препоръчана page template

Всяка Tier 1 page:

1. H1;
2. 40–80 word direct answer;
3. tool;
4. output/next action;
5. how-to;
6. exact supported behavior;
7. common use cases;
8. limits;
9. signed/encrypted PDF notes;
10. browser/device notes;
11. FAQ;
12. related tools;
13. technical privacy link;
14. last tested date.

## 6.4. Пример за direct-answer block

> Local2PDF Merge PDF combines two or more PDF documents directly in browser memory. The selected documents are not uploaded to Local2PDF servers. You can change their order, create one output PDF and download it to your device.

Това помага на:

- classic search;
- featured snippets;
- ChatGPT Search;
- AI Overviews;
- Perplexity;
- browser agents.

---

# 7. LLM/GEO анализ

## 7.1. Важно: Google не изисква специален „GEO hack“

Официалната Google guidance за generative AI search казва:

- основното SEO продължава да е релевантно;
- страницата трябва да бъде crawlable и indexed;
- ценното, уникално съдържание е по-важно от специални AI трикове;
- Google не използва `llms.txt` като ranking или inclusion signal;
- няма специален AI schema.

Следователно:

> Най-добрият начин Local2PDF да увеличи Google AI visibility е да подобри нормалното SEO, indexation, content и authority.

---

## 7.2. OpenAI Search

OpenAI използва `OAI-SearchBot` за включване на сайтове в ChatGPT Search.

Проверете:

```txt
User-agent: OAI-SearchBot
Allow: /
```

Решението за GPTBot може да бъде независимо:

```txt
User-agent: GPTBot
Disallow: /
```

Това позволява ChatGPT Search discovery, без непременно да разрешавате training crawler.

Не разчитайте само на robots.txt:

- проверете WAF;
- CDN bot protection;
- JavaScript challenges;
- 403/429;
- IP allowlisting;
- crawler logs.

---

## 7.3. `llms.txt`

Препоръка:

- може да бъде добавен;
- не е задължителен;
- не го включвайте като Google ranking factor;
- не очаквайте директно увеличение на Google позиции;
- използвайте го като clean navigation resource за агенти, които го поддържат.

## Пример

```md
# Local2PDF

> Local2PDF is a privacy-first browser PDF toolkit. Supported files are processed on the user's device and are not uploaded to Local2PDF servers.

## Official information

- [About](https://local2pdf.com/about)
- [Security](https://local2pdf.com/security)
- [Privacy](https://local2pdf.com/privacy)
- [All PDF Tools](https://local2pdf.com/pdf-tools)
- [Compatibility](https://local2pdf.com/compatibility)
- [Changelog](https://local2pdf.com/changelog)

## Core tools

- [Merge PDF](https://local2pdf.com/tools/merge-pdf)
- [Split PDF](https://local2pdf.com/tools/split-pdf)
- [PDF to JPG](https://local2pdf.com/tools/pdf-to-jpg)
- [PDF to PNG](https://local2pdf.com/tools/pdf-to-png)
- [Image to PDF](https://local2pdf.com/tools/image-to-pdf)
```

---

## 7.4. Entity inconsistency

В момента live сайтът съдържа:

- Local2PDF;
- LocalPDF;
- footer-и с LocalPDF;
- titles с LocalPDF;
- нови pages с Local2PDF;
- стар search result title с LocalPDF.

Това е проблем за:

- Google site name;
- ChatGPT citations;
- knowledge/entity matching;
- branded search;
- external directories.

## Решение

Изберете един canonical brand:

> **Local2PDF**

Използвайте го навсякъде:

```text
<title>
logo alt
H1 brand references
footer
Privacy
Terms
About
Organization schema
WebSite schema
Open Graph
Twitter cards
manifest
Product Hunt
GitHub
social accounts
support emails
```

Добавете:

> Local2PDF was previously presented as LocalPDF.

само временно на About page.

---

## 7.5. Entity collision

Search results съдържат много несвързани „LocalPDF“ продукти:

- localpdf.online;
- local-pdf.com;
- LocalPDF Studio;
- mobile apps;
- други browser toolkits.

Local2PDF е по-различимо, но е сходно с Online2PDF.

## Допълнителна entity формула

> Local2PDF by Firmify

или:

> Local2PDF, operated by Firmify EOOD

Не е необходимо Firmify да бъде основният consumer brand, но legal relation трябва да бъде ясна.

---

## 7.6. Липсва entity home

Създайте:

```text
/about
```

Съдържание:

| Поле | Отговор |
|---|---|
| Product | Local2PDF |
| Official URL | https://local2pdf.com/ |
| Operator | точният legal entity |
| Country | Bulgaria |
| Processing model | browser-local |
| File upload | No, for listed supported tools |
| Account | Not required |
| Watermark | No |
| Pricing | current accurate model |
| Support | official email |
| Security contact | official email |
| Last verified | date |

---

## 7.7. Citation-worthiness е ниска

Текущият сайт прави marketing claims, но публикува малко оригинални доказателства.

## Добавете

1. Browser Compatibility Matrix
2. Tested PDF Fixtures
3. Performance Benchmarks
4. No-upload Network Verification
5. Known Limitations
6. Changelog
7. Security Architecture
8. Dependency List
9. License List
10. Accessibility statement

## Пример за добра citation-worthy информация

> Tested on Chrome 132, Firefox 134, Safari 19 and Edge 132 using a 100-page mixed-size PDF. Merge preserved all page dimensions and completed without network requests containing document bytes.

Публикувайте само реални резултати.

---

# 8. Structured data

Структурираните данни не са директна ranking гаранция, но подобряват machine understanding и eligibility за подходящи rich results.

## 8.1. Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://local2pdf.com/#organization",
  "name": "Local2PDF",
  "url": "https://local2pdf.com/",
  "legalName": "LEGAL ENTITY",
  "logo": "https://local2pdf.com/icons/icon-512.png",
  "description": "Privacy-first PDF tools that process supported files directly on the user's device.",
  "email": "support@local2pdf.com"
}
```

## 8.2. WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://local2pdf.com/#website",
  "name": "Local2PDF",
  "url": "https://local2pdf.com/",
  "publisher": {
    "@id": "https://local2pdf.com/#organization"
  }
}
```

## 8.3. WebApplication

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://local2pdf.com/tools/merge-pdf#application",
  "name": "Local2PDF Merge PDF",
  "url": "https://local2pdf.com/tools/merge-pdf",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any modern web browser",
  "isAccessibleForFree": true,
  "description": "Merge PDF files locally in the browser without uploading the selected documents.",
  "publisher": {
    "@id": "https://local2pdf.com/#organization"
  }
}
```

## 8.4. BreadcrumbList

```text
Home > PDF Tools > Organize PDF > Merge PDF
```

## 8.5. Не използвайте

- fake ratings;
- fake reviews;
- fake download counts;
- функции, които не са налични;
- невидими FAQ;
- неточна цена.

---

# 9. Функционален одит по инструмент

## Легенда

- **Page SEO:** качество на landing страницата.
- **Functional confidence:** оценка според видимите обещания; не е byte-level сертификация.
- **Risk:** риск от разминаване между обещание и output.
- **QA status:** какво още трябва да се провери.

---

## 9.1. Merge PDF

**URL:** `/tools/merge-pdf`

| Показател | Оценка |
|---|---:|
| Page SEO | 76/100 |
| Functional confidence | 70/100 provisional |
| Risk | Medium |

### Положително

- добър primary intent;
- ясно local-processing обещание;
- reorder across documents;
- добри основни стъпки;
- FAQ за file size и page reorder.

### Проблеми

- няма информация за encrypted PDFs;
- няма информация за digital signatures;
- няма информация за bookmarks;
- няма информация за forms и annotations;
- няма visible related-tools section;
- title е с дублиран brand;
- footer е остарял.

### Задължителни QA тестове

```text
[ ] mixed page dimensions
[ ] forms
[ ] annotations
[ ] bookmarks
[ ] signed PDF
[ ] encrypted PDF
[ ] corrupt PDF
[ ] 20 files
[ ] 500 pages
[ ] mobile memory
[ ] no rasterization
[ ] no file-byte network request
```

### Copy addition

> Merging modifies the document structure and can invalidate existing digital signatures.

---

## 9.2. Split PDF

**URL:** `/tools/split-pdf`

| Показател | Оценка |
|---|---:|
| Page SEO | 72/100 |
| Functional confidence | 68/100 provisional |
| Risk | Medium |

### Положително

- supports custom ranges;
- individual or ZIP output;
- clear transactional intent.

### Проблеми

- step използва „Upload your PDF“, което противоречи на no-upload claim;
- не е ясно дали `1-3,5,8-10` създава 3 files или един combined output;
- няма range preview;
- няма error examples;
- няма empty/overlap rules.

### Fix

Променете:

> Upload your PDF

на:

> Select your PDF

### Range UX

Показвайте preview:

```text
Output 1: pages 1–3
Output 2: page 5
Output 3: pages 8–10
```

---

## 9.3. PDF to JPG

**URL:** `/tools/pdf-to-jpg`

| Показател | Оценка |
|---|---:|
| Page SEO | 79/100 |
| Functional confidence | 74/100 provisional |
| Risk | Low–Medium |

### Положително

- DPI guidance;
- quality control;
- clear JPG vs PNG section;
- direct related links;
- privacy explanation.

### Проблеми

- не е ясно дали могат да се избират pages;
- няма dimension preview;
- няма estimated output size;
- няма max safe DPI;
- няма transparent background behavior;
- няма color profile note;
- „Canvas API“ не описва PDF parser-а.

### Препоръки

- page range;
- 96/150/200/300 DPI presets;
- estimated dimensions;
- sequential rendering;
- cancel;
- ZIP filename preview;
- memory warning.

---

## 9.4. PDF to PNG

**URL:** `/tools/pdf-to-png`

| Показател | Оценка |
|---|---:|
| Page SEO | 78/100 |
| Functional confidence | 75/100 provisional |
| Risk | Low–Medium |

### Положително

- ясно distinction от JPG;
- подходящо за text/diagrams;
- lossless output.

### Проблеми

- „lossless“ е вярно за PNG encoding, но не означава, че оригиналният PDF е запазен без промяна;
- PDF се rasterize-ва;
- text, vectors и links се губят като интерактивни елементи;
- transparency behavior не е обяснен.

### Copy fix

> PNG encoding is lossless, but each PDF page is rasterized into an image. Text and vector objects are no longer editable or selectable.

---

## 9.5. Rotate PDF

**URL:** `/tools/rotate-pdf`

| Показател | Оценка |
|---|---:|
| Page SEO | 73/100 |
| Functional confidence | 76/100 provisional |
| Risk | Low–Medium |

### Положително

- selected/batch page rotation;
- lossless claim;
- clear task.

### Проблеми

- metadata rotation трябва да се тества с:
  - CropBox;
  - annotations;
  - forms;
  - scanned page orientation;
  - already rotated pages.
- няма odd/even selection;
- няма undo/redo description.

### QA

```text
[ ] 90/180/270 normalization
[ ] annotations remain aligned
[ ] links remain aligned
[ ] mixed rotation document
[ ] repeated rotate operations
```

---

## 9.6. Reorder PDF Pages

**URL:** `/tools/reorder-pdf-pages`

| Показател | Оценка |
|---|---:|
| Page SEO | 61/100 |
| Functional confidence | 58/100 provisional |
| Risk | Medium–High |

### Критично несъответствие

Title и hub казват:

> Drag and drop

Но инструкцията казва:

> Use the arrow buttons to move pages left or right.

Не е ясно дали drag-and-drop реално е наличен.

## Решение

### Ако drag работи

Променете инструкцията:

> Drag pages into the desired order. On keyboard or assistive devices, use the move-left and move-right controls.

### Ако drag не работи

Променете title/hub copy и добавете drag като P0 product improvement.

### Необходими функции

- touch drag;
- mouse drag;
- keyboard alternative;
- multi-select group move;
- undo/redo;
- virtualized thumbnail grid.

---

## 9.7. Delete PDF Pages

**URL:** `/tools/delete-pdf-pages`

| Показател | Оценка |
|---|---:|
| Page SEO | 59/100 |
| Functional confidence | 48/100 provisional |
| Risk | High |

### Критичен проблем

FAQ казва:

> You can proceed but the result will be an empty PDF.

Zero-page PDF може да бъде проблематичен за PDF readers, validators и downstream tools.

## Решение

Не позволявайте output с 0 pages.

Покажете:

> A PDF must contain at least one page. Restore one page or cancel the operation.

### UX подобрение

Не изисквайте Start Over за undo.

Използвайте:

- soft deleted state;
- Restore;
- Undo;
- Clear selection.

---

## 9.8. Extract PDF Pages

**URL:** `/tools/extract-pdf-pages`

| Показател | Оценка |
|---|---:|
| Page SEO | 69/100 |
| Functional confidence | 70/100 provisional |
| Risk | Medium |

### Положително

- combined output;
- separate output;
- ZIP;
- clear intent.

### Проблеми

- selected order не е обяснен;
- filename rules не са показани;
- няма range input;
- няма relation to Split/Delete.

### Подобрение

Добавете comparison block:

| Tool | Use it when |
|---|---|
| Extract | искате само избраните pages |
| Delete | искате да премахнете нежеланите pages |
| Split | искате няколко output groups |

---

## 9.9. PDF to Text

**URL:** `/tools/pdf-to-text`

| Показател | Оценка |
|---|---:|
| Page SEO | 81/100 |
| Functional confidence | 72/100 provisional |
| Risk | Medium |

### Най-добре описан Tier 2 tool

Положително:

- ясно казва, че извлича embedded text;
- не обещава OCR;
- обяснява scanned PDF limitation;
- има TXT output.

### Рискове

- reading order;
- multi-column PDFs;
- tables;
- ligatures;
- non-Latin text;
- RTL;
- hidden text;
- duplicated text layers.

### Препоръки

- page separators optional;
- copy to clipboard;
- page range;
- plain/structured mode;
- JSON developer mode;
- language/encoding test suite;
- clear „layout may not be preserved“.

---

## 9.10. Extract Images from PDF

**URL:** `/tools/extract-images-from-pdf`

| Показател | Оценка |
|---|---:|
| Page SEO | 42/100 |
| Functional confidence | 38/100 |
| Risk | **Critical** |

### Основен проблем

Инструментът не извлича embedded images.

FAQ признава:

> This tool renders each PDF page to a high-resolution PNG.

Това е **PDF to PNG**, не „Extract Images from PDF“.

Така се създават:

- misleading product claim;
- user disappointment;
- keyword cannibalization с PDF to PNG;
- нисък trust;
- негативни AI summaries;
- риск от high bounce.

## Вариант A — rename

Преименувайте на:

> Render PDF Pages as High-Resolution PNG

Но вече има PDF to PNG, затова вероятно страницата трябва да бъде обединена с него.

## Вариант B — implement true extraction

True extractor трябва да:

- detect image XObjects;
- recover JPEG/JPX data where possible;
- handle masks;
- handle tiled images;
- expose page number;
- expose dimensions;
- distinguish vector graphics;
- ZIP original assets;
- explain unsupported cases.

## Препоръка

**P0: временно noindex или 301 към PDF to PNG, докато не бъде реализирано истинско image extraction.**

---

## 9.11. Add Page Numbers

**URL:** `/tools/add-page-numbers-to-pdf`

| Показател | Оценка |
|---|---:|
| Page SEO | 67/100 |
| Functional confidence | 65/100 provisional |
| Risk | Medium |

### Положително

- position;
- alignment;
- format;
- font size;
- color;
- start page.

### Проблеми

- използва „Upload your PDF“;
- не е ясно как се обработват rotated pages;
- няма font list;
- няма non-Latin support;
- няма preview description;
- няма margin collision warning.

### Fix

- „Select your PDF“;
- live page preview;
- safe-area indicator;
- skip cover;
- first displayed number separate from first numbered page;
- `Page 1 of N`;
- embedded font testing.

---

## 9.12. Crop PDF

**URL:** `/tools/crop-pdf`

| Показател | Оценка |
|---|---:|
| Page SEO | 59/100 |
| Functional confidence | 58/100 provisional |
| Risk | Medium–High |

### Положително

- Beta label;
- ясно казва, че visual crop още няма;
- numeric margin crop е реална функция.

### Проблеми

- page title обещава general Crop PDF;
- „pages are resized“ може да означава промяна на MediaBox;
- не е ясно дали content се clipping-ва или физически се transform-ва;
- няма preview;
- няма per-page crop;
- няма validation за negative/oversized margins.

## Препоръчано временно име

> Trim PDF Margins Locally

Когато има visual selection, върнете:

> Crop PDF Pages Locally

---

## 9.13. Resize PDF Pages

**URL:** `/tools/resize-pdf-pages`

| Показател | Оценка |
|---|---:|
| Page SEO | 54/100 |
| Functional confidence | 45/100 provisional |
| Risk | High |

### Критично противоречие

FAQ казва:

> It scales the entire page content proportionally...

и веднага:

> Content may be stretched if the aspect ratio changes.

Ако е proportional, content не трябва да бъде stretched.

## Трябва да има отделни modes

### Fit / Contain

- preserve aspect ratio;
- no clipping;
- empty margins possible.

### Fill / Cover

- preserve aspect ratio;
- clipping possible;
- no stretching.

### Stretch

- changes aspect ratio;
- distortions;
- трябва да бъде explicit opt-in.

### Center without scaling

- no scaling;
- clipping possible.

### Extend canvas

- adds page area;
- content unchanged.

## P0

Проверете implementation и синхронизирайте copy с реалното поведение.

---

## 9.14. N-up PDF

**URL:** `/tools/n-up-pdf`

| Показател | Оценка |
|---|---:|
| Page SEO | 62/100 |
| Functional confidence | 58/100 provisional |
| Risk | Medium–High |

### Проблем

Intro казва:

> great for ... booklet layouts

Но FAQ описва нормален reading order:

> left to right, top to bottom

Това не е booklet imposition.

Booklet изисква:

- page reordering;
- front/back sheet pairing;
- blank-page insertion;
- duplex edge rules;
- binding direction.

## Fix

Премахнете „booklet layouts“, освен ако booklet mode не е реално имплементиран.

Използвайте:

> handouts, proof sheets and paper-saving print layouts.

---

## 9.15. Compress PDF

**URL:** `/tools/compress-pdf`

| Показател | Оценка |
|---|---:|
| Page SEO | 58/100 |
| Functional confidence | 40/100 provisional |
| Risk | **Critical** |

### Рискови обещания

Страницата казва:

- smart optimization;
- safe compression;
- preserves visual quality;
- re-sampling;
- stream compression.

Resampling по дефиниция може да промени quality.

Не е ясно:

- дали се recompress-ват embedded images;
- дали се rasterize-ват pages;
- дали се премахват fonts;
- дали output може да стане по-голям;
- дали text остава selectable;
- дали signatures/forms се запазват.

## Необходими modes

### Safe optimize

- structural cleanup;
- stream optimization;
- no rasterization;
- text remains selectable;
- малки savings са нормални.

### Image-heavy

- recompress images;
- lower resolution;
- potential quality loss;
- explicit quality preset.

## Output screen

Покажете:

```text
Original: 18.4 MB
Output: 11.2 MB
Saved: 39%
Mode: Image-heavy / Balanced
Text selectable: Yes/No
```

## Stop rule

Ако output е по-голям:

> This PDF is already efficiently compressed. Keep the original.

## Препоръка

Докато няма benchmark:

- оставете Beta;
- не използвайте „smart“;
- не обещавайте preserved quality;
- публикувайте exact methodology;
- обмислете `noindex`, ако failure/output quality е нестабилна.

---

# 10. Cross-tool product inconsistencies

## 10.1. „Upload“ срещу „No upload“

Сменете всички UI и content фрази:

```text
Upload your PDF
```

с:

```text
Select your PDF
Open your PDF
Choose your PDF
```

„Upload“ е стандартна дума, но директно противоречи на основното privacy value proposition.

---

## 10.2. LocalPDF срещу Local2PDF

Направете repository-wide search:

```bash
rg -n "LocalPDF|Privacy-first image to PDF converter|converts images to PDF|Upload your PDF"
```

Очаквано:

- заменете LocalPDF с Local2PDF;
- оставете старото име само в migration statement;
- актуализирайте footer;
- актуализирайте legal pages;
- актуализирайте titles;
- актуализирайте Open Graph;
- актуализирайте manifest.

---

## 10.3. Homepage How It Works е image-only

Homepage вече е PDF toolkit, но How It Works казва:

- select images;
- arrange images;
- convert images.

## Нов generic flow

1. Choose a PDF tool.
2. Select files from your device.
3. Make your changes locally.
4. Download the result.

След това отделна image-to-PDF секция може да запази стария workflow.

---

# 11. Performance и техническа оптимизация

## 11.1. Не е измерен реален Lighthouse score

В този одит не е генериран достоверен PageSpeed/Lighthouse result за сайта.

Не трябва да се публикува измислена Performance оценка.

## Задължителен test command

```bash
npx lighthouse https://local2pdf.com/ \
  --output=json \
  --output=html \
  --output-path=./reports/home
```

Повторете за:

```text
/pdf-tools
/tools/merge-pdf
/tools/split-pdf
/tools/pdf-to-jpg
/tools/reorder-pdf-pages
/tools/compress-pdf
/tools/image-to-pdf
```

## Target

| Category | Target |
|---|---:|
| Performance mobile | ≥90 |
| Accessibility | ≥95 |
| Best Practices | ≥95 |
| SEO | 100 |
| LCP | ≤2.5 s |
| INP | ≤200 ms |
| CLS | ≤0.1 |

---

## 11.2. Lazy loading

Не зареждайте всички engines на всяка route.

### Homepage

Не трябва да зарежда:

- PDF.js;
- pdf-lib;
- HEIC WASM;
- OCR;
- ZIP;
- compression engine.

### Tool page

Заредете UI shell първо.

Engine import:

- при file selection;
- или при idle след visible tool interaction;
- не преди user intent.

---

## 11.3. Web Workers

Следните операции трябва да са извън main thread:

- page rendering;
- image decoding;
- ZIP generation;
- OCR;
- PDF recompression;
- thumbnail generation;
- large merge/split exports.

---

## 11.4. Thumbnail virtualization

За 100+ pages:

- render only visible thumbnails;
- low-res preview;
- release offscreen canvases;
- lazy page decode;
- use stable placeholders;
- avoid storing duplicate full-resolution buffers.

---

## 11.5. Memory safety

```text
[ ] revokeObjectURL
[ ] terminate workers after completion
[ ] clear canvas width/height
[ ] release ArrayBuffers
[ ] sequential page processing
[ ] dynamic DPI warning
[ ] mobile low-memory fallback
[ ] cancel cleans state
[ ] error cleans state
```

---

## 11.6. Network privacy test

В Playwright:

```ts
page.on("request", request => {
  // Record every request after file selection.
});
```

Проверете:

- няма multipart upload;
- няма document bytes;
- няма filename;
- няма extracted text;
- няма page thumbnail;
- няма file metadata в analytics.

---

# 12. Accessibility

PDF tools са interaction-heavy и трябва да бъдат достъпни без drag.

## Checklist

```text
[ ] file dropzone е keyboard actionable
[ ] drag има button alternative
[ ] reorder има move left/right
[ ] multi-select има accessible labels
[ ] progress е aria-live
[ ] error е role=alert
[ ] rotate button включва page number
[ ] delete button включва page number
[ ] thumbnail alt не излага document text
[ ] focus не се губи след rerender
[ ] touch targets ≥44px
[ ] contrast AA
[ ] color не е единственият selection signal
[ ] cancel е keyboard accessible
```

---

# 13. Automated functional QA

## 13.1. Test fixture library

Създайте synthetic PDF fixtures:

```text
01-simple-text.pdf
02-scanned-pages.pdf
03-mixed-page-sizes.pdf
04-mixed-rotation.pdf
05-forms.pdf
06-annotations.pdf
07-links.pdf
08-bookmarks.pdf
09-signed.pdf
10-password-protected.pdf
11-corrupted.pdf
12-500-pages.pdf
13-non-latin.pdf
14-rtl.pdf
15-transparent-images.pdf
16-image-heavy.pdf
17-vector-heavy.pdf
18-already-compressed.pdf
19-zero-metadata.pdf
20-huge-page-dimensions.pdf
```

---

## 13.2. Playwright flow

За всеки tool:

1. open URL;
2. verify H1;
3. attach fixture;
4. verify page count;
5. perform operation;
6. download output;
7. validate output;
8. render output;
9. compare;
10. inspect network;
11. capture screenshot;
12. record duration.

---

## 13.3. Structural output validation

Използвайте:

- qpdf;
- veraPDF за PDF/A, когато е приложимо;
- PDF.js render;
- pdf-lib readback;
- page count;
- MediaBox/CropBox;
- rotation;
- text extraction;
- annotation count;
- form field count.

Пример:

```bash
qpdf --check output.pdf
```

---

## 13.4. Visual comparison

За operations, които не трябва да променят visual content:

- render before;
- render after;
- pixel diff;
- ignore page order/rotation where relevant;
- set tolerance;
- flag regressions.

---

## 13.5. CI gates

Release не се deploy-ва, ако:

```text
P0 fixture fails
network upload detected
output cannot be opened
page count is wrong
zero-page PDF generated
unexpected rasterization occurs
signed/encrypted behavior is undocumented
Lighthouse SEO <100
accessibility critical violation exists
```

---

# 14. Sitemap, robots и canonical

Тези root files не бяха независимо прочетени в текущата среда и трябва да се проверят ръчно.

## 14.1. robots.txt

Минимално:

```txt
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

Sitemap: https://local2pdf.com/sitemap.xml
```

GPTBot policy според вашето решение:

```txt
User-agent: GPTBot
Disallow: /
```

## 14.2. Sitemap

Включете:

- homepage;
- `/pdf-tools`;
- всички stable tools;
- About;
- Security;
- Privacy;
- Terms;
- Guides;
- Changelog.

Не включвайте:

- output URLs;
- query state;
- blob URLs;
- beta pages с `noindex`;
- duplicate aliases.

## 14.3. Canonical

Всеки tool:

```html
<link rel="canonical" href="https://local2pdf.com/tools/merge-pdf">
```

Query presets:

```text
/tools/pdf-to-jpg?dpi=300
```

canonical към:

```text
/tools/pdf-to-jpg
```

---

# 15. Internal linking specification

## Homepage

Link директно към:

- All PDF Tools;
- Merge;
- Split;
- PDF to JPG;
- Image to PDF;
- Reorder;
- Rotate.

## Tool pages

Всеки page → 3–5 related tools.

### Merge

- Reorder;
- Delete;
- Split;
- Image to PDF.

### Split

- Extract;
- Delete;
- Merge.

### PDF to JPG

- PDF to PNG;
- JPG to PDF;
- Extract Images, само след истинска implementation.

### Resize

- Crop;
- N-up;
- Add Page Numbers.

## Старите image pages

Добавете shared navigation към:

- All PDF Tools;
- Merge;
- Split;
- PDF to JPG.

---

# 16. Content roadmap

## P0 trust content

1. How Local Processing Works
2. How to Verify Files Are Not Uploaded
3. Browser Compatibility
4. Known Limitations
5. Product Changelog

## P1 high-intent content

1. Merge confidential PDFs without uploading
2. Split a PDF for email attachments
3. Remove blank pages from a scanned PDF
4. Extract one page from a contract
5. PDF to JPG vs PNG
6. Add page numbers to a legal bundle
7. Resize mixed PDF pages to A4
8. Print multiple PDF pages per sheet

## P2 citation assets

1. Browser PDF benchmark
2. 100-page performance report
3. Privacy network trace
4. PDF compatibility test corpus
5. Compression methodology and benchmark

---

# 17. External authority

Current external authority за exact domain/brand изглежда ниска.

## Добри канали

- Product Hunt;
- AlternativeTo;
- privacy tool directories;
- productivity newsletters;
- web/WASM communities;
- Hacker News само при технически интересен release;
- GitHub verification tool;
- accounting/legal guides;
- Bulgarian tech media;
- Firmify contextual articles.

## Не правете

- paid spam links;
- mass directory submissions;
- reciprocal footer networks;
- fake Reddit recommendations;
- fake reviews;
- AI-generated comparison spam.

---

# 18. Cross-reference с Firmify и StoryKind

## Firmify → Local2PDF

Има силна тематична връзка:

- combine company documents;
- prepare registry attachments;
- scan invoices;
- merge bank statements;
- convert photos to PDF.

Използвайте contextual editorial links.

## StoryKind → Local2PDF

Само при:

- printable worksheets;
- teacher packs;
- photos of completed activities;
- PDF preparation.

## Local2PDF → другите продукти

Само във footer/„Products from our team“.

Не преди How It Works и не около primary tool CTA.

---

# 19. 30/60/90-дневен план

## Първите 14 дни — P0

```text
[ ] Fix duplicate title suffix
[ ] Update homepage title
[ ] Unify Local2PDF branding
[ ] Unify all layouts/navigation
[ ] Update Privacy
[ ] Update Terms
[ ] Add Contact
[ ] Add About
[ ] Add Security
[ ] Scope 25-page limit
[ ] Replace Upload copy
[ ] Fix Reorder drag/arrow inconsistency
[ ] Block zero-page PDF
[ ] Rename/noindex Extract Images
[ ] Fix Resize behavior/copy
[ ] Remove booklet claim
[ ] Rewrite Compress claims
[ ] Submit sitemap
[ ] Inspect every URL in Search Console
```

## До 30 дни

```text
[ ] WebApplication schema
[ ] Organization/WebSite schema
[ ] Breadcrumbs
[ ] Related tool links
[ ] Compatibility page
[ ] Changelog
[ ] Network privacy test
[ ] Playwright Tier 1 suite
[ ] Lighthouse CI
[ ] axe accessibility CI
[ ] five technical guides
```

## До 60 дни

```text
[ ] Tier 2 fixture suite
[ ] real compression benchmark
[ ] true image extraction or redirect
[ ] visual crop
[ ] output metrics
[ ] performance optimization
[ ] external launch
[ ] directory profiles
[ ] Firmify contextual content
```

## До 90 дни

```text
[ ] Search Console query analysis
[ ] improve pages positions 4–20
[ ] internationalization decision
[ ] Spanish/German pilot
[ ] public benchmark
[ ] public compatibility matrix
[ ] Pro/no-ads experiment
[ ] quarterly AI answer audit
```

---

# 20. KPI

## SEO

- indexed Tier 1 URLs;
- non-brand impressions;
- non-brand clicks;
- average position;
- CTR;
- number of queries per tool;
- pages receiving organic clicks;
- branded Local2PDF searches;
- AI feature impressions;
- ChatGPT referral sessions.

## Product

- file selected;
- processing started;
- processing completed;
- output downloaded;
- related tool opened;
- repeat task;
- error rate;
- cancel rate;
- processing duration;
- crash/memory failure.

## Privacy-safe event properties

```text
tool_slug
device_class
file_count_bucket
file_size_bucket
page_count_bucket
duration_bucket
error_code
preset
```

Никога:

```text
filename
file content
extracted text
PDF metadata
password
thumbnail
page image
```

---

# 21. Target scores след изпълнение

## След P0

| Област | Очаквана readiness |
|---|---:|
| Technical SEO | 78–84 |
| On-page SEO | 78–83 |
| Entity clarity | 70–78 |
| Trust | 65–73 |
| LLM readiness | 65–72 |
| Functional claim accuracy | 80+ |

## След P1/P2

| Област | Очаквана readiness |
|---|---:|
| Overall SEO | 85–91 |
| LLM/GEO | 80–87 |
| Trust | 83–90 |
| Internal linking | 90+ |
| Content authority | 82–88 |
| Functional confidence | 88–94 |

Тези стойности са readiness targets, не обещание за Google positions.

---

# 22. Най-важните 10 действия

1. Поправете всички `| Local2PDF | Local2PDF` titles.
2. Уеднаквете LocalPDF → Local2PDF.
3. Актуализирайте Privacy и Terms за целия toolkit.
4. Проверете индексацията на всеки нов tool.
5. Добавете About, Contact, Security и Compatibility.
6. Премахнете или реализирайте истински „Extract Images“.
7. Забранете zero-page output.
8. Поправете Resize и N-up обещанията.
9. Създайте Playwright + qpdf fixture QA.
10. Публикувайте технически доказателства за no-upload и reliability.

---

# 23. Заключение

Local2PDF вече има значително по-силен продукт от предишната версия.

Структурата от 15+ инструмента е достатъчна за изграждане на topical authority и за съществен ръст на organic traffic.

Но сайтът в момента е между две фази:

> Старият image-to-PDF продукт и новият full PDF toolkit съществуват едновременно.

Това се вижда в:

- branding;
- navigation;
- footer;
- Privacy;
- Terms;
- titles;
- indexing;
- copy;
- product claims.

Най-важната задача не е да добавите още инструменти.

Най-важната задача е:

> Да направите вече публикуваните инструменти последователни, индексируеми, доказано надеждни и правилно описани.

След P0 и automated QA Local2PDF ще има много по-силна основа за:

- Google Search;
- Google AI Overviews/AI Mode;
- ChatGPT Search;
- editorial backlinks;
- trust;
- advertising;
- Pro conversion.

---

# 24. Основни източници

## Local2PDF

- [Homepage](https://local2pdf.com/)
- [All PDF Tools](https://local2pdf.com/pdf-tools)
- [Merge PDF](https://local2pdf.com/tools/merge-pdf)
- [Split PDF](https://local2pdf.com/tools/split-pdf)
- [PDF to JPG](https://local2pdf.com/tools/pdf-to-jpg)
- [PDF to PNG](https://local2pdf.com/tools/pdf-to-png)
- [Rotate PDF](https://local2pdf.com/tools/rotate-pdf)
- [Reorder PDF Pages](https://local2pdf.com/tools/reorder-pdf-pages)
- [Delete PDF Pages](https://local2pdf.com/tools/delete-pdf-pages)
- [Extract PDF Pages](https://local2pdf.com/tools/extract-pdf-pages)
- [PDF to Text](https://local2pdf.com/tools/pdf-to-text)
- [Extract Images from PDF](https://local2pdf.com/tools/extract-images-from-pdf)
- [Add Page Numbers](https://local2pdf.com/tools/add-page-numbers-to-pdf)
- [Crop PDF](https://local2pdf.com/tools/crop-pdf)
- [Resize PDF Pages](https://local2pdf.com/tools/resize-pdf-pages)
- [N-up PDF](https://local2pdf.com/tools/n-up-pdf)
- [Compress PDF](https://local2pdf.com/tools/compress-pdf)
- [Image to PDF](https://local2pdf.com/tools/image-to-pdf)
- [Privacy](https://local2pdf.com/privacy)
- [Terms](https://local2pdf.com/terms)

## Google

- [Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Title links](https://developers.google.com/search/docs/appearance/title-link)
- [Site names](https://developers.google.com/search/docs/appearance/site-names)
- [Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Search Essentials](https://developers.google.com/search/docs/essentials)
- [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview)

## OpenAI

- [Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots)
- [Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)

## Relevant competitors observed in search

- [Adobe Acrobat](https://www.adobe.com/acrobat/online/)
- [Smallpdf](https://smallpdf.com/pdf-tools)
- [PDF24](https://tools.pdf24.org/en/)
- [PDFgear](https://www.pdfgear.com/)
- [Drawboard](https://www.drawboard.com/tools)
- [MaxAI PDF tools](https://www.maxai.co/pdf-tools/)
- [localpdf.online](https://localpdf.online/)
- [local-pdf.com](https://local-pdf.com/)

---

**Край на доклада**
