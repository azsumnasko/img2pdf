# LocalPDF — Анализ и Препоръки за Оптимизация

**Дата:** 23 Юли 2026  
**Версия:** 1.0  
**Обхват:** SEO, Performance, Функционалности, UX, Техническа архитектура

---

## 1. Текущо Състояние — Обща Оценка

| Област | Оценка | Статус |
|---|---|---|
| SEO (общо) | 5.6/10 | Нуждае се от подобрение |
| Performance | 6/10 | Добро, но има пропуски |
| Функционалности | 7/10 | 10 готови, 3 бета, 2 плейсхолдъра |
| Сигурност | 7/10 | Базови хедъри налични, липсват CSP/HSTS |
| Достъпност | 6/10 | Базов WCAG, липсват aria на места |
| Мобилна оптимизация | 7/10 | Responsive, но липсва оптимизация на изображения |

---

## 2. SEO Анализ — Проблеми и Препоръки

### 2.1. Критични Проблеми (Priority P0)

#### A. Начална страница без metadata export
**Файл:** `src/app/page.tsx`  
**Проблем:** Няма `export const metadata` — разчита на root layout defaults. Липсва canonical, openGraph, structured data.  
**Фикс:**
```tsx
export const metadata: Metadata = {
  alternates: { canonical: "https://local2pdf.com" },
  openGraph: {
    title: "LocalPDF — Private PDF Tools & Image to PDF Converter",
    description: "Free PDF tools that work offline in your browser. Merge, split, convert.",
    url: "https://local2pdf.com",
    type: "website",
  },
};
```

#### B. 7 SEO landing страници без structured data
**Файлове:** `jpgs-to-pdf`, `png-to-pdf`, `webp-to-pdf`, `heic-to-pdf`, `combine-images-to-pdf`, `photos-to-pdf`, `screenshot-to-pdf`  
**Проблем:** Нямат JSON-LD (SoftwareApplication, BreadcrumbList).  
**Фикс:** Добави `layout.tsx` за всяка с пълен метаданни + JSON-LD.

#### C. Липсва Organization и WebSite JSON-LD в root layout
**Файл:** `src/app/layout.tsx`  
**Проблем:** Google не може да идентифицира бранда за Knowledge Graph.  
**Фикс:** Добави в `<script type="application/ld+json">`:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LocalPDF",
  "url": "https://local2pdf.com",
  "description": "Private PDF tools that work locally in your browser."
}
```
и WebSite с SearchAction за sitelinks search box.

### 2.2. Висок Приоритет (Priority P1)

#### D. FAQPage schema липсва на 12 Tier-2 страници
**Файлове:** merge-pdf, split-pdf, rotate-pdf, reorder-pdf-pages, delete-pdf-pages, extract-pdf-pages, add-page-numbers, crop-pdf, resize-pdf-pages, n-up-pdf, compress-pdf, extract-images-from-pdf  
**Фикс:** Добави 3-4 релевантни FAQ въпроса с JSON-LD към всеки layout.tsx.

#### E. Липсва `og:image` за социални мрежи
**Проблем:** Нито една страница няма og:image. При споделяне във Facebook/Twitter няма preview картинка.  
**Фикс:** Създай стандартно OG image (1200x630) и го добави в root layout + всички tool layouts.

#### F. Sitemap без `<lastmod>` дати
**Файл:** `public/sitemap.xml`  
**Фикс:** Генерирай sitemap динамично чрез Next.js `generateSitemaps()` с `lastmod` дати от build time.

### 2.3. Среден Приоритет (Priority P2)

#### G. Липсва Twitter card metadata
**Фикс:** Добави `twitter: { card: 'summary_large_image' }` в root metadata.

#### H. Viewport зададен чрез `<meta>` вместо Next.js `viewport` export
**Фикс:** Замени с `export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#2563eb' }`.

#### I. Липсва CollectionPage schema на `/pdf-tools` хъба
**Фикс:** Добави JSON-LD с ItemList на всички инструменти.

---

## 3. Performance Анализ — Проблеми и Препоръки

### 3.1. Критични (P0)

#### A. pdfjs-dist worker зарежда се от CDN
**Файл:** `src/features/pdf-tools/pdf-renderer.ts:9`  
**Проблем:** `cdnjs.cloudflare.com` — при offline режим PDF-to-image инструментите не работят. Нарушава CSP политиките.  
**Фикс:** Копирай `pdf.worker.min.mjs` в `public/` директорията и ползвай локален URL.

#### B. pdf-lib зарежда се статично (500KB gzipped)
**Проблем:** Зарежда се на всяка tool страница, дори когато не е нужен (напр. PDF-to-JPG ползва само pdfjs-dist).  
**Фикс:** Динамичен import с `next/dynamic` или lazy loading само при нужда.

### 3.2. Висок Приоритет (P1)

#### C. Липсва HSTS хедър
**Фикс:** Добави в `next.config.ts`:
```ts
{
  key: "Strict-Transport-Security",
  value: "max-age=63072000; includeSubDomains; preload",
}
```

#### D. Липсва Content-Security-Policy
**Фикс:** Започни с report-only режим и постепенно добави allowlist за ads/analytics.

#### E. Липсва Cache-Control за статични asset-и
**Фикс:** Добави `Cache-Control: public, max-age=31536000, immutable` за `/_next/static/*` пътища.

#### F. Липсва `sharp` за production image optimization
**Фикс:** `npm install sharp` — Next.js го ползва автоматично за `next/image`.

#### G. CLS риск — липсват explicit width/height на `<img>` елементи
**Файлове:** `PageCard.tsx`, `PdfPageGrid.tsx`  
**Фикс:** Добави `width` и `height` атрибути или `aspect-ratio` CSS.

### 3.3. Среден Приоритет (P2)

#### H. Липсва `content-visibility: auto` на below-fold секции
**Фикс:** Добави CSS правило за `.how-it-works`, `.faq`, `.maker-promo`.

#### I. Голям единен CSS файл (1466 реда) без purging
**Фикс:** Мигрирай към Tailwind или CSS Modules за tree-shaking на неизползван CSS.

#### J. Bundle analysis не е конфигуриран
**Фикс:** `npm install -D @next/bundle-analyzer` и анализирай размера на pdfjs-dist/pdf-lib.

---

## 4. Функционален Анализ — Нови Инструменти

### 4.1. Готови (READY) — 10 инструмента

| Инструмент | Статус | Липсващи функции |
|---|---|---|
| Merge PDF | ✅ Готов | Няма опция за унифициране размера на страниците |
| Split PDF | ✅ Готов | По-ясен label за filename prefix |
| Rotate PDF | ✅ Готов | **Липсва "Rotate All" бутон** |
| Reorder Pages | ✅ Готов | Няма keyboard shortcuts |
| Delete Pages | ✅ Готов | Няма "Invert selection" |
| Extract Pages | ✅ Готов | Няма "odd/even" пресети |
| PDF to JPG | ✅ Готов | **Няма page selection — винаги конвертира всички страници** |
| PDF to PNG | ✅ Готов | Няма page selection, няма опция за прозрачен фон |
| PDF to Text | ✅ Готов | Няма page range, няма "copy to clipboard" |
| Add Page Numbers | ✅ Готов | Само Helvetica шрифт, няма live preview, няма odd/even |

### 4.2. Бета/Плейсхолдър (BETA) — 3 инструмента

| Инструмент | Статус | Какво реално прави | Какво трябва |
|---|---|---|---|
| **Resize PDF Pages** | ⚠️ Бета | Само сменя MediaBox без да скалира/центрира съдържание | Имплементирай scale/center/content-transform логика |
| **Crop PDF** | ⚠️ Бета | Намалява размера на страницата (не е истински crop box) | Визуален crop editor с draggable overlay |
| **Compress PDF** | ⚠️ Бета | Safe mode = само metadata; Image-heavy = пълен no-op | Реална image recompression през canvas |

### 4.3. Силно Ограничени (PLACEHOLDER) — 2 инструмента

| Инструмент | Статус | Какво реално прави | Какво трябва |
|---|---|---|---|
| **Extract Images** | 🔴 Плейсхолдър | Рендерира цели страници като PNG (не извлича embedded images) | XObject парсване за истинско извличане на изображения |
| **Crop PDF (визуален)** | 🔴 Плейсхолдър | Няма визуален crop — само margin числа | Пълен визуален crop редактор |

---

## 5. UX Оптимизация

### 5.1. Консистентност между инструментите

**Проблем:** Някои страници ползват `PDF_TOOL_META` за h1/description, други са с hardcoded стрингове.  
**Фикс:** Унифицирай всички tool страници да ползват `PDF_TOOL_META` за заглавия и описания.

**Проблем:** PDF-to-image инструментите нямат page selection (винаги конвертират всички страници).  
**Фикс:** Добави опция за избор на страници (checkbox grid) с "Select all" по подразбиране.

### 5.2. Mobile UX

**Липсва:** Няма специфични mobile оптимизации за някои от новите инструменти.  
**Фикс:** Тествай crop/resize/n-up на mobile и добави touch-friendly контроли.

### 5.3. Достъпност

**Липсващи aria атрибути:**
- `PdfPageGrid` move бутони — само `title`, нямат `aria-label` (вече оправено в кръг 4)
- `FileDropzone` — няма `aria-disabled` когато е disabled (вече оправено)
- Processing state в pdf-to-text няма `role="status" aria-live="polite"`

**Фикс:** Добави aria атрибути на всички интерактивни елементи без текст.

---

## 6. Технически Дълг и Архитектурни Подобрения

### 6.1. Споделен Organizer Engine

**Проблем:** `resizePdfPages()` приема mode параметър но го игнорира. `compressPdf()` image-heavy стратегията е no-op.  
**Фикс:** Имплементирай реалната логика или премахни неработещите опции от UI-то.

### 6.2. Web Worker за тежки операции

**Проблем:** pdf-lib и pdfjs-dist обработката е на main thread. При големи PDF файлове (>50MB) UI-то замръзва.  
**Фикс:** Премести pdf-lib операциите (merge, split, rotate) в Web Worker.

### 6.3. Lazy Loading на библиотеки

**Проблем:** pdf-lib (~500KB) се зарежда статично за всички инструменти.  
**Фикс:** Обвий pdf-lib import с `next/dynamic` и го зареждай само при нужда (при interaction с файл).

### 6.4. Генерация на sitemap

**Проблем:** Статичен sitemap.xml без lastmod дати.  
**Фикс:** Използвай Next.js `generateSitemaps()` за динамична генерация при build.

---

## 7. Приоритизиран Roadmap

### Фаза 1 — Спешно (1-2 седмици)

| # | Задача | Тип |
|---|---|---|
| 1 | Добави metadata export на homepage | SEO P0 |
| 2 | Добави JSON-LD на 7-те Tier-3 страници | SEO P0 |
| 3 | Добави Organization + WebSite schema в root layout | SEO P0 |
| 4 | Bundle pdf.js worker локално (вместо CDN) | Perf P0 |
| 5 | Lazy-load pdf-lib само при нужда | Perf P0 |
| 6 | Добави "Rotate All" бутон в Rotate PDF | UX |
| 7 | Добави page selection в PDF to JPG/PNG | UX |
| 8 | Добави HSTS + Cache-Control хедъри | Perf P1 |

### Фаза 2 — Висока (2-4 седмици)

| # | Задача | Тип |
|---|---|---|
| 9 | Добави FAQPage schema на 12-те Tier-2 страници | SEO P1 |
| 10 | Създай и добави og:image за всички страници | SEO P1 |
| 11 | Динамична sitemap генерация с lastmod | SEO P1 |
| 12 | Имплементирай scale/center логика в resizePdfPages | Feature |
| 13 | Имплементирай реална компресия в compressPdf | Feature |
| 14 | Добави CLS фиксове — explicit image размери | Perf P1 |
| 15 | Премести pdf-lib в Web Worker | Perf |

### Фаза 3 — Средна (4-8 седмици)

| # | Задача | Тип |
|---|---|---|
| 16 | Визуален crop editor за Crop PDF | Feature |
| 17 | Истинско извличане на embedded images (Extract Images) | Feature |
| 18 | Добави CSP хедър (report-only → enforce) | Security |
| 19 | Миграция към Tailwind/CSS Modules | Perf P2 |
| 20 | Bundle analysis и оптимизация на размери | Perf P2 |
| 21 | Добави "copy to clipboard" в PDF to Text | UX |
| 22 | Добави odd/even опции в Add Page Numbers | UX |

---

## 8. Метрики за Проследяване

След всяка фаза, провери:

- **Google Search Console:** Indexed pages ↑, Impressions ↑, Average position ↓
- **Lighthouse:** Performance ≥ 90, SEO = 100, Accessibility ≥ 90
- **Core Web Vitals:** LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
- **Bundle Size:** Initial JS ≤ 180KB gzipped, lazy chunks ≤ 350KB
- **Conversion Funnel:** File selection rate ≥ 45%, Completion rate ≥ 95%

---

## 9. Заключение

Проектът има солидна основа — 10 напълно функционални инструмента, коректна архитектура, privacy-first подход. Основните пропуски са в SEO (липсващи метаданни/structured data), performance (lazy loading на библиотеки, Web Worker), и функционалност (3 бета инструмента се нуждаят от истинска имплементация).

**Обща оценка на проекта: 7.2/10**  
**Цел след имплементация на фаза 1 + 2: 8.5/10**
