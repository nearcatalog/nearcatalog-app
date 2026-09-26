# Design: ai-seo-foundations

## dateModified strategy
Precedence per project:
1. `project.updated_at` from catalog API (if field exists — verify in `lib/near-catalog.ts` response shape during task 1.0)
2. `project.profile.updated_at` (alt nesting)
3. Build time (`Date.now()`) — only as last resort

For categories (no per-category mtime in API), use `max(updated_at)` across projects in that category. Falls back to build time if zero projects loaded.

For static routes (home, people, awesome-near, map, search, policy/*), use git mtime of the route file via `lib/git-mtime.ts` helper.

Visible byline format on project page: `Updated YYYY-MM-DD` near H1, hidden if no real signal (avoid fake freshness).

## WebSite + SearchAction
```jsonc
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://nearcatalog.xyz",
  "name": "NEAR Catalog",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://nearcatalog.xyz/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```
Emitted once in root layout next to Organization JSON-LD.

## Breadcrumb wiring
Each route assembles a list and renders `<BreadcrumbSchema items=[…] />`:

- Project: Home → Categories → {primary category name} → {project name}
- Category: Home → Categories → {category name}
- People: Home → People
- Awesome NEAR: Home → Awesome NEAR
- Search: Home → Search

`primary category` for project = first tag key. Acceptable heuristic.

## H1 audit on project page
Move the H1 into `ProjectHeader`. Current `<h2>What is X?` becomes `<h2>About {name}</h2>`. Lighthouse + accessibility benefit too.

## Direct-answer block
Sentence template:
```
{name} is {tagline}. {phaseSentence} {categoriesSentence}
```
- `phaseSentence`: "Live on NEAR mainnet." / "Currently in development on NEAR." / "" (inactive omitted)
- `categoriesSentence`: "Categories: DeFi, DEX." (first 3 tags)

Wrapped:
```html
<p class="answer-block" data-answer="true">…</p>
```

## Speakable schema
```jsonc
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".answer-block", ".faq-question"]
  }
}
```
Emitted on project and category pages. The `.faq-question` selector becomes active in ai-discovery-surfaces; emitting now is safe (no-op until selector exists).

## Article schema on project page
Co-exists with SoftwareApplication (different `@type`, both valid). Article uses:
- `headline`: `What is {name}?`
- `articleBody`: first 500 chars of `profile.description` stripped of markdown
- `datePublished`: API created_at or fallback
- `dateModified`: from precedence above
- `author`: NEAR Catalog Editorial (Organization)
- `mainEntityOfPage`: project canonical URL

## robots.ts shape
```ts
return {
  rules: [
    { userAgent: "*", allow: "/", disallow: ["/private/"] },
    { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User"], allow: "/" },
    { userAgent: ["ClaudeBot", "claude-web", "anthropic-ai"], allow: "/" },
    { userAgent: ["PerplexityBot", "Perplexity-User"], allow: "/" },
    { userAgent: ["Google-Extended", "Applebot-Extended"], allow: "/" },
    { userAgent: ["Amazonbot", "Meta-ExternalAgent"], allow: "/" },
  ],
  sitemap: `${site.url}/sitemap.xml`,
};
```

## Risks
- API field for `updated_at` may not exist → fallback hides freshness benefit. Mitigation: log a warning during sitemap build, open follow-up to request the field from API team.
- Adding `<h1>` could shift visual hierarchy. Mitigation: CSS-only — match existing visual weight of current top text.
- Article + SoftwareApplication on same page: search engines accept multiple JSON-LD blocks. No conflict.
