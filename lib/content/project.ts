import { ProjectRecord } from "@/lib/types";
import { projectDateModified } from "@/lib/seo/date-modified";

export type ProjectContent = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl?: string;
  phase?: string;
  tags: Record<string, string>;
  tokens: Record<string, unknown>;
  tokenTicker?: string;
  linktree: Record<string, string | undefined>;
  dateModified: Date;
  dateModifiedIso: string;
};

export function toProjectContent(project: ProjectRecord): ProjectContent {
  const profile = project.profile || ({} as ProjectRecord["profile"]);
  const tokens = (profile.tokens || {}) as Record<string, unknown>;
  const tokenTicker = Object.keys(tokens)[0];
  const dateModified = projectDateModified(project);
  return {
    slug: project.slug,
    name: profile.name,
    tagline: profile.tagline,
    description: profile.description || "",
    imageUrl: profile.image?.url,
    phase: profile.phase,
    tags: profile.tags || {},
    tokens,
    tokenTicker,
    linktree: (profile.linktree || {}) as Record<string, string | undefined>,
    dateModified,
    dateModifiedIso: dateModified.toISOString().slice(0, 10),
  };
}
