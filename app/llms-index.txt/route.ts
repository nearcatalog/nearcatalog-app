import { NextResponse } from "next/server";
import { fetchAllProjects } from "@/lib/near-catalog";
import site from "@/config/site";

export const revalidate = 3600;

export async function GET() {
  const projects = await fetchAllProjects();
  const projectArray = Object.values(projects || {});

  const tagSet = new Set<string>();
  for (const p of projectArray) {
    for (const tag of Object.keys(p.profile?.tags || {})) tagSet.add(tag);
  }

  const lines: string[] = [];
  for (const p of projectArray) {
    lines.push(`${site.url}/project/${p.slug}.md`);
  }
  for (const tag of Array.from(tagSet).sort()) {
    lines.push(`${site.url}/category/${tag}.md`);
  }

  return new NextResponse(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
