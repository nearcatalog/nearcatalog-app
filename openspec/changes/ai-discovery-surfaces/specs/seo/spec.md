# Capability: seo (discovery surfaces slice)

## Overview
Surfaces for non-Google AI engines (Perplexity, ChatGPT Search, Claude) and immediate index notification (Bing → ChatGPT Search). Builds on ai-seo-foundations.

## Requirements

### REQ-SEO-101 — Markdown companion routes
For every public `/project/{pid}` and `/category/{cid}` route, a Markdown companion MUST be served at `/project/{pid}.md` and `/category/{cid}.md` respectively. Each response MUST:
- Use `Content-Type: text/markdown; charset=utf-8`
- Set `Link: <canonical-html-url>; rel="canonical"` response header
- Contain the same primary information as the HTML page (Jaccard similarity ≥ 0.90 on body text)
- Begin with an H1 matching the page's H1
- End with a `Canonical HTML: <url>` footer

### REQ-SEO-102 — Markdown URLs in sitemap
`sitemap.xml` MUST include every `.md` companion URL alongside its HTML twin, sharing the same `<lastmod>` value.

### REQ-SEO-103 — llms-full.txt
Site MUST serve `/llms-full.txt` containing concatenated Markdown bodies of: site overview, all categories, featured projects, top N projects ordered by trending. Total size ≤ 500 KB. When truncated, a final line MUST note the truncation. Content-Type `text/plain; charset=utf-8`.

### REQ-SEO-104 — llms-index.txt
Site MUST serve `/llms-index.txt` containing every `.md` URL one per line, no other content. Content-Type `text/plain; charset=utf-8`.

### REQ-SEO-105 — ai.txt
Site MUST serve `/ai.txt` declaring per-user-agent allow/disallow policy for AI crawlers per design.

### REQ-SEO-106 — FAQ rendering with env toggle
Project and category pages MUST render an FAQ section when `process.env.NEXT_PUBLIC_FAQ_ENABLED !== "false"`. FAQ section MUST:
- Live in a container element with class `faq`
- Use `<details>` elements with `<summary class="faq-question">` for each question
- Contain 3–5 items per page

When the flag is `"false"`, both the visible FAQ section AND the FAQPage JSON-LD MUST be omitted (no cloaking).

### REQ-SEO-107 — FAQPage schema parity with visible FAQ
FAQPage JSON-LD MUST contain exactly the same question/answer pairs as the visible FAQ on the same route, in the same order. If FAQ section is absent, no FAQPage JSON-LD is emitted.

### REQ-SEO-108 — FAQ content uniqueness
For programmatic FAQ outputs across pages of the same template (all project FAQs; all category FAQs), pairwise Jaccard token similarity SHOULD remain below 0.85. CI lint enforces this threshold.

### REQ-SEO-109 — IndexNow submission
Site MUST host an IndexNow key file at `/{INDEXNOW_KEY}.txt` containing only the key. A scheduled job MUST POST all sitemap URLs to `https://api.indexnow.org/indexnow` daily. The job endpoint MUST be authenticated via `CRON_SECRET` bearer token.

### REQ-SEO-110 — SEO CI lints
CI MUST run on every PR touching `app/`, `components/`, or `lib/`:
1. JSON-LD validity check on sampled pages
2. Forbidden anchor text scan ("click here", "read more", "this link")
3. FAQ uniqueness Jaccard check (REQ-SEO-108)
4. `.md` ↔ HTML body parity Jaccard check (REQ-SEO-101)
