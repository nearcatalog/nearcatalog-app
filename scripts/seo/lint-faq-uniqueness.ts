#!/usr/bin/env node
/**
 * Computes pairwise Jaccard similarity across FAQ sets generated for each project / category.
 * Fails if any pair > 0.85 within the same template (project ↔ project, category ↔ category).
 */
import {
  fetchAllProjects,
  fetchCategories,
  fetchProjectCategory,
} from "../../lib/near-catalog";
import { projectFaqs, categoryFaqs } from "../../lib/seo/faq";

const THRESHOLD = 0.85;
const SAMPLE_CAP = 50;

function tokens(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter || 1);
}

function setsFromFaqs(faqs: { q: string; a: string }[]): Set<string> {
  return tokens(faqs.map((f) => f.q + " " + f.a).join(" "));
}

async function main() {
  const projects = Object.values(await fetchAllProjects()).slice(0, SAMPLE_CAP);
  const projectSets = projects.map((p) => ({
    id: p.slug,
    set: setsFromFaqs(projectFaqs(p)),
  }));

  const categoriesMap = await fetchCategories();
  const catIds = Object.keys(categoriesMap).slice(0, SAMPLE_CAP);
  const categorySets: { id: string; set: Set<string> }[] = [];
  for (const cid of catIds) {
    const cat = await fetchProjectCategory(cid);
    if (!cat?.cat_title) continue;
    const items = categoryFaqs(cid, cat.cat_title, Object.values(cat.data || {}));
    categorySets.push({ id: cid, set: setsFromFaqs(items) });
  }

  const failures: string[] = [];
  const check = (label: string, arr: { id: string; set: Set<string> }[]) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const sim = jaccard(arr[i].set, arr[j].set);
        if (sim > THRESHOLD) {
          failures.push(
            `${label} ${arr[i].id} vs ${arr[j].id} → ${sim.toFixed(3)}`,
          );
        }
      }
    }
  };
  check("project", projectSets);
  check("category", categorySets);

  if (failures.length) {
    console.error("[lint-faq-uniqueness] failures:");
    for (const f of failures.slice(0, 20)) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(
    `[lint-faq-uniqueness] ok (${projectSets.length} projects, ${categorySets.length} categories)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
