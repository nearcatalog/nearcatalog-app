import { ProjectCategory, ProjectRecord } from "@/lib/types";
import { categoryDateModified } from "@/lib/seo/date-modified";

export type CategoryContent = {
  cid: string;
  title: string;
  description: string;
  projects: ProjectRecord[];
  mainnetCount: number;
  activeCount: number;
  dateModified: Date;
  dateModifiedIso: string;
};

export function toCategoryContent(
  cid: string,
  category: ProjectCategory,
): CategoryContent {
  const projects = Object.values(category.data || {});
  const mainnet = projects.filter(
    (p) => (p.profile?.phase || "").toLowerCase() === "mainnet",
  );
  const active = projects.filter(
    (p) => (p.profile?.phase || "").toLowerCase() !== "inactive",
  );
  const dateModified = categoryDateModified(projects);
  return {
    cid,
    title: category.cat_title,
    description: category.cat_desc || "",
    projects,
    mainnetCount: mainnet.length,
    activeCount: active.length,
    dateModified,
    dateModifiedIso: dateModified.toISOString().slice(0, 10),
  };
}
