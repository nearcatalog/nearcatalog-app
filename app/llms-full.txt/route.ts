import { NextResponse } from "next/server";
import {
  fetchAllProjects,
  fetchCategories,
  fetchHotProjects,
} from "@/lib/near-catalog";
import { toProjectContent } from "@/lib/content/project";
import { renderProjectMarkdown } from "@/lib/render/markdown";
import site from "@/config/site";

export const revalidate = 3600;

const MAX_BYTES = 500 * 1024;

export async function GET() {
  const [allProjects, hotProjects, categories] = await Promise.all([
    fetchAllProjects(),
    fetchHotProjects(),
    fetchCategories(),
  ]);

  const parts: string[] = [];
  parts.push(
    `# NEAR Catalog — Full Knowledge Base`,
    ``,
    `NEAR Catalog is the ecosystem directory for NEAR Protocol. This document concatenates Markdown bodies of categories and projects for LLM ingestion.`,
    ``,
    `- Base URL: ${site.url}`,
    `- Sitemap: ${site.url}/sitemap.xml`,
    `- Index: ${site.url}/llms-index.txt`,
    ``,
    `## [Categories](${site.url}/search)`,
    ``,
  );
  for (const [cid, label] of Object.entries(categories || {})) {
    parts.push(`- [${label}](${site.url}/category/${cid})`);
  }
  parts.push("");

  const hot = Object.values(hotProjects || {});
  parts.push(`## [Featured projects](${site.url}/trending)`, ``);
  for (const project of hot) {
    const content = toProjectContent(project);
    parts.push(
      `## [${content.name}](${site.url}/project/${content.slug})`,
      "",
      renderProjectMarkdown(content),
      "",
    );
  }

  const featuredSlugs = new Set(hot.map((p) => p.slug));
  const rest = Object.values(allProjects || {}).filter(
    (p) => !featuredSlugs.has(p.slug),
  );
  parts.push(`## [All projects](${site.url}/search)`, ``);
  let body = parts.join("\n");
  let truncated = false;

  for (const project of rest) {
    const content = toProjectContent(project);
    const chunk =
      `\n## [${content.name}](${site.url}/project/${content.slug})\n\n` +
      renderProjectMarkdown(content) +
      `\n`;
    if (Buffer.byteLength(body + chunk, "utf8") > MAX_BYTES) {
      truncated = true;
      break;
    }
    body += chunk;
  }

  if (truncated) {
    body += `\n\n---\n[truncated at ${MAX_BYTES} bytes — fetch /llms-index.txt for full list]\n`;
  }

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
