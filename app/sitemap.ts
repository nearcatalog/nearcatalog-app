import { MetadataRoute } from "next";
import { ProjectRecord } from "@/lib/types";
import { fetchAllProjects } from "@/lib/near-catalog";
import site from "@/config/site";
import {
  categoryDateModified,
  projectDateModified,
  routeDateModified,
} from "@/lib/seo/date-modified";

export const revalidate = 3600;

const BASE_URL = site.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await fetchAllProjects();
  const projectArray: ProjectRecord[] = Object.values(projects);

  const tagToProjects = new Map<string, ProjectRecord[]>();
  for (const project of projectArray) {
    const tagKeys = Object.keys(project.profile?.tags || {});
    for (const tag of tagKeys) {
      const list = tagToProjects.get(tag) ?? [];
      list.push(project);
      tagToProjects.set(tag, list);
    }
  }
  const uniqueTags = Array.from(tagToProjects.keys()).sort();

  const projectRoutes = projectArray.flatMap((project) => {
    const lastModified = projectDateModified(project);
    return [
      {
        url: `${BASE_URL}/project/${project.slug}`,
        lastModified,
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/project/${project.slug}.md`,
        lastModified,
        priority: 0.4,
      },
    ];
  });

  const categoryRoutes = uniqueTags.flatMap((cid) => {
    const lastModified = categoryDateModified(tagToProjects.get(cid) ?? []);
    return [
      {
        url: `${BASE_URL}/category/${cid}`,
        lastModified,
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/category/${cid}.md`,
        lastModified,
        priority: 0.4,
      },
    ];
  });

  const staticRoutes = [
    { path: "/", file: "app/page.tsx", priority: 0.9 },
    { path: "/people", file: "app/people/page.tsx", priority: 0.6 },
    { path: "/awesome-near", file: "app/awesome-near/page.tsx", priority: 0.6 },
    { path: "/map", file: "app/map/page.tsx", priority: 0.5 },
    { path: "/search", file: "app/search/page.tsx", priority: 0.5 },
    { path: "/trending", file: "app/trending/page.tsx", priority: 0.6 },
  ].map((r) => ({
    url: `${BASE_URL}${r.path === "/" ? "/" : r.path}`,
    lastModified: routeDateModified(r.file),
    priority: r.priority,
  }));

  return [...staticRoutes, ...projectRoutes, ...categoryRoutes];
}
