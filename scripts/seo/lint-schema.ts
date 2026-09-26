#!/usr/bin/env node
export {};
/**
 * Fetches a sample of built pages and validates embedded JSON-LD blocks.
 * Requires the dev or production server running at SEO_LINT_BASE_URL (default http://localhost:3000).
 */

const BASE = process.env.SEO_LINT_BASE_URL || "http://localhost:3000";

const SAMPLE_PATHS = [
  "/",
  "/search",
  "/awesome-near",
  "/people",
  "/trending",
  "/map",
];

const REQUIRED_FIELDS: Record<string, string[]> = {
  Organization: ["name", "url"],
  WebSite: ["name", "url"],
  BreadcrumbList: ["itemListElement"],
  Article: ["headline", "author", "datePublished"],
  SoftwareApplication: ["name", "url"],
  FAQPage: ["mainEntity"],
  WebPage: [],
};

async function main() {
  const failures: string[] = [];
  for (const path of SAMPLE_PATHS) {
    const url = `${BASE}${path}`;
    const res = await fetch(url);
    if (!res.ok) {
      failures.push(`${url} → ${res.status}`);
      continue;
    }
    const html = await res.text();
    const matches = [
      ...html.matchAll(
        /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
      ),
    ];
    if (matches.length === 0) {
      failures.push(`${url} → no JSON-LD blocks`);
      continue;
    }
    for (const m of matches) {
      try {
        const parsed = JSON.parse(m[1]);
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        for (const node of arr) {
          const t = node["@type"];
          const req = REQUIRED_FIELDS[t];
          if (req) {
            for (const f of req) {
              if (node[f] == null) {
                failures.push(`${url} → ${t} missing field "${f}"`);
              }
            }
          }
        }
      } catch (e) {
        failures.push(`${url} → invalid JSON-LD: ${(e as Error).message}`);
      }
    }
  }
  if (failures.length) {
    console.error("[lint-schema] failures:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`[lint-schema] ok across ${SAMPLE_PATHS.length} pages`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
