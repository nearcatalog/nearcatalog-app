import { ProjectRecord } from "@/lib/types";
import site from "@/config/site";

export const FAQ_ENABLED = process.env.NEXT_PUBLIC_FAQ_ENABLED !== "false";

export type FaqItem = { q: string; a: string };

export function projectFaqs(project: ProjectRecord): FaqItem[] {
  const profile = project.profile || ({} as ProjectRecord["profile"]);
  const name = profile.name;
  const tagEntries = Object.entries(profile.tags || {});
  const tagNames = tagEntries.map(([, v]) => v);
  const phase = profile.phase;
  const tokenTicker = profile.tokens
    ? Object.keys(profile.tokens)[0]
    : undefined;
  const primaryTag = tagEntries[0]?.[0];

  const items: FaqItem[] = [];

  const phaseSentence = phase
    ? phase.toLowerCase() === "mainnet"
      ? " Live on NEAR mainnet."
      : phase.toLowerCase() === "inactive"
        ? ""
        : ` Currently ${phase.toLowerCase()} on NEAR Protocol.`
    : "";
  const categoriesSentence = tagNames.length
    ? ` Categories: ${tagNames.slice(0, 3).join(", ")}.`
    : "";
  items.push({
    q: `What is ${name}?`,
    a: `${name} is ${profile.tagline || "a project on NEAR Protocol"}.${phaseSentence}${categoriesSentence}`,
  });

  if (tagNames.length && primaryTag) {
    items.push({
      q: `Which categories does ${name} belong to?`,
      a: `${tagNames.join(", ")}. Browse related projects at ${site.url}/category/${primaryTag}.`,
    });
  }

  if (tokenTicker) {
    items.push({
      q: `Does ${name} have a token?`,
      a: `Yes — ${tokenTicker}. View token details on ${site.url}/project/${project.slug}.`,
    });
  }

  items.push({
    q: `Where can I find ${name} on social media?`,
    a: `Linktree available on ${site.url}/project/${project.slug}.`,
  });

  if (phase) {
    items.push({
      q: `Is ${name} active on NEAR Protocol?`,
      a:
        phase.toLowerCase() === "inactive"
          ? `${name} is currently inactive.`
          : `Yes — ${name} is currently ${phase.toLowerCase()} on NEAR Protocol.`,
    });
  }

  return items;
}

export function categoryFaqs(
  cid: string,
  catName: string,
  projects: ProjectRecord[],
): FaqItem[] {
  const mainnet = projects.filter(
    (p) => (p.profile?.phase || "").toLowerCase() === "mainnet",
  );
  const top3 = projects
    .slice(0, 3)
    .map((p) => p.profile?.name)
    .filter(Boolean)
    .join(", ");
  return [
    {
      q: `How many ${catName} projects exist on NEAR?`,
      a: `${projects.length} ${catName} projects catalogued on NEAR Protocol.`,
    },
    {
      q: `Which ${catName} projects on NEAR are on mainnet?`,
      a: `${mainnet.length} mainnet projects${top3 ? `, including ${top3}` : ""}.`,
    },
    {
      q: `Where to start exploring ${catName} on NEAR?`,
      a: `Browse the full ${catName} list at ${site.url}/category/${cid}.`,
    },
    {
      q: `How is the ${catName} category curated?`,
      a: `NEAR Catalog Editorial reviews submissions. Suggest projects via submit.nearcatalog.xyz.`,
    },
  ];
}
