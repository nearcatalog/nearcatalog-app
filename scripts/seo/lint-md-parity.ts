#!/usr/bin/env node
export {};
/**
 * Spot-checks HTML ↔ .md parity. Requires server at SEO_LINT_BASE_URL.
 * Fails if any sampled pair has Jaccard token similarity < 0.90 on visible body text.
 */

const BASE = process.env.SEO_LINT_BASE_URL || "http://localhost:3000";
const THRESHOLD = 0.9;

function tokens(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/<[^>]+>/g, " ")
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 2),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter || 1);
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

async function checkPair(htmlUrl: string, mdUrl: string): Promise<string | null> {
  const [html, md] = await Promise.all([fetchText(htmlUrl), fetchText(mdUrl)]);
  const sim = jaccard(tokens(html), tokens(md));
  if (sim < THRESHOLD) {
    return `${htmlUrl} ↔ ${mdUrl} → ${sim.toFixed(3)}`;
  }
  return null;
}

async function main() {
  const samples: [string, string][] = [];
  try {
    const res = await fetch(`${BASE}/llms-index.txt`);
    const lines = (await res.text()).split("\n").filter(Boolean).slice(0, 10);
    for (const mdUrl of lines) {
      const htmlUrl = mdUrl.replace(/\.md$/, "");
      samples.push([htmlUrl, mdUrl]);
    }
  } catch {
    console.error(`[lint-md-parity] cannot reach ${BASE}/llms-index.txt`);
    process.exit(1);
  }

  const failures: string[] = [];
  for (const [h, m] of samples) {
    const r = await checkPair(h, m).catch((e) => `${h} ↔ ${m} → ${e.message}`);
    if (r) failures.push(r);
  }
  if (failures.length) {
    console.error("[lint-md-parity] failures:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`[lint-md-parity] ok across ${samples.length} pairs`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
