# LocalPDF: SEO, LLM/GEO и функционален одит

**Одитиран домейн:** `https://local2pdf.com/`  
**Дата на одита:** 23 юли 2026 г.  
**Език на доклада:** български  
**Версия:** 2.0  
**Основна цел:** увеличаване на органичния трафик, видимостта в AI/LLM отговори, доверието и използването на новите PDF функционалности.

---

## 1. Важно уточнение за оценките

Оценките в този доклад са **вътрешна audit scorecard**, а не официални оценки от Google, OpenAI, Ahrefs, Semrush или друг доставчик.

Няма единен официален „LLM score“. Затова LLM/GEO оценката е съставена от измерими компоненти:

- crawlability;
- entity clarity;
- machine-readable структура;
- answerability;
- citation-worthiness;
- trust и authoritativeness;
- наличие на стабилни факти и доказателства;
- външни споменавания;
- достъп за AI search crawlers.

Функционалният одит е разделен на:

1. **Публична откриваемост и съдържание** — проверени чрез live crawl/search.
2. **Статичен UX и обещания** — проверени чрез публично достъпното HTML съдържание.
3. **Byte-level коректност на генерираните PDF файлове** — не е независимо потвърдена, защото средата за одита не позволява интерактивно качване на тестови файлове и изтегляне на резултатите от browser tool-а.

Следователно твърденията „работи правилно“ в този документ означават само това, което е публично проверимо. За пълна техническа сертификация е необходим автоматизиран QA пакет с реални test fixtures.

---

# 2. Executive summary

## 2.1. Най-важният извод

Към датата на одита търсачките виждат LocalPDF предимно като:

> **image-to-PDF converter**

а не като:

> **privacy-first PDF toolkit**

Публично откриваемите страници са:

- homepage;
- Image to PDF;
- JPG to PDF;
- PNG to PDF;
- WebP to PDF;
- HEIC to PDF;
- Combine Images to PDF;
- Screenshot to PDF;
- Photos to PDF;
- Privacy;
- Terms.

Не бяха открити като публично индексирани страници на `local2pdf.com` основните нови Tier 1 PDF функции от предходния roadmap:

- Merge PDF;
- Split PDF;
- PDF to JPG;
- PDF to PNG;
- Rotate PDF;
- Reorder PDF Pages;
- Delete PDF Pages;
- Extract PDF Pages.

Това означава едно от следните:

1. функциите още не са production-ready;
2. функциите съществуват, но не са линкнати;
3. страниците са client-only и нямат достатъчно indexable HTML;
4. страниците са извън sitemap;
5. имат различни URL адреси;
6. са блокирани от robots/noindex;
7. deployment или canonical конфигурацията не е правилна.

**SEO ефектът на функция, която Google и AI crawler-ите не могат да открият, е практически нулев.**

---

## 2.2. Текущи и целеви оценки

| Област | Текуща оценка | Реалистична цел 30–45 дни | Цел 90–120 дни |
|---|---:|---:|---:|
| Общ SEO readiness | **56/100** | 74/100 | 87/100 |
| Technical SEO | **58/100** | 82/100 | 92/100 |
| On-page SEO | **68/100** | 82/100 | 90/100 |
| Indexation & discoverability | **38/100** | 78/100 | 90/100 |
| Content depth / topical authority | **41/100** | 64/100 | 84/100 |
| Internal linking | **46/100** | 80/100 | 90/100 |
| Core product discoverability | **35/100** | 78/100 | 90/100 |
| LLM/GEO readiness | **43/100** | 68/100 | 85/100 |
| Entity clarity | **29/100** | 67/100 | 84/100 |
| Citation-worthiness | **36/100** | 62/100 | 82/100 |
| Trust / E-E-A-T signals | **42/100** | 70/100 | 86/100 |
| Structured data readiness | **40/100** | 82/100 | 90/100 |
| Current image converter UX, provisional | **72/100** | 84/100 | 90/100 |
| Verified functional quality | **Не е сертифицирана** | QA suite required | 95%+ fixture pass rate |

---

## 2.3. Основните проблеми по приоритет

### P0 — критични

1. Новите PDF функции не са публично откриваеми/индексирани.
2. Homepage продължава да позиционира продукта само като image-to-PDF converter.
3. Няма ясно различима entity identity — „LocalPDF“ е силно претоварено име.
4. Няма видими About, Contact и Security страници.
5. Privacy и Terms насочват към „information provided on our website“, но публичен контакт не се вижда.
6. Липсва силна product taxonomy: Convert, Organize, Improve, Extract.
7. Не е публично потвърдено наличие на правилни sitemap, robots, schema и AI crawler rules.
8. Няма публична test/compatibility матрица, която да доказва надеждност.

### P1 — висок приоритет

1. Част от format страниците са прекалено кратки.
2. Converter страницата има много малко crawlable съдържание.
3. „Also by the maker“ стои твърде високо и разсейва от основната задача.
4. Internal linking е ограничен почти само до image formats.
5. Няма техническо доказателство за „no upload“.
6. Няма стабилни, цитируеми факти, benchmarks или changelog.
7. Няма силно разграничение между файловата privacy и advertising/analytics privacy.
8. Няма видима стратегия за ChatGPT, Google AI Overviews/AI Mode и други AI search системи.

### P2 — среден приоритет

1. Липсва multilingual стратегия.
2. Липсват сравнения и use-case guides с реални доказателства.
3. Няма user reviews, public roadmap или issue reporting.
4. Няма linkable technical assets.
5. Няма ясен Pro/business модел, ако целта е selling, а не само advertising.

---

# 3. Какво е потвърдено на живия сайт

## 3.1. Homepage

Текущият H1 е:

> Convert Images to PDF — Private and Free

Основното обещание включва:

- JPG, PNG, WebP и HEIC;
- до 25 изображения;
- no signup;
- no watermark;
- no file uploads;
- local processing;
- unlimited conversions.

### Положителни елементи

- ясно primary intent;
- силно privacy обещание;
- инструментът се разбира бързо;
- поддържаните формати са видими;
- има How it works и FAQ;
- има конкретни настройки за page size;
- има offline твърдение за JPG/PNG/WebP след първото посещение.

### Проблеми

- homepage не споменава Merge, Split, Rotate или PDF-to-image;
- няма „All PDF Tools“ hub;
- няма main navigation към новите функционалности;
- „Also by the maker“ се показва преди „How it works“;
- footer описва продукта само като „image to PDF converter“;
- няма About, Security или Contact в публичната навигация;
- FAQ е изцяло за image conversion;
- продуктът остава семантично заключен в една ниша.

---

## 3.2. Публично откриваеми tool pages

### JPG to PDF

**Силни страни**

- уникален title и H1;
- конкретни инструкции;
- секция за quality/file size;
- обяснение защо се използва PDF;
- релевантни internal links.

**Проблеми**

- няма FAQ;
- няма browser compatibility;
- няма ограничения и error handling;
- няма EXIF orientation обяснение;
- няма metadata/privacy обяснение;
- няма конкретен benchmark;
- няма visible proof, че форматът се обработва локално;
- CTA води към общ converter вместо страница с ясно preselected mode, ако това не е технически синхронизирано.

### PNG to PDF

**Силни страни**

- уникална информация за transparency;
- добро разграничение PNG vs JPEG;
- подходящо за screenshots/graphics intent.

**Проблеми**

- страницата е кратка;
- няма избор на transparency background;
- няма информация за alpha handling при цветни фонове;
- няма размер/качество comparison;
- няма FAQ и use cases.

### WebP to PDF

**Силни страни**

- конкретна format страница;
- browser compatibility statement;
- ясни вътрешни връзки.

**Проблеми**

- много тънко съдържание;
- няма animated WebP policy;
- няма информация за color profiles;
- няма error fallback;
- почти няма уникални use cases;
- ниска citation-worthiness.

### HEIC to PDF

**Силни страни**

- отличен long-tail intent;
- обяснява Safari native decode и WASM fallback;
- много добро privacy positioning;
- полезна за iPhone аудитория.

**Проблеми**

- твърдението за Safari „native support“ трябва да бъде тествано по версии;
- няма списък с тествани версии;
- няма поведение при Live Photos/multiple frames;
- няма EXIF orientation и color profile описание;
- няма memory warning;
- няма fallback инструкция при decoder error.

### Combine Images to PDF

**Силни страни**

- ясна мултиформатна задача;
- описва reorder, rotate, page size и margins;
- добър transactional intent.

**Проблеми**

- почти дублира homepage и image-to-PDF;
- няма достатъчно уникален content angle;
- има риск от keyword cannibalization между:
  - `/`;
  - `/tools/image-to-pdf`;
  - `/tools/combine-images-to-pdf`;
- трябва да се определи ясно primary canonical intent на всяка страница.

### Screenshot to PDF

**Силни страни**

- силен use-case intent;
- clipboard paste е добър differentiator;
- конкретна keyboard инструкция.

**Проблеми**

- няма mobile screenshot workflow;
- няма guidance за long screenshots;
- няма crop/blank-margin handling;
- няма browser permission/error handling;
- страницата е тънка.

### Photos to PDF

**Силни страни**

- реално различна mobile intent страница;
- iPhone и Android инструкции;
- no-app positioning;
- добра long-tail стойност.

**Проблеми**

- няма visual screenshots;
- няма guidance за camera permission;
- няма EXIF rotation;
- няма document scan enhancement;
- няма troubleshooting за iOS Downloads/Files;
- няма „Add to Home Screen“/PWA instructions.

---

# 4. SEO audit

## 4.1. Search intent coverage

### Текущо покритие

LocalPDF покрива добре следните intent clusters:

- image to PDF;
- JPG to PDF;
- PNG to PDF;
- WebP to PDF;
- HEIC to PDF;
- screenshots to PDF;
- phone photos to PDF.

### Липсващо покритие

Няма доказано indexable покритие за:

- merge PDF;
- split PDF;
- rotate PDF;
- organize PDF;
- delete PDF pages;
- extract PDF pages;
- PDF to JPG;
- PDF to PNG;
- add page numbers;
- crop PDF;
- resize PDF;
- PDF to text;
- extract images;
- compress PDF.

### Препоръка

Публикувайте отделни, crawlable страници със стабилни URL адреси:

```text
/pdf-tools
/tools/merge-pdf
/tools/split-pdf
/tools/rotate-pdf
/tools/reorder-pdf-pages
/tools/delete-pdf-pages
/tools/extract-pdf-pages
/tools/pdf-to-jpg
/tools/pdf-to-png
```

След Tier 1:

```text
/tools/pdf-to-text
/tools/extract-images-from-pdf
/tools/add-page-numbers-to-pdf
/tools/crop-pdf
/tools/resize-pdf-pages
/tools/n-up-pdf
/tools/compress-pdf
```

---

## 4.2. Keyword cannibalization

### Потенциален конфликт

Текущите URL-и:

- homepage;
- `/tools/image-to-pdf`;
- `/tools/combine-images-to-pdf`;
- `/tools/jpg-to-pdf`;
- `/tools/png-to-pdf`.

Homepage и две общи image pages могат да се конкурират за:

- image to PDF;
- images to PDF;
- combine images into PDF;
- photo to PDF.

### Препоръчано разпределение

| URL | Primary intent |
|---|---|
| `/` | Private PDF tools / product brand |
| `/tools/image-to-pdf` | Image to PDF converter |
| `/tools/combine-images-to-pdf` | Combine multiple images into one PDF |
| `/tools/jpg-to-pdf` | JPG/JPEG to PDF |
| `/tools/png-to-pdf` | PNG to PDF |
| `/tools/photos-to-pdf` | Photos to PDF on mobile |
| `/tools/screenshot-to-pdf` | Screenshot workflow |

Homepage трябва да престане да бъде основната „image to PDF“ landing page, след като PDF toolkit-ът бъде пуснат.

---

## 4.3. Titles и CTR

Текущите titles са ясни, но някои са дълги и съдържат много modifiers:

> JPG to PDF — Convert JPEG Images to PDF Free | No Upload | LocalPDF

Препоръчана структура:

```text
JPG to PDF Locally — Private & Free | LocalPDF
```

или:

```text
Convert JPG to PDF — Files Stay on Your Device | LocalPDF
```

### Правило

- primary keyword в началото;
- една силна полза;
- brand в края;
- не повтаряйте Free + Private + No Upload във всеки title;
- тествайте CTR в Search Console.

---

## 4.4. Content depth

Google не изисква минимален брой думи, но някои страници са твърде кратки, за да отговорят на достатъчно варианти на intent-а.

### Минимална полезна структура за всеки Tier 1 tool

1. H1 и кратък отговор;
2. tool UI;
3. 3–4 реални стъпки;
4. supported files;
5. device/browser support;
6. privacy explanation;
7. limitations;
8. 3–5 use cases;
9. troubleshooting;
10. FAQ;
11. related tools;
12. last reviewed date.

### Не добавяйте filler

Лош подход:

> PDFs are popular files used by millions of people worldwide...

Добър подход:

> Merging changes the PDF structure and can invalidate an existing digital signature. The original visual content remains unchanged, but the signature should be verified again.

---

## 4.5. Internal linking

### Текущо

- format страниците се линкват една към друга;
- няма cross-cluster структура;
- няма hub;
- homepage не води към новите PDF функции;
- converter страницата почти няма supportive content.

### Препоръчана архитектура

```text
Homepage
  ├── All PDF Tools
  ├── Merge PDF
  ├── Split PDF
  ├── PDF to JPG
  ├── Organize PDF
  └── Image to PDF

All PDF Tools
  ├── Convert to PDF
  ├── Convert from PDF
  ├── Organize PDF
  └── Improve PDF
```

Всяка tool page трябва да има:

- breadcrumb;
- 3–5 related tools;
- one next-action recommendation;
- link към релевантен guide;
- линк към Security/How local processing works.

---

## 4.6. Indexation checklist

За всяка нова страница:

```text
[ ] HTTP 200
[ ] index,follow
[ ] self-canonical
[ ] included in sitemap.xml
[ ] linked from /pdf-tools
[ ] linked from homepage or category page
[ ] unique title
[ ] unique H1
[ ] unique meta description
[ ] server-rendered content
[ ] no blocked JS/CSS
[ ] valid structured data
[ ] Search Console URL Inspection
[ ] Request indexing
[ ] verify Google-selected canonical
```

### Особено важно

Client-side route, която се появява само след JavaScript navigation, не е достатъчна. Tool copy и internal links трябва да присъстват в initial HTML.

---

# 5. LLM/GEO audit

## 5.1. Какво означава LLM/GEO за LocalPDF

Целта не е просто LLM crawler да прочете страницата.

Целта е AI система да може надеждно да отговори:

- Какво е LocalPDF?
- Кой го управлява?
- Кои функции има?
- Файловете качват ли се?
- Работи ли offline?
- Безплатно ли е?
- Какви са лимитите?
- Поддържа ли HEIC?
- Има ли Merge/Split/PDF to JPG?
- Как се различава от Smallpdf/Adobe?
- Кои твърдения са доказани?
- Коя е официалната страница?

В момента отговорите на част от тези въпроси са неясни или могат да бъдат объркани с други „LocalPDF“ продукти.

---

## 5.2. Критичен entity collision

В search results съществуват множество несвързани продукти с почти същото име:

- `localpdf.online`;
- `local-pdf.com`;
- `localpdf.org`;
- `localpdf.dev`;
- `localpdf.net`;
- `localpdf.app`;
- `localpdfs.com`;
- desktop и mobile приложения „Local PDF“;
- open-source „LocalPDF Studio“.

Това е сериозен проблем за:

- branded SEO;
- LLM attribution;
- review aggregation;
- product recommendations;
- Knowledge Graph entity resolution;
- link building;
- user trust.

### Възможни решения

#### Препоръчано

Публичният продукт да се нарича:

> **Local2PDF**

а „LocalPDF“ да остане descriptor или legacy brand.

Пример:

> Local2PDF — Private PDF Tools That Work on Your Device

Това съвпада с домейна и е по-различимо.

#### Алтернатива

> LocalPDF by Firmify Labs

Това е по-силно за entity identity, но изисква стабилен parent brand.

#### Минимална промяна

Навсякъде използвайте:

> LocalPDF at local2pdf.com

и добавете Organization/SoftwareApplication `sameAs` профили.

---

## 5.3. Entity home page

Създайте `/about` с конкретни факти:

- официално име на продукта;
- официален домейн;
- legal operator;
- държава;
- contact email;
- launch date;
- как работи local processing;
- основни функции;
- pricing model;
- product owner/team;
- links към Firmify и StoryKind само като related products;
- official social/GitHub/Product Hunt links;
- last updated.

### Примерен кратък entity statement

> Local2PDF is a browser-based PDF toolkit operated by Firmify EOOD in Bulgaria. It converts and organizes documents locally on the user’s device; selected files are not uploaded to Local2PDF servers.

Използвайте това изречение последователно в:

- About;
- Organization schema;
- press kit;
- Product Hunt;
- GitHub;
- social profiles;
- llms.txt;
- directory submissions.

---

## 5.4. Answerability score

Текущите страници имат добри кратки отговори, но липсват някои ключови facts.

### Добавете фактова таблица

На About или Security:

| Fact | Official answer |
|---|---|
| Product | Local2PDF |
| Official URL | https://local2pdf.com/ |
| Operator | Firmify EOOD / точният legal entity |
| Processing | In-browser |
| File uploads | No, for listed local tools |
| Account required | No |
| Watermark | No |
| Free limit | 25 pages per image conversion |
| Offline | Supported tools after asset caching |
| Supported browsers | Explicit tested versions |
| Support | Real email |
| Last verified | Date |

Това е много по-лесно за цитиране от LLM от разпръснати marketing paragraphs.

---

## 5.5. Citation-worthiness

AI системите предпочитат източници, които съдържат конкретни, проверими и уникални данни.

### Публикувайте

1. **How Local Processing Works**
2. **No-Upload Verification Guide**
3. **Browser Compatibility Matrix**
4. **Performance Benchmark**
5. **PDF Test Corpus Results**
6. **Security Architecture**
7. **Dependency and License List**
8. **Changelog**
9. **Known Limitations**
10. **File-size and memory guidance**

### Пример за цитируемо твърдение

Слабо:

> LocalPDF is fast and secure.

Силно:

> In our July 2026 Chrome test on a 20-page, 8.4 MB PDF, Merge PDF completed in 0.8 seconds on an M1 MacBook Air. No request containing the file bytes appeared in the browser Network panel.

Публикувайте само реално измерени резултати.

---

## 5.6. AI crawler access

OpenAI разграничава:

- `OAI-SearchBot` — за видимост в ChatGPT search;
- `GPTBot` — за training controls.

Препоръчана политика, ако целта е AI visibility:

```txt
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Disallow: /
```

Това позволява search discovery, без автоматично да разрешава training crawler-а.

Политиката трябва да бъде съобразена с вашето собствено решение и да не блокира:

- `/about`;
- `/security`;
- `/pdf-tools`;
- tool pages;
- guides;
- structured data resources.

---

## 5.7. llms.txt

`llms.txt` е полезен като supplementary machine-readable index, но не е магически ranking factor и не замества SEO.

Създайте:

```text
https://local2pdf.com/llms.txt
```

### Примерна структура

```md
# Local2PDF

> Local2PDF is a privacy-first PDF toolkit. Supported tools process selected files locally in the browser and do not upload document contents to Local2PDF servers.

## Official information

- [About](https://local2pdf.com/about): Operator, product identity and official facts.
- [Security](https://local2pdf.com/security): Local processing architecture and limitations.
- [Privacy](https://local2pdf.com/privacy): Data handling, analytics and advertising.
- [All PDF Tools](https://local2pdf.com/pdf-tools): Complete tool directory.
- [Changelog](https://local2pdf.com/changelog): Product updates.

## Core tools

- [Merge PDF](https://local2pdf.com/tools/merge-pdf)
- [Split PDF](https://local2pdf.com/tools/split-pdf)
- [PDF to JPG](https://local2pdf.com/tools/pdf-to-jpg)
- [Image to PDF](https://local2pdf.com/tools/image-to-pdf)

## Important limitations

- Processing capacity depends on the device and available browser memory.
- Editing a signed PDF can invalidate its digital signature.
- OCR output may contain recognition errors.
```

### Не правете

- keyword stuffing;
- стотици links;
- claims, които не са видими на сайта;
- различни facts от About/Privacy;
- fake statistics.

---

## 5.8. LLM-friendly content blocks

В горната част на всяка tool page добавете 40–80 думи, които отговарят директно:

> Local2PDF Merge PDF combines two or more PDF documents directly in your browser. The files are read from your device, merged in browser memory, and downloaded as one PDF. The selected documents are not uploaded to Local2PDF servers.

След това:

- limitations;
- supported inputs;
- output behavior;
- privacy;
- how-to.

Това подобрява едновременно classic SEO и AI answer extraction.

---

# 6. Trust и E-E-A-T audit

## 6.1. Липсва реален контакт

Privacy и Terms казват:

> contact us through the information provided on our website

но публичният footer не показва email или contact page.

### Това трябва да се поправи веднага

Добавете:

- `/contact`;
- `support@local2pdf.com`;
- `privacy@local2pdf.com`;
- `security@local2pdf.com`;
- legal operator;
- expected response time;
- bug report form;
- security disclosure policy.

---

## 6.2. About page

Трябва да отговаря:

- кой стои зад продукта;
- защо е създаден;
- кой носи отговорност;
- как се финансира;
- какви са ограниченията;
- как се отнася към Firmify и StoryKind.

Не използвайте анонимно „the maker“, когато продуктът обработва договори, лични документи и снимки.

---

## 6.3. Security page

Минимални секции:

1. Browser-local processing;
2. network requests;
3. third-party dependencies;
4. analytics;
5. ads;
6. localStorage;
7. service worker/cache;
8. memory cleanup;
9. password-protected files;
10. security headers;
11. vulnerability disclosure;
12. known limitations.

### Важна формулировка

Не казвайте:

> Nothing ever leaves your device.

ако страницата зарежда analytics, ads, fonts или consent vendors.

Казвайте:

> Your selected document contents are not uploaded. The website may still make normal requests for app assets, consent, analytics or advertising according to your choices.

---

## 6.4. Advertising transparency

Privacy policy споменава advertising, но трябва да има:

- активни providers;
- legal basis;
- consent behavior;
- cookie list;
- retention;
- opt-out;
- EEA/UK CMP;
- distinction between contextual and personalized ads.

Privacy-first аудиторията ще забележи несъответствие между:

> complete privacy

и агресивни ad/cookie requests.

---

# 7. Structured data recommendations

## 7.1. Site-wide Organization

Добавете JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://local2pdf.com/#organization",
  "name": "Local2PDF",
  "url": "https://local2pdf.com/",
  "logo": "https://local2pdf.com/icons/icon-512.png",
  "legalName": "Firmify EOOD",
  "description": "Privacy-first browser PDF tools that process supported files locally on the user's device.",
  "email": "support@local2pdf.com",
  "sameAs": [
    "OFFICIAL_GITHUB",
    "OFFICIAL_PRODUCT_HUNT",
    "OFFICIAL_SOCIAL_PROFILE"
  ]
}
```

Не добавяйте измислени профили.

---

## 7.2. WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://local2pdf.com/#website",
  "url": "https://local2pdf.com/",
  "name": "Local2PDF",
  "publisher": {
    "@id": "https://local2pdf.com/#organization"
  }
}
```

---

## 7.3. WebApplication за tool pages

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://local2pdf.com/tools/merge-pdf#app",
  "name": "Local2PDF Merge PDF",
  "url": "https://local2pdf.com/tools/merge-pdf",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any modern web browser",
  "browserRequirements": "JavaScript and WebAssembly enabled",
  "description": "Merge PDF files locally in the browser without uploading document contents.",
  "isAccessibleForFree": true,
  "publisher": {
    "@id": "https://local2pdf.com/#organization"
  }
}
```

### Забранено

- fake AggregateRating;
- fake review count;
- pricing, която не съществува;
- features, които не са достъпни;
- schema content, скрит от потребителя.

---

## 7.4. BreadcrumbList

За всяка tool page:

```text
Home > PDF Tools > Organize PDF > Merge PDF
```

---

## 7.5. FAQ schema

Може да се използва за machine understanding, но:

- Google не гарантира FAQ rich result;
- questions и answers трябва да са видими;
- не генерирайте 20 изкуствени въпроса;
- не използвайте един и същ FAQ на всички страници.

---

# 8. Функционален и UX одит на текущия image converter

## 8.1. Потвърдени обещани функции

Публичният текст твърди:

- click file picker;
- drag and drop;
- paste from clipboard;
- camera на mobile;
- up to 25 images;
- JPG, PNG, WebP, HEIC;
- reorder;
- rotate;
- page size;
- orientation;
- margins;
- quality;
- custom dimensions;
- PDF download;
- offline за JPG/PNG/WebP след first visit.

Тези функции са добре подбрани и покриват основния workflow.

---

## 8.2. Необходими продуктови подобрения

### P0

#### Progress и cancel

Добавете:

- decoding progress;
- page preparation progress;
- PDF build progress;
- cancel;
- retry.

Пример:

> Decoding HEIC image 4 of 18  
> Building PDF page 4 of 18

#### Error messages

Избягвайте:

> Something went wrong.

Използвайте:

- Unsupported HEIC variant;
- Browser ran out of memory;
- Image is corrupted;
- Maximum page count reached;
- Clipboard does not contain an image;
- Camera permission denied.

#### Output validation

След създаване показвайте:

- output filename;
- pages;
- dimensions;
- size;
- download button;
- start over;
- related action.

### P1

#### EXIF orientation

Тествайте:

- iPhone portrait;
- Android portrait;
- mirrored camera image;
- rotated JPEG metadata.

Показвайте corrected preview.

#### Metadata privacy

По подразбиране:

- strip EXIF GPS;
- strip camera serial/device fields;
- document metadata minimal.

Добавете обяснение:

> Image metadata such as GPS coordinates is not copied into the PDF.

Само ако това е реално техническото поведение.

#### Transparency control

PNG/WebP:

- white;
- black;
- custom color;
- preserve only where PDF implementation supports it reliably.

#### Auto-sort

- filename;
- date added;
- EXIF capture date;
- reverse order.

#### Duplicate detection

Показвайте warning за exact duplicate images.

#### Estimated output size

Преди Convert:

- estimated range;
- effect of quality preset;
- warning за email attachment.

#### Output filename

Позволете custom name с safe sanitization.

#### Accessibility

- keyboard reorder;
- accessible remove/rotate labels;
- focus states;
- screen-reader status announcements;
- touch target minimum;
- contrast.

### P2

- crop;
- grayscale;
- deskew;
- scan enhancement;
- page numbering;
- watermark;
- OCR;
- save presets;
- PWA install prompt;
- offline status indicator.

---

## 8.3. Performance optimization

### Lazy-load

Зареждайте HEIC WASM само след HEIC selection.

Не зареждайте:

- HEIC decoder;
- PDF.js;
- OCR;
- ZIP;
- ad libraries;

преди да са нужни.

### Worker processing

Decode и PDF generation трябва да са извън main thread, когато библиотеката позволява.

### Memory cleanup

- revoke Object URLs;
- clear canvases;
- release decoded buffers;
- remove workers after task;
- process sequentially;
- avoid full-resolution duplicate previews.

### Mobile safeguards

- lower thumbnail resolution;
- dynamic page warnings;
- cap simultaneous decodes;
- detect low-memory failure;
- offer „Balanced“ mode.

---

# 9. Одит на новите Tier 1 и Tier 2 функционалности

## 9.1. Публичен статус

| Функция | Публично открита на local2pdf.com | Indexable page потвърдена | Functional output проверен |
|---|---:|---:|---:|
| Image to PDF | Да | Да | Частично/неинтерактивно |
| JPG to PDF | Да | Да | Не е byte-tested |
| PNG to PDF | Да | Да | Не е byte-tested |
| WebP to PDF | Да | Да | Не е byte-tested |
| HEIC to PDF | Да | Да | Не е byte-tested |
| Merge PDF | Не | Не | Не |
| Split PDF | Не | Не | Не |
| Rotate PDF | Не | Не | Не |
| Reorder PDF Pages | Не | Не | Не |
| Delete PDF Pages | Не | Не | Не |
| Extract PDF Pages | Не | Не | Не |
| PDF to JPG | Не | Не | Не |
| PDF to PNG | Не | Не | Не |
| PDF to Text | Не | Не | Не |
| Add Page Numbers | Не | Не | Не |
| Crop PDF | Не | Не | Не |
| Resize PDF | Не | Не | Не |
| N-up PDF | Не | Не | Не |
| Compress PDF | Не | Не | Не |

### Извод

Новите функции не могат да повишат SEO рейтингите, докато не са:

- production-deployed;
- linked;
- indexable;
- included in sitemap;
- представени на homepage/hub;
- tested;
- подкрепени със собствен content.

---

## 9.2. Функционална QA матрица за Tier 1

### Merge PDF

Тестове:

```text
[ ] 2 normal PDFs
[ ] 20 PDFs
[ ] mixed A4/Letter
[ ] portrait + landscape
[ ] forms
[ ] annotations
[ ] bookmarks
[ ] encrypted PDF
[ ] digitally signed PDF
[ ] corrupted PDF
[ ] 200+ pages
[ ] filenames with Unicode
[ ] mobile memory stress
[ ] output opens in Chrome
[ ] output opens in Safari Preview
[ ] output opens in Adobe Reader
[ ] no rasterization
[ ] no unexpected network upload
```

### Split PDF

```text
[ ] every page
[ ] custom range 1-3,5,8-10
[ ] duplicated ranges
[ ] invalid page number
[ ] reversed range
[ ] every N pages
[ ] one output
[ ] multiple outputs ZIP
[ ] deterministic filenames
[ ] 1000-page PDF
[ ] cancellation
```

### Rotate/Reorder/Delete/Extract

```text
[ ] touch drag
[ ] mouse drag
[ ] keyboard alternative
[ ] multi-select
[ ] undo/redo
[ ] odd/even selection
[ ] page rotation metadata
[ ] mixed page sizes
[ ] zero-page guard
[ ] selected order preserved
[ ] virtualized thumbnails
```

### PDF to JPG/PNG

```text
[ ] 96 DPI
[ ] 150 DPI
[ ] 300 DPI
[ ] selected pages
[ ] transparent PDF region
[ ] vector-heavy page
[ ] photo-heavy page
[ ] non-Latin text
[ ] huge dimensions
[ ] sequential render
[ ] ZIP order
[ ] cancellation
[ ] output dimensions
[ ] color comparison
```

---

## 9.3. Automation requirements

Изградете CI test suite, която:

1. отваря всеки tool;
2. качва synthetic fixture;
3. изпълнява действието;
4. изтегля output;
5. валидира PDF structure;
6. сравнява page count;
7. сравнява dimensions;
8. проверява, че няма unexpected upload;
9. записва duration;
10. прави screenshots.

Подходящи инструменти:

- Playwright;
- Vitest/Jest;
- pdf-lib/qpdf за structural checks;
- pixel comparison за rendered output;
- Lighthouse CI;
- axe-core;
- WebPageTest/PageSpeed за performance.

---

# 10. Homepage redesign recommendation

## 10.1. Нов H1

> Private PDF Tools That Work on Your Device

## 10.2. Subheading

> Merge, split, organize and convert PDF files directly in your browser. Your documents are not uploaded to Local2PDF servers.

## 10.3. Primary CTA

> Choose a PDF Tool

## 10.4. Secondary CTA

> Convert Images to PDF

## 10.5. Recommended order

1. Hero;
2. Popular PDF tools;
3. trust strip;
4. All tool categories;
5. how local processing works;
6. use cases;
7. browser compatibility;
8. FAQ;
9. latest guides;
10. products from the team;
11. legal/footer.

### Popular tools

- Merge PDF;
- Split PDF;
- PDF to JPG;
- Image to PDF;
- Organize Pages;
- Rotate PDF.

### Move

„Also by the maker“ → footer или after FAQ.

---

# 11. Recommended new pages

## P0

```text
/about
/contact
/security
/pdf-tools
/changelog
/compatibility
```

## P1

```text
/guides/how-local-pdf-processing-works
/guides/verify-files-are-not-uploaded
/guides/browser-pdf-file-size-limits
/guides/local-vs-cloud-pdf-tools
/guides/pdf-digital-signatures-after-editing
```

## P2

```text
/benchmarks
/status
/accessibility
/responsible-disclosure
```

---

# 12. Content plan for SEO and LLM citations

## First 10 pieces

1. How to Verify a PDF Tool Does Not Upload Your Files
2. Local vs Cloud PDF Processing: Technical Comparison
3. Merge PDF Without Uploading Confidential Documents
4. What Happens to Digital Signatures When You Edit a PDF?
5. PDF to JPG vs PNG: Which Format Should You Use?
6. How Browser Memory Limits Affect Large PDFs
7. How HEIC Is Converted Locally in Chrome and Safari
8. Remove Blank Pages from a Scanned PDF
9. Combine Invoices into One PDF Securely
10. Change Mixed PDF Page Sizes to A4

### Every article should include

- author/reviewer;
- reviewed date;
- real tool screenshots;
- limitations;
- primary sources;
- relevant tool CTA;
- no exaggerated claims;
- unique examples;
- short answer block.

---

# 13. Brand and entity strategy

## Recommended decision

### Best long-term option

Rename the public brand to:

> **Local2PDF**

Reasons:

- matches the domain;
- less entity confusion;
- better exact branded search;
- easier Organization schema;
- easier directory listings;
- LLMs can distinguish it from unrelated LocalPDF products.

### Migration approach

1. Brand label: Local2PDF;
2. title suffix: `| Local2PDF`;
3. logo alt: Local2PDF;
4. Organization schema: Local2PDF;
5. About statement;
6. footer;
7. redirects are not required because domain stays the same;
8. mention once:
   > Local2PDF was previously presented as LocalPDF.
9. claim consistent social handles.

### Keep Firmify relation controlled

Footer:

> Local2PDF is operated by Firmify EOOD.

Related products:

- Firmify;
- StoryKind.

Не използвайте Firmify като основна consumer-facing марка, освен ако не изградите „Firmify Labs“ като umbrella.

---

# 14. Technical security recommendations

За privacy product security headers са и trust signal.

Прегледайте:

```text
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
Cross-Origin-Opener-Policy
Cross-Origin-Resource-Policy
Cross-Origin-Embedder-Policy — само ако е съвместимо
frame-ancestors in CSP
```

### CSP

Не използвайте прекалено широки:

```text
script-src *
unsafe-eval
unsafe-inline
```

ако могат да бъдат избегнати.

### Third-party assets

За максимално достоверно local processing:

- self-host libraries;
- self-host fonts;
- minimize tag managers;
- no third-party scripts inside tool workspace;
- SRI за външни assets, когато е приложимо;
- dependency lockfile;
- SBOM;
- automated vulnerability scanning.

---

# 15. Core Web Vitals plan

## Targets

- LCP ≤ 2.5 s;
- INP ≤ 200 ms;
- CLS ≤ 0.1.

## Highest-risk components

- HEIC WASM;
- PDF.js;
- thumbnail rendering;
- drag-and-drop page grids;
- ZIP generation;
- ad scripts;
- consent banner;
- dynamic related-tool cards.

## Actions

```text
[ ] server-rendered shell
[ ] route-level code splitting
[ ] tool-specific lazy imports
[ ] Web Workers
[ ] virtualized page grids
[ ] reserved ad dimensions
[ ] no late hero shifts
[ ] preload only critical font/logo
[ ] self-host font or use system stack
[ ] monitor field CWV by route
[ ] Lighthouse CI budget
```

---

# 16. Analytics and measurement

## 16.1. SEO measurement

Google Search Console:

- Web Search report;
- Generative AI performance report;
- page grouping by tool;
- query clusters;
- CTR;
- average position;
- country;
- device;
- indexing;
- Core Web Vitals;
- structured data.

## 16.2. ChatGPT referrals

Track:

```text
utm_source=chatgpt.com
```

Create channel grouping:

```text
AI Search:
- chatgpt.com
- perplexity.ai
- copilot.microsoft.com
- gemini.google.com
- other identified AI referrals
```

## 16.3. Product funnel

```text
tool_page_view
file_picker_open
file_selected
file_validation_failed
processing_started
processing_cancelled
processing_completed
processing_failed
download_clicked
related_tool_clicked
repeat_task_started
```

### Privacy-safe properties

- tool slug;
- file-size bucket;
- page-count bucket;
- device class;
- duration bucket;
- error code.

Never send:

- filename;
- file content;
- extracted text;
- image preview;
- password;
- document metadata.

---

# 17. KPI targets

## 30–45 days

```text
[ ] all Tier 1 URLs publicly accessible
[ ] 100% included in sitemap
[ ] 100% linked from hub
[ ] 100% self-canonical
[ ] 100% unique titles/H1
[ ] About/Contact/Security live
[ ] Organization/WebApplication schema valid
[ ] OAI-SearchBot policy decided
[ ] llms.txt live
[ ] no critical Lighthouse SEO error
[ ] no P0 functional fixture failures
```

## 90–120 days

```text
[ ] 8 Tier 1 pages receiving impressions
[ ] 5+ pages receiving non-brand clicks
[ ] 50+ distinct non-brand queries
[ ] 90%+ supported-file completion rate
[ ] <3% unexpected processing error
[ ] 80%+ download rate after successful processing
[ ] 8%+ related-tool continuation
[ ] 3+ real third-party editorial mentions
[ ] measurable AI-search referrals or Generative AI impressions
[ ] 75%+ good CWV URLs
```

---

# 18. Prioritized action plan

## P0 — next release

1. Decide brand: Local2PDF vs LocalPDF at local2pdf.com.
2. Publish `/pdf-tools`.
3. Link Tier 1 tools from homepage and navigation.
4. Ensure every Tier 1 URL returns server-rendered HTML.
5. Add sitemap entries and inspect in Search Console.
6. Fix canonicals and accidental noindex/robots blocks.
7. Publish About, Contact and Security.
8. Add real support/privacy/security emails.
9. Update Privacy and Terms for expanded PDF tools.
10. Move „Also by the maker“ to footer.
11. Add Organization, WebSite, WebApplication and Breadcrumb schema.
12. Build Tier 1 automated functional QA.
13. Verify no file bytes are sent over network.
14. Add release changelog.

## P1 — following 30 days

1. Expand thin tool pages.
2. Add limitations and compatibility sections.
3. Publish five technical guides.
4. Add llms.txt.
5. Allow OAI-SearchBot if desired.
6. Create fact table and product identity statement.
7. Add browser/version compatibility matrix.
8. Add real screenshots and short demo video.
9. Improve converter error handling/progress.
10. Add EXIF orientation and metadata behavior.
11. Add related-tool flows.
12. Start external directory and editorial outreach.

## P2 — 60–120 days

1. Localize top pages.
2. Publish benchmark/test results.
3. Add Tier 2 tools.
4. Add public status and issue reporting.
5. Develop Pro/no-ads offer.
6. Build linkable open-source verification utility.
7. Add case studies for legal/accounting/education.
8. Perform quarterly LLM answer audits.

---

# 19. LLM answer audit prompts

Всеки месец тествайте поне ChatGPT, Google AI Mode/Gemini, Perplexity и Copilot с:

```text
What is Local2PDF?
Is local2pdf.com safe?
Does Local2PDF upload PDF files?
Who owns Local2PDF?
Can Local2PDF merge PDFs locally?
Can Local2PDF convert HEIC to PDF?
What is the best private PDF merger?
What PDF tool works without uploading files?
Local2PDF vs Smallpdf
Local2PDF pricing
Does Local2PDF work offline?
```

Записвайте:

- споменат ли е правилният домейн;
- обърква ли се с localpdf.online/local-pdf.com;
- правилни ли са functions;
- правилна ли е pricing информацията;
- цитира ли official pages;
- има ли hallucinated claims.

---

# 20. Как да повишите всеки рейтинг

## SEO

- deploy и index Tier 1;
- hub architecture;
- unique pages;
- internal links;
- Search Console;
- technical trust content;
- backlinks;
- multilingual expansion след доказан English demand.

## LLM/GEO

- решете entity collision;
- About + facts;
- crawl access;
- llms.txt като supplement;
- citation-worthy data;
- consistent facts;
- external mentions;
- short answer blocks;
- visible limitations;
- current dates.

## Trust

- legal operator;
- contact;
- security;
- no-upload verification;
- honest analytics/ads disclosure;
- public changelog;
- bug reporting;
- real testing.

## UX

- progress;
- cancel;
- clear errors;
- mobile memory handling;
- keyboard accessibility;
- output summary;
- next actions;
- no disruptive ads.

## Functional quality

- fixture suite;
- cross-browser tests;
- structural PDF validation;
- visual diffs;
- network tests;
- memory stress;
- CI gates;
- public compatibility matrix.

## Conversion/selling

- Free core tools;
- optional Pro:
  - no ads;
  - higher limits;
  - batch workflows;
  - OCR;
  - saved presets;
  - business license;
  - offline/PWA enhancements.
- upsell only after successful value;
- one-time/lifetime offer can be tested;
- do not block basic tool completion.

---

# 21. Final conclusion

LocalPDF има добра product foundation, но публичната му SEO и LLM identity изостава от планираната функционалност.

Най-големият проблем не е липсата на още content. Проблемът е, че:

> **търсачките и AI системите все още не могат надеждно да видят, разберат и разграничат разширения продукт.**

Първата задача е discovery и entity clarity, не публикуването на десетки нови статии.

Правилният ред е:

1. deploy;
2. expose;
3. index;
4. test;
5. prove;
6. explain;
7. earn mentions;
8. expand.

Ако Tier 1 инструментите бъдат надеждни, server-rendered, добре свързани и подкрепени от прозрачни технически доказателства, Local2PDF може да се позиционира не като „още един PDF сайт“, а като:

> **the verifiable privacy-first PDF toolkit that works on the user’s device.**

---

# 22. Research sources

## Live LocalPDF pages

- LocalPDF homepage: https://local2pdf.com/
- Image to PDF: https://local2pdf.com/tools/image-to-pdf
- JPG to PDF: https://local2pdf.com/tools/jpg-to-pdf
- PNG to PDF: https://local2pdf.com/tools/png-to-pdf
- WebP to PDF: https://local2pdf.com/tools/webp-to-pdf
- HEIC to PDF: https://local2pdf.com/tools/heic-to-pdf
- Combine Images to PDF: https://local2pdf.com/tools/combine-images-to-pdf
- Screenshot to PDF: https://local2pdf.com/tools/screenshot-to-pdf
- Photos to PDF: https://local2pdf.com/tools/photos-to-pdf
- Privacy: https://local2pdf.com/privacy
- Terms: https://local2pdf.com/terms

## Official Google guidance

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Optimizing for generative AI features: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Structured data introduction: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Structured data gallery: https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- Structured data guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Generative AI Search Console reports: https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
- AI-generated content guidance: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content

## OpenAI crawler guidance

- OpenAI crawler overview: https://developers.openai.com/api/docs/bots
- Publishers and developers FAQ: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq

## llms.txt

- llms.txt proposal: https://llmstxt.org/
- Chrome Lighthouse llms.txt guidance: https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt

## Competitive/entity references

The search audit found multiple similarly named products, including:

- https://localpdf.online/
- https://local-pdf.com/
- https://localpdf.org/
- https://localpdf.dev/
- https://www.localpdf.net/
- https://www.localpdf.app/
- https://localpdfs.com/
- https://alinur1.github.io/LocalPDF_Studio_Website/

## Competitor product references

- Smallpdf Merge: https://smallpdf.com/merge-pdf
- Smallpdf PDF to JPG: https://smallpdf.com/pdf-to-jpg
- Smallpdf Delete Pages: https://smallpdf.com/delete-pages-from-pdf
- iLovePDF Merge: https://www.ilovepdf.com/merge_pdf
- iLovePDF PDF to JPG: https://www.ilovepdf.com/pdf_to_jpg
- iLovePDF Remove Pages: https://www.ilovepdf.com/remove-pages
- Drawboard Merge: https://www.drawboard.com/tools/merge-pdfs
- Drawboard PDF to JPG: https://www.drawboard.com/tools/convert-pdf-to-jpg
- Drawboard Delete Pages: https://www.drawboard.com/tools/delete-pages
- PDF24 Merge: https://tools.pdf24.org/en/merge-pdf
- PDF24 PDF to JPG: https://tools.pdf24.org/en/pdf-to-jpg
- PDF24 Remove Pages: https://tools.pdf24.org/en/remove-pdf-pages
- Sejda Delete Pages: https://www.sejda.com/delete-pdf-pages

---

**End of report**
