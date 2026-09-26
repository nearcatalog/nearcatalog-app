import site from "@/config/site";
import { ProjectContent } from "@/lib/content/project";
import { CategoryContent } from "@/lib/content/category";

const BASE_URL = site.url;

export function renderProjectMarkdown(c: ProjectContent): string {
  const tagEntries = Object.entries(c.tags);
  const tagList = tagEntries.map(([, v]) => v).join(", ");
  const lines: string[] = [];
  lines.push(`# ${c.name}`, "");
  if (c.tagline) lines.push(`> ${c.tagline}`, "");
  if (tagList) lines.push(`**Categories:** ${tagList}`);
  if (c.phase) lines.push(`**Phase:** ${c.phase}`);
  if (c.tokenTicker) lines.push(`**Token:** ${c.tokenTicker}`);
  lines.push(`**Updated:** ${c.dateModifiedIso}`, "");
  lines.push(`## What is ${c.name}?`, "");
  lines.push(c.description || c.tagline || "", "");

  const linkEntries = Object.entries(c.linktree).filter(
    ([, v]) => v && typeof v === "string",
  ) as [string, string][];
  if (linkEntries.length) {
    lines.push("## Links", "");
    for (const [k, v] of linkEntries) {
      lines.push(`- ${labelFor(k)}: ${v}`);
    }
    lines.push("");
  }

  if (tagEntries.length) {
    lines.push("## Related categories", "");
    for (const [slug, name] of tagEntries) {
      lines.push(`- [${name}](${BASE_URL}/category/${slug})`);
    }
    lines.push("");
  }

  lines.push("---", `Canonical HTML: ${BASE_URL}/project/${c.slug}`);
  return lines.join("\n");
}

export function renderCategoryMarkdown(c: CategoryContent): string {
  const lines: string[] = [];
  lines.push(`# ${c.title}`, "");
  lines.push(
    `> ${c.projects.length} projects on NEAR Protocol in the ${c.title} category.`,
    "",
  );
  lines.push(`**Updated:** ${c.dateModifiedIso}`);
  lines.push(`**Projects (active):** ${c.activeCount}`);
  lines.push(`**Projects (mainnet):** ${c.mainnetCount}`, "");

  const featured = c.projects.slice(0, 5);
  if (featured.length) {
    lines.push("## Featured", "");
    for (const p of featured) {
      lines.push(
        `- [${p.profile.name}](${BASE_URL}/project/${p.slug}) — ${p.profile.tagline || ""}`,
      );
    }
    lines.push("");
  }

  if (c.projects.length) {
    lines.push("## All projects", "");
    for (const p of c.projects) {
      lines.push(
        `- [${p.profile.name}](${BASE_URL}/project/${p.slug}) — ${p.profile.tagline || ""}`,
      );
    }
    lines.push("");
  }

  lines.push("---", `Canonical HTML: ${BASE_URL}/category/${c.cid}`);
  return lines.join("\n");
}

function labelFor(key: string): string {
  const map: Record<string, string> = {
    website: "Website",
    github: "GitHub",
    twitter: "X / Twitter",
    medium: "Medium",
    discord: "Discord",
    telegram: "Telegram",
    potlock: "Potlock",
  };
  return map[key] || key.charAt(0).toUpperCase() + key.slice(1);
}
