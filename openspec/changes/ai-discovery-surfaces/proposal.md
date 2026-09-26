# Change: ai-discovery-surfaces

## Why
Foundations (ai-seo-foundations) ship core schemas + freshness signals. This change adds the surfaces non-Google AI engines explicitly prefer: Markdown companions, llms.txt expansions, programmatic FAQ blocks with FAQPage schema, and immediate index notification via IndexNow.

Together these target:
- Perplexity / ChatGPT Search citation accuracy (they probe `.md` URLs)
- LLM agent comprehension (llms-full.txt fits in model context)
- Google AI Overview citation (FAQPage + HowTo are the top-cited schemas)
- Bing index latency → ChatGPT Search freshness (IndexNow)

## What changes
1. **`.md` companion routes** for `/project/[pid]` and `/category/[cid]` via `next.config.mjs` rewrites: URL surface `/project/foo.md` and `/category/defi.md`. Each returns plain `text/markdown` with `Link: <html-canonical>; rel="canonical"` header.
2. **`/llms-full.txt`** route — concatenated Markdown bodies of categories + featured projects + top N projects (ordered by trending), capped at 500 KB.
3. **`/llms-index.txt`** — plain text list of every `.md` URL (one per line).
4. **`/ai.txt`** — explicit AI usage policy file at root.
5. **FAQ blocks + FAQPage schema** on project and category pages. Template-driven from per-page data. Each Q wrapped in `<details class="faq-question">…</details>` for native toggle + matching CSS selector for Speakable.
6. **FAQ toggle via env**: `NEXT_PUBLIC_FAQ_ENABLED` (default `"true"`). When `"false"`, page renders neither visible FAQ nor FAQPage JSON-LD (prevents cloaking).
7. **IndexNow** — generate key, host at `/<KEY>.txt`, add post-deploy cron route `/api/cron/indexnow` that reads sitemap and POSTs URLs in batches of 10K to `https://api.indexnow.org/indexnow`. Scheduled via Vercel Cron daily (or `vercel.ts` cron block).
8. **Sitemap update** — include `.md` companion URLs alongside HTML URLs.
9. **CI lints**:
   - JSON-LD validity (parse + required fields per `@type`)
   - Anchor text scan (fail on "click here" / "read more" / "this link")
   - FAQ uniqueness across programmatic pages (Jaccard < 0.85 pairwise sample)
   - `.md` ↔ HTML body parity (Jaccard ≥ 0.90)

## Non-goals
- Author Person entities (still Organization-as-author)
- HowTo schema (no procedural pages today)
- Per-page OG image regeneration (already handled by `opengraph-image.tsx`)
- Translation / i18n surfaces

## Impact
- Two new dynamic routes per project/category (HTML + .md). Cache via `revalidate: 3600` to match existing llms.txt pattern.
- llms-full.txt is heavy at first generation; subsequent ISR cheap.
- IndexNow cron runs daily; sends up to ~10K URLs in one batch.
- FAQ render gated by env var — operator can disable without code change.

## Open question
Whether `vercel.ts` is preferred over `vercel.json` for cron declaration. Vercel knowledge update (Feb 2026) recommends `vercel.ts`. Confirm during task 7.
