<!-- markdownlint-disable MD014 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD029 -->

<div align="center">

<h1 style="font-size: 2.5rem; font-weight: bold;">📒NEARCatalog App standalone version</h1>

  <p>
    <strong>Ecosystem directory for <a href="https://near.org/" target="_blank">NEAR Protocol</a></strong>
  </p>

</div>

<details>
  <summary>Table of Contents</summary>

- [Getting Started](#getting-started)
  - [Installing dependencies](#installing-dependencies)
  - [Running the app](#running-the-app)
  - [Building for production](#building-for-production)
  - [Running tests](#running-tests)
- [Project Structure](#project-structure)
  - [Routes](#routes)
  - [Global State](#global-state)
- [Contributing](#contributing)

</details>

## Getting Started

### Installing dependencies

```bash
npm install
```

### Config .env file

here is sample env file:

```
NEAR_CATALOG_API=https://api.nearcatalog.xyz
NEXT_PUBLIC_NEAR_CATALOG_API=https://api.nearcatalog.xyz
BASE_URL=http://nearcatalog.xyz

# Optional. Set "false" to hide programmatic FAQ sections + FAQPage JSON-LD.
NEXT_PUBLIC_FAQ_ENABLED=true

# Optional. IndexNow integration. Generate via `openssl rand -hex 32`.
INDEXNOW_KEY=
CRON_SECRET=
```

### SEO / AI surfaces

Routes shipped:

- `/sitemap.xml` — HTML + `.md` companion URLs with `lastmod` (project = API `updated_at` w/ fallback to build time; category = max of children; static routes = git mtime).
- `/robots.txt` — wildcard `Allow`, plus explicit allow rules for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Amazonbot, Meta-ExternalAgent.
- `/llms.txt` — header overview + featured projects + categories list, links to full + index.
- `/llms-full.txt` — concatenated Markdown bodies of categories + featured + projects, capped at 500 KB with truncation note.
- `/llms-index.txt` — newline-separated list of every `.md` URL.
- `/ai.txt` — explicit per-bot AI usage policy.
- Markdown companions: `/project/<pid>.md`, `/category/<cid>.md` — `text/markdown` with `Link: <canonical>; rel="canonical"` header. Rewritten from `/md/...` backing routes.
- JSON-LD per page: Organization (site-wide), WebSite + SearchAction, BreadcrumbList, Article (project), SoftwareApplication (project), Speakable, FAQPage (project + category, env-gated).
- FAQ section on project + category pages — visible `<details>` blocks + matching FAQPage JSON-LD. Toggle off both with `NEXT_PUBLIC_FAQ_ENABLED=false` (cloaking-safe: section AND schema disappear together).
- IndexNow daily ping via `/api/cron/indexnow` (Vercel Cron, scheduled in `vercel.json` at 04:00 UTC).

#### Setup checklist (first deploy / new environment)

1. **Env vars in Vercel** (Project → Settings → Environment Variables):
   - `NEAR_CATALOG_API`, `NEXT_PUBLIC_NEAR_CATALOG_API`, `BASE_URL` (existing)
   - `NEXT_PUBLIC_FAQ_ENABLED` — set `false` to hide FAQ sections + schema; leave unset/`true` to show them.
   - `INDEXNOW_KEY` — generate: `openssl rand -hex 32`. The key file is auto-served at `/<KEY>.txt` via [app/[key]/route.ts](app/[key]/route.ts).
   - `CRON_SECRET` — generate: `openssl rand -hex 32`. Vercel Cron injects `Authorization: Bearer <CRON_SECRET>` automatically; the route at [app/api/cron/indexnow/route.ts](app/api/cron/indexnow/route.ts) rejects requests without it.
2. **Bing / IndexNow registration**:
   - Sign in to [Bing Webmaster Tools](https://www.bing.com/webmasters), add the site, verify ownership.
   - Submit `https://nearcatalog.xyz/sitemap.xml`.
   - Under IndexNow, register the same `INDEXNOW_KEY`. Bing infers the key file location from the host.
3. **Smoke-test endpoints** after deploy:
   ```bash
   BASE=https://nearcatalog.xyz
   curl -sI $BASE/sitemap.xml | head -3
   curl -sI $BASE/llms.txt | head -3
   curl -sI $BASE/llms-full.txt | head -3
   curl -sI $BASE/llms-index.txt | head -3
   curl -sI $BASE/ai.txt | head -3
   curl -sI $BASE/project/<some-pid>.md | grep -i 'content-type\|link'
   curl -sI $BASE/category/<some-cid>.md | grep -i 'content-type\|link'
   curl -sI $BASE/$INDEXNOW_KEY.txt   # 200
   ```
4. **Trigger first IndexNow run manually**:
   ```bash
   curl -X GET https://nearcatalog.xyz/api/cron/indexnow \
     -H "Authorization: Bearer $CRON_SECRET"
   ```
   Expected JSON: `{ ok: true, host, total, results: [{ batch, status, count }] }`. Status `200` or `202` from IndexNow is success.
5. **Verify schemas**:
   - Paste a project URL + a category URL into [Google Rich Results Test](https://search.google.com/test/rich-results) — expect Article, BreadcrumbList, SoftwareApplication, FAQPage (or none if FAQ disabled), Speakable.
   - Paste home into [Schema.org validator](https://validator.schema.org/) — expect Organization, WebSite.
6. **Confirm bot access**: `curl -A "GPTBot" https://nearcatalog.xyz/ | grep '<h1\|ld+json'` — should return SSR HTML + JSON-LD.

#### Routine maintenance

- **Adding a new programmatic route**: also add it to [app/sitemap.ts](app/sitemap.ts) `staticRoutes`, give it a `<h1>` (use `sr-only` if shared `SectionHeading` already renders `<h2>`), wire `<BreadcrumbSchema>`, and add `alternates.canonical` in its `generateMetadata`.
- **Editing FAQ templates**: [lib/seo/faq.ts](lib/seo/faq.ts). After editing, run `pnpm seo:lint:faq` to confirm pairwise Jaccard similarity stays under 0.85 across pages.
- **Editing Markdown companions**: shape lives in [lib/render/markdown.ts](lib/render/markdown.ts); content shape in [lib/content/project.ts](lib/content/project.ts) + [lib/content/category.ts](lib/content/category.ts). After changes run `pnpm seo:lint:md-parity` against a running server to confirm HTML ↔ .md Jaccard ≥ 0.90.
- **Disabling FAQ temporarily**: set `NEXT_PUBLIC_FAQ_ENABLED=false` in Vercel → redeploy. Both visible section + JSON-LD disappear together.
- **Rotating IndexNow key**: generate new `INDEXNOW_KEY`, update Vercel env, redeploy, re-register in Bing Webmaster Tools (old key file 404s once env rotates).
- **Pausing IndexNow**: disable the cron entry in [vercel.json](vercel.json) or remove `INDEXNOW_KEY` (route returns 500). No code change needed.
- **Run all SEO lints locally before a release**:
  ```bash
  pnpm build && pnpm start &      # start server in background
  SEO_LINT_BASE_URL=http://localhost:3000 pnpm seo:lint
  ```
  CI runs the same on every PR via [.github/workflows/seo-lint.yml](.github/workflows/seo-lint.yml).

#### Where things live

| Concern | File |
|---|---|
| JSON-LD components | [components/seo/json-ld.tsx](components/seo/json-ld.tsx) |
| FAQ component | [components/seo/faq-section.tsx](components/seo/faq-section.tsx) |
| FAQ templates + env flag | [lib/seo/faq.ts](lib/seo/faq.ts) |
| Breadcrumb builders | [lib/seo/breadcrumbs.ts](lib/seo/breadcrumbs.ts) |
| dateModified resolution | [lib/seo/date-modified.ts](lib/seo/date-modified.ts) |
| Markdown content shapes | [lib/content/project.ts](lib/content/project.ts), [lib/content/category.ts](lib/content/category.ts) |
| Markdown rendering | [lib/render/markdown.ts](lib/render/markdown.ts) |
| Sitemap | [app/sitemap.ts](app/sitemap.ts) |
| robots | [app/robots.ts](app/robots.ts) |
| LLM endpoints | [app/llms.txt/route.ts](app/llms.txt/route.ts), [app/llms-full.txt/route.ts](app/llms-full.txt/route.ts), [app/llms-index.txt/route.ts](app/llms-index.txt/route.ts) |
| `.md` companions | [app/md/project/[pid]/route.ts](app/md/project/[pid]/route.ts), [app/md/category/[cid]/route.ts](app/md/category/[cid]/route.ts) |
| IndexNow key file | [app/[key]/route.ts](app/[key]/route.ts) |
| IndexNow cron | [app/api/cron/indexnow/route.ts](app/api/cron/indexnow/route.ts), [vercel.json](vercel.json) |
| Static AI policy | [public/ai.txt](public/ai.txt) |
| SEO lints | [scripts/seo/](scripts/seo/) |

### Running the app

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for production

```bash
npm run build
```

### Running tests

```bash
npm run test
```

See the full [testing guide](./playwright-tests/README.md).

## Project Structure

This is a [Next.js](https://nextjs.org/) project bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load [Manrope](https://fonts.google.com/specimen/Manrope), a custom Google Font.

### Routes

This project uses the [Next.js App Router](https://nextjs.org/docs/app), and so the routes are defined in the `app` folder. There are three main pages:

- `/`: Home page of the application. It displays a list of projects that are available on the NEAR platform.
- `/project/:projectId`: Displays the details of a specific project. It includes information about the project, such as the name, description, and the list of tags associated with the project.
- `/category/:categoryId`: Displays a list of projects that are associated with a specific category.

### Global State

[zustand](https://github.com/pmndrs/zustand) is used to manage global state. It is a state management library that provides a simple and scalable solution for managing application state in a React or Preact application.

The state is stored in the `store` folder. There are two stores that are used in this project:

- `search-store.ts`: Manages the search state, including the search query and the tags that are selected.
- `tags-modal-store.ts`: Manages the state of the tags modal for mobile devices.
- `search-modal-store.ts`: Manages the state of search modal.

### Public APIs 

You can see the public APIs of NEARCatalog Indexer here: https://docs.nearcatalog.xyz/

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you're interested in contributing to this project, please read the [contribution guide](./CONTRIBUTING.md).