# Change: ai-seo-foundations

## Why
Site has basic SEO (Organization JSON-LD, sitemap, robots, llms.txt) but missing high-ROI signals AI engines (ChatGPT Search, Perplexity, Claude, Google AI Overviews) and Google rich results depend on:

- `dateModified` faked via `new Date()` per build → engines discount freshness
- No per-page canonical URLs
- No WebSite schema with SearchAction (loses sitelinks search box)
- BreadcrumbSchema helper exists but unused across all routes
- robots.txt does not explicitly allow AI crawlers
- Project page lacks an H1, direct-answer block, Article schema
- No Speakable selectors for voice/AI extraction

These are cheap, additive, and align with both Google's official AI Optimization Guide (Feb 2026) and community GEO research.

## What changes
1. `dateModified` sourced from catalog API (`project.updated_at` if exposed) with build-time fallback. Sitemap entries, Article JSON-LD, and visible byline must agree.
2. Add per-page canonical via `alternates.canonical` in every `generateMetadata`.
3. Add `WebSite` schema with `SearchAction` pointing at `/search?q={query}` in root layout.
4. Wire `BreadcrumbSchema` into: project, category, people, awesome-near, search, map.
5. Update `robots.ts` to explicitly allow GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, claude-web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, Amazonbot, Meta-ExternalAgent. Keep `*: allow /` default.
6. Audit and fix H1 on project page (currently leads with `<h2>What is X?`). Move H1 to `ProjectHeader`. Single H1 per route.
7. Add a direct-answer block on project page: one sentence summary in `<p class="answer-block">` above hero. Pair with Speakable `WebPage` JSON-LD targeting `.answer-block` and `.faq-question`.
8. Replace `SoftwareApplication`-only schema on project with `Article` + `SoftwareApplication` pair: `Article` wraps the markdown description block with `datePublished`, `dateModified`, `author: Organization`, `mainEntityOfPage`.

## Non-goals
- `.md` companions (covered in ai-discovery-surfaces)
- FAQ blocks + FAQPage schema (covered in ai-discovery-surfaces)
- IndexNow ping (covered in ai-discovery-surfaces)
- New content / copy authoring
- Author Person entities (keep Organization-as-author per session decision)

## Impact
- New schemas served on every public route → larger HTML payload (≤4 KB per page, negligible)
- Sitemap regenerates with API-sourced `lastmod` instead of `new Date()` → cache-key changes once per real edit, not per deploy
- robots.txt now lists ~12 user agents explicitly
- `<h1>` move requires CSS audit on project page header

## Open question
`dateModified` source — confirm whether catalog API returns `updated_at` per project. If not, fallback to `Date.now()` and accept that programmatic pages share build time. Decision deferred to design.md after API check.
