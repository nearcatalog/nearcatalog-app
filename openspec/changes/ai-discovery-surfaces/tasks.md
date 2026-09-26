# Tasks: ai-discovery-surfaces

## 1. Shared content modules (refactor enabler)
- [x] 1.1 Extract project content shape into `lib/content/project.ts` returning typed `ProjectContent` consumed by both HTML page and `.md` route
- [x] 1.2 Same for category: `lib/content/category.ts`
- [x] 1.3 Add `lib/render/markdown.ts` — pure function `renderProjectMarkdown(content): string`, `renderCategoryMarkdown(content): string`

## 2. .md companion routes + rewrites
- [x] 2.1 Add rewrites in `next.config.mjs` for `/project/:pid.md` and `/category/:cid.md`
- [x] 2.2 Create `app/md/project/[pid]/route.ts` returning `text/markdown` + canonical Link header
- [x] 2.3 Create `app/md/category/[cid]/route.ts` same pattern
- [x] 2.4 Append `.md` URLs to `app/sitemap.ts`

## 3. llms-full.txt + llms-index.txt + ai.txt
- [x] 3.1 Create `app/llms-full.txt/route.ts` — concatenation w/ 500 KB cap + truncation note
- [x] 3.2 Create `app/llms-index.txt/route.ts` — list of `.md` URLs
- [x] 3.3 Add `public/ai.txt` static file per design
- [x] 3.4 Update existing `/llms.txt` route to link to `/llms-full.txt` + `/llms-index.txt` in header

## 4. FAQ rendering + schema
- [x] 4.1 Add `lib/seo/faq.ts` with `FAQ_ENABLED` flag and `projectFaqs()` + `categoryFaqs()` builders
- [x] 4.2 Add `components/seo/faq-section.tsx` with `.faq` container + `.faq-question` summary
- [x] 4.3 Add `FaqPageSchema({ items })` to `components/seo/json-ld.tsx`
- [x] 4.4 Render `<FaqSection />` and `<FaqPageSchema />` on project page (gated by `FAQ_ENABLED`)
- [x] 4.5 Same on category page
- [x] 4.6 Document `NEXT_PUBLIC_FAQ_ENABLED` in `sample.env` and `README.md`

## 5. IndexNow
- [x] 5.1 Generate key locally via `openssl rand -hex 32`; document in `sample.env` as `INDEXNOW_KEY` — env documented; operator generates the actual key out-of-band and sets in Vercel
- [x] 5.2 Add `app/[key].txt/route.ts` dynamic verification (catch-all for `*.txt` at root; match against env, fall through otherwise) — implemented as `app/[key]/route.ts` matching `*.txt`
- [x] 5.3 Add `app/api/cron/indexnow/route.ts` — reads sitemap, batches, POSTs to api.indexnow.org
- [x] 5.4 Add CRON_SECRET check via Authorization header
- [x] 5.5 Migrate `vercel.json` (if present) to `vercel.ts` and add cron entry; otherwise create `vercel.ts` — used `vercel.json` to avoid `@vercel/config` dep; can migrate later if `vercel.ts` features needed
- [ ] 5.6 First deploy: trigger manually, verify Bing Webmaster Tools shows submissions (post-deploy)

## 6. CI lints
- [x] 6.1 `scripts/seo/lint-schema.ts` — JSON-LD validity per page
- [x] 6.2 `scripts/seo/lint-anchor-text.ts` — forbid "click here", "read more", "this link"
- [x] 6.3 `scripts/seo/lint-faq-uniqueness.ts` — Jaccard pairwise < 0.85
- [x] 6.4 `scripts/seo/lint-md-parity.ts` — Jaccard HTML ↔ .md ≥ 0.90
- [x] 6.5 Add `pnpm seo:lint` script to `package.json`
- [x] 6.6 Add GitHub Actions workflow `.github/workflows/seo-lint.yml`

## 7. Verification
- [ ] 7.1 Curl each new route — verify status, content-type, canonical header (post-deploy / local dev)
- [ ] 7.2 Paste project + category URLs into Google Rich Results Test — FAQPage validates (post-deploy)
- [ ] 7.3 Bing Webmaster Tools: confirm sitemap re-fetched, IndexNow status green (post-deploy)
- [ ] 7.4 Spot check: ask Perplexity "What is NEAR Catalog?" — confirm site cited (post-deploy)
- [ ] 7.5 Toggle `NEXT_PUBLIC_FAQ_ENABLED=false`, rebuild, verify no FAQ section AND no FAQPage JSON-LD on any page (post-deploy)
