# Sunita Agri Exports: export catalogue & lead platform

**Live:** [www.sunitaexports.com](https://www.sunitaexports.com)

A full rebuild of the website for **Sunita Agri Exports Pvt. Ltd.**, a Mumbai-based, Govt. Recognised Star Export House shipping Indian spices, rice, pulses, herbs, jaggery and Indian FMCG groceries to 40+ countries since 2010.

It is more than a brochure site. It is a searchable B2B catalogue of nearly 400 products, a multilingual buyer experience, and a lead-capture system the client runs from their phone at international trade fairs.

---

## At a glance

| | |
|---|---|
| **Pages** | 440+ pages, all statically generated and listed in the sitemap |
| **Products** | 378 export products in 14 categories and 40+ subcategories, each with its own page |
| **Spec sheets** | A one-page PDF specification sheet generated for every product |
| **Languages** | 28-language site translation, plus product names in 18 languages for local search |
| **Markets** | 17 export-market pages (UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, USA, UK, EU and others) |
| **Lead capture** | Quote form, WhatsApp everywhere, and an exhibition form builder with QR codes, live dashboard and Excel export |
| **Stack** | Next.js 16 (App Router), React 19, CSS Modules, Supabase, Resend, Vercel |

---

## Features

### Product catalogue
- **378 products** across spices, herbs & botanicals, dehydrated onion & garlic, coconut, pulses, rice, flours, oilseeds, coffee, superfoods, animal & bird feed, jaggery & natural sweeteners, raisins and Indian FMCG.
- **A detail page for every product:** botanical name, HS code, forms, grades, packaging, shelf life, origin and related products.
- **Searchable and filterable** catalogue with category and subcategory navigation.
- **Downloadable PDF spec sheet** for every product, generated on the server with `pdf-lib`. It carries the company letterhead, product photo, specifications table and contact details.
- **Product names in 18 languages** on every product page (Hindi, Gujarati, Tamil, Arabic, Persian, Chinese, Japanese, Korean, Russian, Turkish and more). They are added to the page's structured data so buyers who search in their own language can find the page.
- **Catalogue data kept in sync** with the client's master Excel sheet of 425+ rows, including validation status.
- **Product photos:** the client's own photography, CC-licensed photos (credited on `/credits`), and AI-generated studio shots for products with no usable photo. Every image was reviewed by hand before use.

### Exhibition lead system (`/admin`)
Built for trade fairs such as Gulfood. The client creates a form on their phone, shows a QR code at the stand, and collects buyer details straight into a database.
- **Password-protected admin** with a signed, httpOnly session cookie and a show/hide-password toggle.
- **Form builder:** custom heading, pick from 11 ready-made questions, mark each one required or optional, or add your own questions.
- **QR code** for every form, with a full-screen view to hold up at the stand and a printable PNG download.
- **Public form in 10 languages,** including right-to-left Arabic. Answers are always stored in English, so the Excel export stays readable.
- **Product search** in the visitor's own language, with tap-to-add chips, plus free text for products not in the list.
- **Country-code phone picker** with flags, guessed from the visitor's browser region and the country they choose.
- **Live dashboard for each form:** total leads, leads today, leads per day, top countries, most-requested products and business types.
- **One-tap WhatsApp and email follow-up** from each response, with a pre-written message.
- **Instant lead alert email** to the client for every new entry, sent from `forms@sunitaexports.com`.
- **Thank-you email** to the visitor, with links to the catalogue and WhatsApp.
- **Closing a form emails the Excel file** (`.xlsx`) to the client automatically. It can also be downloaded at any time.
- **Edit, copy and delete forms,** so one exhibition's setup can be reused for the next.
- **Spam protection** (hidden honeypot field), server-side validation, and a "closed form" state.

### Contact & conversion
- **Quote form** that pre-fills the product name when opened from a product page.
- **WhatsApp on every page:** a floating button, links on product pages and pre-filled enquiry messages.
- **WhatsApp channel** link in the footer and the social icons.
- **"Save our contact" QR code** in the footer: one scan adds both directors' numbers and email to the buyer's phone.
- **Mixed-container planner** for building a multi-product order and sending it as an enquiry.

### Trust & credibility
- **Certificates page** with scanned PDFs and validity dates: ISO 22000, ISO 9001, Kosher, FSSAI, APEDA (RCMC), Spices Board, One Star Export House and IEC.
- **"Certified & registered" strip** on the homepage. Each certificate opens its PDF.
- **Directors' message** section with photos.
- **Exhibition highlights:** a swipeable photo strip from trade fairs (Gulfood Dubai, WorldFood Istanbul, Vietfood).
- **Updated downloadable company brochure.**

### Multilingual
- **28-language switcher** (Google Translate), with the brand name protected from translation.
- **"View this site in your language?" bar** shown once, in the visitor's own language, based on their browser setting. It never switches language automatically, so search engines and English readers always get English.
- **Switching back to English works reliably,** including on the live domain, by clearing the translator's cookie on every domain level.

### SEO
- **Separate landing pages for the searches buyers make:** "Indian grocery exporter", "Indian spices exporter", "Indian FMCG exporter", mixed container and private label.
- **17 export-market pages,** with longer content for the Gulf: ports, documents, labelling and the products that sell there.
- **Structured data (JSON-LD):** Organization, Product (with names in other languages), FAQ and breadcrumbs.
- **XML sitemap of 440+ URLs,** a `robots.txt` that keeps the admin, form and API pages out of search, and an `llms.txt` for AI assistants.
- **301 redirects** for every URL from the old PHP site and for removed products, so existing Google rankings carry over.
- **Canonical URLs:** a product listed in two categories still has only one URL.
- **Google Search Console** verified and the sitemap submitted.

### Analytics & privacy
- **Google Analytics 4,** loaded only after the visitor accepts the cookie bar.
- **Custom events:** `generate_lead`, `event_form_submit`, `whatsapp_click`, `phone_click`, `email_click`, `spec_sheet_download`, `brochure_download` and `language_change`.
- **Admin pages excluded** from tracking.

### Design & mobile
- **Calm, editorial design:** Fraunces and Manrope typefaces, the brand's greens, no clutter.
- **Built for phones first,** since most buyers and the client use the site on a phone:
  - large tap targets
  - 16 px form inputs, so iPhone doesn't zoom in
  - safe-area padding for the notch and home bar
  - sideways-scrolling strips with scroll snapping
  - arrow buttons for mouse users
- **Interactive 3D globe** showing shipping routes from Mumbai to every market.
- **Respects reduced-motion settings;** keyboard focus is always visible.
- **Images in WebP, AVIF and responsive sizes;** pages are statically generated, so they load fast.

---

## Architecture

```
src/
  app/                      Next.js App Router pages and API routes
    products/[category]/[product]/   378 product pages (static)
    spec-sheets/[file]/     PDF spec sheet generator (pdf-lib)
    exports/[country]/      17 market pages
    admin/                  Exhibition form builder (password protected)
    f/[slug]/               Public exhibition forms
    api/forms/[slug]/       Form submission endpoint
  components/               Header, Footer, LanguageSwitcher, Globe, Analytics …
  data/catalog/             Product data, categories, images, names in 18 languages
  lib/forms/                Storage (Supabase), auth, Excel (exceljs), email (Resend)
```

**Services:**
- **Vercel:** hosting.
- **Supabase (Postgres):** form data.
- **Resend:** email, sending from a verified domain.
- **Web3Forms:** quote form.
- **Google Analytics 4** and **Search Console.**

The code doesn't depend on Vercel-specific features. It runs on any Node host.

## Running locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` for the exhibition form features. Without database and email keys, the forms run in local test mode: responses and Excel files are saved to `.data/`.

---

Designed and built by **Kushal Mittal** · 2026
