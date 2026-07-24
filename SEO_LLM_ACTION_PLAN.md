# Local2PDF — SEO & LLM/GEO Action Plan

**3 audit loops completed.** Дата: 23 Юли 2026

---

## Текущи Оценки

| Област | Оценка | Най-голям проблем |
|---|---|---|
| **Content Depth** | 5/10 avg | 13 tools без related links, 23 без Limitations, 16 без Use Cases |
| **LLM/GEO** | 71/100 | sameAs empty, 9 tools без privacy FAQ, 11 без pricing FAQ |
| **Sitemap/Robots** | 7/10 | Няма AI bot directives, no lastmod |
| **Thin Content** | 7 pages | Format landing pages с ~20 реда само |

---

## Какво Оправяме Веднага (High Impact)

### 1. Robots.txt — AI Bot Directives
Добавяме: OAI-SearchBot, GPTBot, Google-Extended

### 2. Related Links на всички 13 Interactive Tools
Всеки инструмент получава 3-5 related-tool линка в долната част

### 3. Privacy + "Is it free?" FAQ на 11 липсващи Tools
Добавяме privacy upload Q&A + free/pricing Q&A към FAQPage на всеки

### 4. sameAs + SearchAction в Organization Schema
Запълваме празния sameAs масив

### 5. llms.txt добавя Quick Facts секция
С entity identity, pricing, limits, supported formats

---

## Какво Остава (Средносрочно)

### Content Depth Upgrade за Top 5 Tools
- merge-pdf (4→7): use cases, limitations, troubleshooting, browser notes
- split-pdf (4→6): use cases, limitations, troubleshooting
- reorder-pdf-pages (3→6): use cases, limitations
- rotate-pdf (4→6): use cases, limitations, key features
- extract-pdf-pages (4→6): use cases, limitations, comparison table

### Нови Страници
- /compatibility — browser support matrix
- /changelog — release history
- /guides/how-local-processing-works

### 7 Thin Format Pages
Опция А: Добави FAQ + Use Cases + Browser notes → Score 4→6
Опция Б: Merge в image-to-pdf с canonical redirect

---

## Приоритет

| # | Задача | Impact | Effort |
|---|---|---|---|
| 1 | AI bot directives в robots.txt | P0 | 2 min |
| 2 | Privacy+Free FAQ на 11 tools | P0 | 15 min |
| 3 | sameAs в Organization schema | P0 | 2 min |
| 4 | Related links на 13 tools | P1 | 30 min |
| 5 | llms.txt Quick Facts | P1 | 10 min |
| 6 | Content depth на top 5 tools | P1 | 2 часа |
| 7 | /compatibility page | P2 | 30 min |
| 8 | /changelog page | P2 | 15 min |
| 9 | 7 thin pages upgrade | P2 | 1 час |
