import site from "@/config/site";
import { ProjectRecord } from "@/lib/types";

const BASE_URL = site.url;

export type Crumb = { name: string; url: string };

const home = (): Crumb => ({ name: "Home", url: `${BASE_URL}/` });

export function projectCrumbs(project: ProjectRecord, categories?: Record<string, string>): Crumb[] {
  const tagKeys = Object.keys(project.profile?.tags || {});
  const primaryTag = tagKeys[0];
  const crumbs: Crumb[] = [home()];
  if (primaryTag) {
    const catName = categories?.[primaryTag] || project.profile.tags?.[primaryTag] || primaryTag;
    crumbs.push({ name: catName, url: `${BASE_URL}/category/${primaryTag}` });
  }
  crumbs.push({
    name: project.profile.name,
    url: `${BASE_URL}/project/${project.slug}`,
  });
  return crumbs;
}

export function categoryCrumbs(cid: string, catName: string): Crumb[] {
  return [home(), { name: catName, url: `${BASE_URL}/category/${cid}` }];
}

export function peopleCrumbs(): Crumb[] {
  return [home(), { name: "People", url: `${BASE_URL}/people` }];
}

export function awesomeNearCrumbs(): Crumb[] {
  return [home(), { name: "Awesome NEAR", url: `${BASE_URL}/awesome-near` }];
}

export function searchCrumbs(): Crumb[] {
  return [home(), { name: "Search", url: `${BASE_URL}/search` }];
}

export function mapCrumbs(): Crumb[] {
  return [home(), { name: "Ecosystem Map", url: `${BASE_URL}/map` }];
}

export function trendingCrumbs(): Crumb[] {
  return [home(), { name: "Trending", url: `${BASE_URL}/trending` }];
}
