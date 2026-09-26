# Capability: seo (foundations slice)

## Overview
Baseline SEO + AI-search signals across all public routes. Optimizes for Google AI Overviews, ChatGPT Search, Perplexity, Claude, and traditional rich results.

## Requirements

### REQ-SEO-001 — Single H1 per route
Every public route MUST render exactly one `<h1>` element in SSR'd HTML. Subsequent headings descend in order (no skipped levels).

### REQ-SEO-002 — Per-page canonical URL
Every public route MUST emit `<link rel="canonical">` pointing at its absolute canonical URL via `generateMetadata.alternates.canonical`.

### REQ-SEO-003 — Organization + WebSite root schema
Root layout MUST emit two JSON-LD blocks: `Organization` and `WebSite` (with `SearchAction` targeting `/search?q={search_term_string}`).

### REQ-SEO-004 — BreadcrumbList per content route
Project, category, people, awesome-near, search, and map routes MUST emit `BreadcrumbList` JSON-LD reflecting their canonical hierarchy.

### REQ-SEO-005 — Article schema on long-form content
Project pages MUST emit `Article` JSON-LD with `headline`, `articleBody`, `datePublished`, `dateModified`, `author` (Organization), `publisher`, and `mainEntityOfPage`. Article coexists with SoftwareApplication schema on the same page.

### REQ-SEO-006 — dateModified consistency
For any URL, `dateModified` MUST be identical across: sitemap `<lastmod>`, JSON-LD schemas, and (where present) visible "Updated YYYY-MM-DD" byline.

Source precedence: API `updated_at` → derived (max of children) → git mtime of route file → build time. Build time is last resort only.

### REQ-SEO-007 — Direct-answer block
Project and category pages MUST render a one-sentence direct-answer paragraph above the hero with class `answer-block` and attribute `data-answer="true"`. Content is template-derived from page subject (project tagline + phase, or category description + project count).

### REQ-SEO-008 — Speakable selectors
Project and category pages MUST emit a `WebPage` JSON-LD block with `speakable.cssSelector` listing `.answer-block` and `.faq-question`. Selectors that do not yet exist in DOM are permitted (no-op until other capabilities ship them).

### REQ-SEO-009 — robots.txt AI allow-list
`robots.txt` MUST explicitly allow these user agents at minimum: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, claude-web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, Amazonbot, Meta-ExternalAgent. Wildcard `User-agent: *` remains `Allow: /`.

### REQ-SEO-010 — FAQPage hidden if not visible
Any JSON-LD with `@type: FAQPage` MUST match visible Q/A 1:1 on the same route. This change does not introduce FAQPage; the requirement constrains future changes (see ai-discovery-surfaces).
