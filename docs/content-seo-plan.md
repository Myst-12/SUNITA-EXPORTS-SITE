# Sunita Agri Exports — Content, SEO & Design Brief

Read with `docs/brand-and-content.md` (facts, palette, catalogue) and `src/config/site.js` (contacts, certifications, exhibitions).
Owner decisions are logged in `risks.txt`.

## 1. Positioning
**One line:** *India's one-stop spice & food export house — since 1994.*
**Promise to the buyer:** one Mumbai partner for spices, staples and Indian groceries; any mix of products in one container; your brand or ours.

Three pillars, in this order everywhere (nav, homepage, footer):
1. **Spices** (whole, ground, blended) — the lead. Most content, first category, hero imagery.
2. **Indian Food & FMCG** — rice, pulses, flours, snacks, sweets, pickles, beverages, household & personal care. Sold as *mixed / consolidated containers* for diaspora grocers, supermarkets, distributors.
3. **Private label & custom packaging** — the buyer's brand, retail packs 50 g – 5 kg, bulk 25–50 kg.

Target buyers: importers, distributors, wholesalers, ethnic & mainstream supermarkets, cash-and-carry, food manufacturers, HoReCa.
Priority markets (brochure + 40+): USA, Canada, UK, Australia, New Zealand, UAE, Saudi Arabia, Kuwait, Oman, Qatar, Singapore, Malaysia, Japan, Turkey, Uganda/East Africa, Europe.

## 2. Competitor takeaways (vijifoods.in, biplexports.com; koreagro.com is offline)
- Both list categories but **product pages are thin** (no specs, no packaging, no HS code, no RFQ). → Our product pages win on depth.
- BIPL shows **exhibitions as nav items** (Gulfood, Anuga, SIAL) and a 15-logo accreditation wall. → We show Gulfood 2026 (real: Hall N10, Stand N10-E23) + certification wall.
- Neither has a structured quote form, country pages, FAQs or schema. → Easy SEO/AEO edge.
- Both offer a **catalogue PDF download**. → We offer `sunita-brochure.pdf` (move to `/public/downloads/`).

## 3. Sitemap
| Route | Purpose | Status |
|---|---|---|
| `/` | Home | redesign |
| `/products` | All categories + search/filter | redesign |
| `/products/[category]` | Category page (11 categories) | redesign |
| `/products/[category]/[product]` | Product detail (~95 products) | redesign — the key template |
| `/fmcg` | Indian food & FMCG range | redesign |
| `/mixed-container` | Consolidated container service | redesign |
| `/private-label` | Private label & packaging | redesign |
| `/packaging` | Packaging options gallery (new) | new |
| `/quality` | Process + lab + certifications (merge `/certifications`, `/shipments`) | merge, keep old URLs redirected |
| `/exhibitions` | Trade fairs (Gulfood 2026 + placeholders) | new |
| `/about` | Story since 1994, Star Export House, team, Mumbai base (merge `/why-choose-us`, `/b2b-presence`) | merge |
| `/exports/[country]` | Country landing pages (expand 8 → 16) | redesign |
| `/knowledge` + `/blog/[slug]` | Buyer guides answering real questions | expand |
| `/faq` | FAQ (FAQPage schema) | keep |
| `/contact` | **Get a Quote** — RFQ form, only +91 81692 82942 shown | redesign |
| `/credits` | Image credits (CC BY-SA needs attribution) | new |
| `/llms.txt`, `/robots.txt`, `/sitemap.xml` | AI + crawler files | new/keep |

## 4. Homepage — section order (compact; no section taller than ~1 viewport)
1. **Hero** — headline + sub, two CTAs (Get a Quote / WhatsApp), trust row: *Since 1994 · Star Export House · 40+ countries · Gulfood 2026 exhibitor*. Image: `scenes/hero-dark` or `hero-colour`.
2. **Certification strip** — small monochrome badges, scrolling on mobile.
3. **Product catalogue** — 8–11 category tiles (image + name + item count), then "Popular spices" row of product cards → product pages.
4. **One container, many products** — mixed-container pitch with 3-step graphic.
5. **Indian FMCG & grocery** — image grid of grocery shelves + category chips.
6. **Private label & packaging** — packaging photos (pouches, jars, cartons, jute/PP bags).
7. **From farm to port** — 4 steps (Source → Clean & Grade → Pack → Ship) with real-looking scenes.
8. **Global reach** — map/country chips linking to `/exports/[country]`.
9. **Exhibition highlight** — Gulfood 2026 card + "Meet us" CTA.
10. **FAQ (5 Qs)** + **final CTA band** (quote form shortcut + WhatsApp + email).

## 5. Product page template (the money page)
- Breadcrumb · H1 = "{Product} Exporter from India" style · 1-line value prop
- **Gallery** (main image + 2–3 thumbs: product, bulk/sack, packaging)
- **Quick facts card:** HS code, origin states, forms, grades, shelf life, MOQ ("from 1 MT / mixed container"), port (Nhava Sheva), Incoterms (FOB/CFR/CIF)
- **Specification table** (moisture, purity, ash, etc. where known)
- **Packaging options** (visual chips with icons: 25/50 kg PP & jute, retail 100 g–1 kg pouches, private label)
- **Sticky RFQ panel** (desktop right column / mobile bottom bar): "Request price" → prefilled form + WhatsApp with product name
- **Description + uses** (SEO copy, 150–300 words, natural keywords)
- **FAQ (3–4 Qs)** with FAQPage schema
- **Related products** + "Add to a mixed container" link
- Schema: Product + BreadcrumbList + FAQPage

## 6. Keyword strategy (from temp.md — used as topics, not stuffing)
- **Head terms (home, category):** Indian spices exporter, spice exporter India, Indian FMCG exporter, Indian grocery exporter, Indian food products exporter, Mumbai exporter.
- **Product terms (product pages):** "{product} exporter India", "{product} supplier", "bulk {product}", "{product} wholesale export" — e.g. turmeric fingers exporter India, 1121 basmati rice exporter.
- **Service terms:** mixed container Indian grocery / FMCG, consolidated shipment India, private label spices India, private label Indian food, custom spice packaging.
- **Country terms (country pages):** Indian spices & grocery exporter to {country}; Indian food supplier {country}; Indian FMCG supplier {city}.
- **Buyer-type & intent (FAQ / knowledge):** supplier for supermarkets / distributors / importers; FOB Mumbai price; minimum order quantity; shelf life for sea shipment; export documentation; how to import spices from India.
- **AEO / AI questions (FAQ + knowledge articles, each answered in the first 2 sentences):** "Which Indian exporter can supply spices, rice and groceries in one container?", "Who exports Indian groceries to Canada?", "How do I import Indian spices in bulk?", "What is the MOQ for a mixed container from India?"
- **No third-party brand names** (owner rule).

## 7. Tech SEO checklist
- One `<h1>` per page, unique title (≤60 chars) + description (≤155 chars), canonical, OG image.
- JSON-LD: Organization (global), LocalBusiness (contact), Product, BreadcrumbList, FAQPage, Article.
- `sitemap.xml` (all routes), `robots.txt`, `llms.txt` (plain-language company summary + key URLs for AI crawlers).
- `next/image` everywhere, WebP, lazy below fold, explicit sizes; LCP < 2.5 s on 4G.
- Real text (no text in images), descriptive alt text per image.
- 301 redirects for merged routes.
- After launch: Google Search Console + Bing Webmaster, submit sitemap; Google Business Profile for the Mumbai office.

## 8. Design direction (input for the Fable design step)
- **Feel:** clean, light, confident B2B — like a modern food brand, not a template. White space, crisp type, real photography, small radius cards, subtle motion.
- **Palette:** white base; forest green `#086639` primary; leaf lime `#BCD63D` accent; turmeric `#F2B705` used sparingly (highlights, stars); chilli red `#BE2927` only tiny (badges). Neutral greys for text.
- **Type:** a modern sans for UI/body (e.g. Inter / Manrope) + one characterful display face for headings (current Playfair can be replaced).
- **Density:** owner said boxes are too big → compact cards, 12–16 px radius, 16–24 px padding, 4-col grids on desktop, 2-col on mobile.
- **No emoji icons** — use a consistent line-icon set (inline SVG).
- **Mobile first:** single-line top bar (or none) on mobile, sticky header, bottom "Get Quote / WhatsApp" bar on product pages.
- **Motion:** gentle fade/slide-in, image zoom on hover; respect `prefers-reduced-motion`; content must be visible without JS.

## 9. Images available (`public/images/`)
- `products/*.webp` — 78 product photos (see `CREDITS.md`)
- `categories/*.webp` — 12 category tiles
- `scenes/*.webp` — 43 lifestyle shots: hero-dark, hero-colour, flatlay-light, spice-jars-top, spoons-*, whole-spices, market-*, sacks-spices, jars-shelf, warehouse-*, port-*, ship-aerial, lab, tradeshow*, dubai, mumbai-*, chilli-drying*, grain-scoop, pack-*, handshake, farmer, rice-farmer, grocery-*, supermarket*
- `og-image.jpg`, `logo.png`, `logo-full.png`
