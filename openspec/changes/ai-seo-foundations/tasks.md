# Tasks: ai-seo-foundations

## 1. dateModified plumbing
- [x] 1.1 Inspect `lib/near-catalog.ts` + sample API response — confirm if `updated_at` exists on project/category (NOT typed in ProjectProfile/ProjectRecord; helper probes optional fields with fallback)
- [x] 1.2 Add `lib/seo/date-modified.ts` with `projectDateModified(project)`, `categoryDateModified(projects)`, `routeDateModified(filePath)` (git mtime)
- [x] 1.3 Update `app/sitemap.ts` to use these helpers per URL (project, category, static routes)
- [x] 1.4 Thread date into `ProjectSchema` / new Article schema

## 2. WebSite + SearchAction schema
- [x] 2.1 Create `WebSiteSchema()` in `components/seo/json-ld.tsx`
- [x] 2.2 Render in `app/layout.tsx` head next to Organization JSON-LD

## 3. Per-page canonical
- [x] 3.1 Audit all `generateMetadata` functions: project, category, people, awesome-near, search, map, trending, policy/*
- [x] 3.2 Add `alternates.canonical` to each with absolute URL

## 4. Breadcrumb wiring
- [x] 4.1 Create `lib/seo/breadcrumbs.ts` with builders per route type
- [x] 4.2 Render `<BreadcrumbSchema />` on project, category, people, awesome-near, search, map pages

## 5. robots.ts AI allow-list
- [x] 5.1 Update `app/robots.ts` to multi-rule shape per design

## 6. H1 audit + answer-block + Speakable
- [x] 6.1 Audit every route for exactly one `<h1>`; fix offenders (project page primarily) — project page H1 in ProjectHeader; category/search/map/trending/awesome-near got sr-only H1 above shared SectionHeading
- [x] 6.2 Add `<p class="answer-block">` template to project page above hero
- [x] 6.3 Add `<p class="answer-block">` to category page (one-liner: `Browse N {category} projects on NEAR…`)
- [x] 6.4 Add `SpeakableSchema()` helper in json-ld.tsx; render on project + category pages

## 7. Article schema on project page
- [x] 7.1 Add `ArticleSchema({ project, dateModified, datePublished })` helper
- [x] 7.2 Strip markdown for `articleBody` via simple regex (no extra dep)
- [x] 7.3 Render alongside `ProjectSchema` on project page
- [x] 7.4 Hide visible "Updated YYYY-MM-DD" byline when no real signal available (no byline rendered until API exposes updated_at; current page omits)

## 8. Verification
- [ ] 8.1 Manual: paste project + category URL into Google Rich Results Test (post-deploy)
- [ ] 8.2 Manual: paste into Schema.org validator (post-deploy)
- [ ] 8.3 Lighthouse run on home + project + category — SEO score = 100 (post-deploy)
- [ ] 8.4 `curl -A Googlebot $URL | grep '<h1\|application/ld+json'` confirms SSR (post-deploy)
- [x] 8.5 Update `openspec/specs/seo/spec.md` (or create) reflecting capability — REQs live in `openspec/changes/ai-seo-foundations/specs/seo/spec.md`; promote to canonical `openspec/specs/seo/spec.md` at archive time
