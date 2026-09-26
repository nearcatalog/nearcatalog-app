# Design: ai-discovery-surfaces

## .md companion routes

### URL surface
- `/project/{pid}.md`
- `/category/{cid}.md`

### Routing
Use `next.config.mjs` rewrites because Next App Router segment names cannot contain dots:

```js
// next.config.mjs
rewrites: async () => [
  { source: '/project/:pid.md', destination: '/md/project/:pid' },
  { source: '/category/:cid.md', destination: '/md/category/:cid' },
]
```

Backing routes:
- `app/md/project/[pid]/route.ts`
- `app/md/category/[cid]/route.ts`

Each:
- `export const revalidate = 3600`
- Fetches same data the HTML route fetches (no duplicate fetch logic — extract to shared `lib/content/*` modules)
- Returns `text/markdown; charset=utf-8`
- Sets `Link: <https://nearcatalog.xyz/project/{pid}>; rel="canonical"`
- Sets `Cache-Control: public, max-age=300, stale-while-revalidate=86400`

### Markdown content shape (project)
```
# {name}

> {tagline}

**Categories:** {tag1}, {tag2}, …
**Phase:** {phase}
**Token:** {ticker} (if exists)
**Updated:** YYYY-MM-DD

## What is {name}?
{description markdown — passed through unchanged}

## Links
- Website: {url}
- X / Twitter: {url}
…

## Related categories
- [{tag1}](https://nearcatalog.xyz/category/{tag1})
…

---
Canonical HTML: https://nearcatalog.xyz/project/{pid}
```

### Markdown content shape (category)
```
# {category name}

> {N} projects on NEAR Protocol in the {category} category.

**Updated:** YYYY-MM-DD
**Projects (active):** {N}
**Projects (mainnet):** {M}

## Featured
- [{name}](https://nearcatalog.xyz/project/{pid}) — {tagline}
…

## All projects
- [{name}](…) — {tagline}
…

---
Canonical HTML: https://nearcatalog.xyz/category/{cid}
```

## llms-full.txt

Route: `app/llms-full.txt/route.ts`. Concatenation order:
1. Site overview (same head as `/llms.txt`)
2. All categories with project counts
3. Featured / hot projects (full description)
4. Top 200 projects by trending score (full description)
5. Truncation note if 500 KB hit

Each section starts with `## [<title>](<canonical HTML URL>)` so AI engines preserve link attribution.

`revalidate: 3600`. Plain `text/plain` content-type.

## llms-index.txt

Route: `app/llms-index.txt/route.ts`. Output: every `.md` URL, one per line, in the same order as the sitemap. No prose. Plain `text/plain`. `revalidate: 3600`.

## ai.txt

Static file at `public/ai.txt`:
```
# AI Usage Policy for nearcatalog.xyz

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: claude-web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: CCBot
Disallow: /

# Citations should preserve canonical URLs from /llms-full.txt and /sitemap.xml.
```

## FAQ blocks + env toggle

### Env contract
```
NEXT_PUBLIC_FAQ_ENABLED="true"   # default ON
```

Helper:
```ts
// lib/seo/faq.ts
export const FAQ_ENABLED = process.env.NEXT_PUBLIC_FAQ_ENABLED !== "false";
```

When `false`: no `<FaqSection />` render AND no `FAQPageSchema` JSON-LD. Both gated by the same flag (cloaking-safe).

### Component shape
```tsx
// components/seo/faq-section.tsx
export function FaqSection({ items }: { items: { q: string; a: string }[] }) {
  if (!FAQ_ENABLED || items.length === 0) return null;
  return (
    <section className="faq" aria-label="Frequently asked questions">
      <h2>Frequently asked questions</h2>
      {items.map((item, i) => (
        <details key={i} className="faq-item">
          <summary className="faq-question">{item.q}</summary>
          <div className="faq-answer">{item.a}</div>
        </details>
      ))}
    </section>
  );
}
```

Container class `faq` (per user request — toggleable per-instance via CSS too).

### Schema
`components/seo/json-ld.tsx` adds `FaqPageSchema({ items })`. Renders nothing when `!FAQ_ENABLED` or `items.length === 0`. 1:1 with `FaqSection` output to avoid cloaking.

### Project FAQ template
Data inputs: `profile.name`, `profile.tagline`, `profile.phase`, `profile.tokens`, `profile.tags`, `profile.linktree`, `dateModified`.

```ts
function projectFaqs(project): FaqItem[] {
  const name = project.profile.name;
  const tags = Object.values(project.profile.tags || {});
  const phase = project.profile.phase;
  const tokenTicker = Object.keys(project.profile.tokens || {})[0];
  const items: FaqItem[] = [];

  items.push({
    q: `What is ${name}?`,
    a: `${name} is ${project.profile.tagline}.${phase ? ` Current status: ${phase}.` : ""}`,
  });

  if (tags.length) {
    items.push({
      q: `Which categories does ${name} belong to?`,
      a: `${tags.join(", ")}. Browse related projects at nearcatalog.xyz/category/${Object.keys(project.profile.tags)[0]}.`,
    });
  }

  if (tokenTicker) {
    items.push({
      q: `Does ${name} have a token?`,
      a: `Yes — ${tokenTicker}. View token details on the project page.`,
    });
  }

  items.push({
    q: `Where can I find ${name} on social media?`,
    a: `Linktree available on nearcatalog.xyz/project/${project.slug}.`,
  });

  if (phase) {
    items.push({
      q: `Is ${name} active on NEAR Protocol?`,
      a: phase.toLowerCase() === "inactive"
        ? `${name} is currently inactive.`
        : `Yes — ${name} is currently ${phase.toLowerCase()} on NEAR Protocol.`,
    });
  }

  return items;
}
```

### Category FAQ template
Inputs: category name, projects in category, dateModified.

```ts
function categoryFaqs(catName, projects): FaqItem[] {
  const mainnet = projects.filter(p => (p.profile.phase || "").toLowerCase() === "mainnet");
  const top3 = projects.slice(0, 3).map(p => p.profile.name).join(", ");
  return [
    { q: `How many ${catName} projects exist on NEAR?`, a: `${projects.length} ${catName} projects catalogued on NEAR Protocol.` },
    { q: `Which ${catName} projects on NEAR are on mainnet?`, a: `${mainnet.length} mainnet projects${top3 ? `, including ${top3}` : ""}.` },
    { q: `Where to start exploring ${catName} on NEAR?`, a: `Browse the full ${catName} list at nearcatalog.xyz/category/{cid}.` },
    { q: `How is the ${catName} category curated?`, a: `NEAR Catalog Editorial reviews submissions. Suggest projects via submit.nearcatalog.xyz.` },
  ];
}
```

### Uniqueness lint
CI script `scripts/lint-faq-uniqueness.ts`:
- For each pair of FAQ sets, compute Jaccard similarity on tokens.
- Fail build if any pair > 0.85.

## IndexNow

### Key
`openssl rand -hex 32` → stored as env `INDEXNOW_KEY`. Hosted at `app/[key].txt/route.ts` dynamic check against env, returns the key when path matches.

### Endpoint
`app/api/cron/indexnow/route.ts`:
1. Fetch sitemap URLs (call `sitemap()` internally)
2. Batch in groups of 10000
3. POST JSON:
```json
{
  "host": "nearcatalog.xyz",
  "key": "<KEY>",
  "keyLocation": "https://nearcatalog.xyz/<KEY>.txt",
  "urlList": ["…"]
}
```
to `https://api.indexnow.org/indexnow`.

Schedule via `vercel.ts`:
```ts
crons: [{ path: "/api/cron/indexnow", schedule: "0 4 * * *" }]
```
Daily at 04:00 UTC.

Auth: cron route checks `CRON_SECRET` env via `Authorization: Bearer <secret>` header (Vercel injects this).

## Sitemap additions
`.md` companions appended:
```ts
const projectMd = projectSlugs.map(slug => ({
  url: `${BASE_URL}/project/${slug}.md`,
  lastModified: projectDateModified(projects[slug]),
  priority: 0.4,
}));
```

## CI lints
New scripts under `scripts/seo/`:
- `lint-schema.ts` — fetches built pages, extracts JSON-LD blocks, validates JSON + required fields
- `lint-anchor-text.ts` — greps app/components for forbidden anchor strings
- `lint-faq-uniqueness.ts` — described above
- `lint-md-parity.ts` — fetches HTML + .md companion, computes Jaccard

Wire into `package.json`: `pnpm seo:lint` runs all four. Add to GitHub Actions on PR.

## Risks
- `.md` companion content drift from HTML if shared content module not actually shared. Mitigation: enforce single source via shared `lib/content/*` modules; parity lint catches drift.
- FAQ env flag accidentally disabled in prod → loss of schema. Mitigation: default `"true"`, document in README + sample.env.
- IndexNow rate limits unknown for large batches. Mitigation: start daily; observe; throttle if rejected.
- llms-full.txt 500 KB cap may truncate important projects. Mitigation: order by trending desc; log truncation; revisit cap if engines fetch partial.
