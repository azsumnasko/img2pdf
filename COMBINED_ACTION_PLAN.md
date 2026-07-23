# Local2PDF — Комбиниран План за Действие

**Сравнение на 3 анализа:**
- Моят кодови анализ (FRESH_ANALYSIS_2026-07-23.md) — Code-level: **82/100**
- Външен одит v3 (local2pdf_new_seo_llm_functional_audit_2026-07-23.md) — Live site: **61/100 SEO, 49/100 LLM**

---

## 1. Ключови Разлики | Code vs Live

⏸️ Някои code-level фиксове ВЕЧЕ са приложени, но не са деплойнати:
- Brand rename LocalPDF → Local2PDF (вече в кода)
- /about, /contact, /security страници (вече в кода)
- Organization + WebSite JSON-LD (вече в кода)
- FAQPage schema на 12 Tier-2 страници (вече в кода)
- JSON-LD на 7 Tier-3 страници (вече в кода)
- Footer с About/Contact/Security (вече в кода)

⚠️ Има проблеми, които са В КОДА и трябва да се поправят:
1. Дублиран title suffix `| Local2PDF | Local2PDF` (шаблон + page-level)
2. Privacy/Terms още описват продукта като image-to-PDF
3. "Upload your PDF" вместо "Select your PDF" в някои страници
4. Extract Images е плейсхолдър (рендерира страници)
5. FAQ на Resize PDF има противоречиви твърдения
6. N-Up PDF споменава "booklet" без реална booklet функционалност

---

## 2. P0 План — Критични Фиксове (1-3 дни)

| # | Задача | Къде | Статус |
|---|---|---|---|
| **1** | **Fix duplicate title suffix** | Всички layout.tsx | ⚠️ Нов проблем |
| 2 | Update Privacy Policy за целия toolkit | src/app/privacy/page.tsx | ⚠️ Нов проблем |
| 3 | Update Terms of Use за целия toolkit | src/app/terms/page.tsx | ⚠️ Нов проблем |
| 4 | Rename/noindex Extract Images (плейсхолдър) | extract-images-from-pdf/ | ⚠️ Критичен |
| 5 | Fix Resize PDF contradictory FAQ | resize-pdf-pages/page.tsx | ⚠️ Нов проблем |
| 6 | Remove "booklet" claim from N-Up | n-up-pdf/page.tsx | ⚠️ Нов проблем |
| 7 | Block zero-page PDF in Delete tool | delete-pdf-pages/page.tsx | ⚠️ Нов проблем |
| 8 | Replace "Upload" → "Select" everywhere | Всички tool pages | ⚠️ Нов проблем |
| 9 | Fix Compress PDF misleading claims | compress-pdf/page.tsx | ⚠️ Нов проблем |
| 10 | Fix Reorder drag/arrow inconsistency | reorder-pdf-pages/page.tsx | ⚠️ Нов проблем |

---

## 3. P1 План — Висок Приоритет (1 седмица)

| # | Задача |
|---|---|
| 11 | Fix homepage How It Works (още е image-only) |
| 12 | Scope 25-page limit message (само за image-to-PDF) |
| 13 | Fix footer на старите image pages (още "image to PDF") |
| 14 | Добави Contact в header nav |
| 15 | Content-Security-Policy header |
| 16 | OG image за социални мрежи |
| 17 | Canonical + OpenGraph на Privacy/Terms |
| 18 | AI bot директиви в robots.txt |
| 19 | `<lastmod>` дати в sitemap |

---

## 4. P2 План — Подобрения (2 седмици)

| # | Задача |
|---|---|
| 20 | Динамичен import на pdf-lib |
| 21 | JSON-LD на content страници (about, contact, security) |
| 22 | Next.js viewport export |
| 23 | Fix package.json name "localpdf" → "local2pdf" |
| 24 | Thumbnail virtualization за 100+ страници |
| 25 | Web Worker за PDF обработка |
| 26 | Automated QA с Playwright + fixtures |
| 27 | Създай /compatibility и /changelog страници |
| 28 | Адресирай entity collision (Local2PDF by Firmify) |

---

## 5. Функционални Фиксове — Детайли

### 5.1. Дублиран Title Suffix
**Проблем:** Root layout има `template: "%s | Local2PDF"`, а всички layout.tsx вече съдържат `| Local2PDF` в title-а си. Резултат: `Merge PDF | Local2PDF | Local2PDF`.
**Фикс:** Махни `| Local2PDF` от всички page-level titles. Next.js template ще го добави автоматично.

### 5.2. Extract Images — Временно Решение
**Проблем:** Инструментът не извлича embedded images — рендерира цели страници като PNG. Това е misleading.
**Фикс:** 
- Добави `robots: { index: false }` в metadata докато не се имплементира истинско extraction
- Добави изпъкващ Beta+Placeholder badge
- FAQ да обяснява чество че това е временно ограничение

### 5.3. Zero-Page PDF Guard
**Проблем:** Delete PDF позволява изтриване на всички страници → празен PDF.
**Фикс:** В `executeDelete` добави проверка: ако всички страници са избрани, покажи грешка вместо да генерираш празен PDF.

### 5.4. "Upload" vs "Select"
**Проблем:** Някои страници използват "Upload your PDF" което противоречи на no-upload claim.
**Фикс:** Replace all "Upload" with "Select" / "Choose" / "Open".

---

## 6. Target Scores

| Област | Code (текущ) | Code (след P0) | Live (след deploy) |
|---|---|---|---|
| SEO | 78/100 | 83/100 | 75/100 |
| LLM/GEO | 80/100 | 85/100 | 78/100 |
| Performance | 82/100 | 85/100 | 80/100 |
| Brand | 95/100 | 100/100 | 95/100 |
| Functional | 13 READY | 13 READY / 3 BETA | 13 READY / 3 BETA |

---

## 7. Резюме

Трите анализа се допълват:
- **Моят кодови анализ** показва какво е ИМПЛЕМЕНТИРАНО в кода
- **Външен одит v2** (първият) показа пълната липса на нови инструменти на live сайта
- **Външен одит v3** (вторият) показа че инструментите са live, но има inconsistency между стария и новия брандинг + UX проблеми

**Приоритет:** P0 фиксовете (10 задачи) → deploy → P1 подобрения (9 задачи) → P2 дългосрочни (9 задачи).
