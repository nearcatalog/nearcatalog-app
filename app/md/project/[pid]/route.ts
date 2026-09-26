import { NextResponse } from "next/server";
import { fetchProject } from "@/lib/near-catalog";
import { toProjectContent } from "@/lib/content/project";
import { renderProjectMarkdown } from "@/lib/render/markdown";
import site from "@/config/site";

export const revalidate = 3600;

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ pid: string }> },
) {
  const { pid } = await ctx.params;
  const project = await fetchProject(pid);
  if (!project || !project.profile) {
    return new NextResponse(`# Not found\n\nProject ${pid} not found.\n`, {
      status: 404,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }
  const content = toProjectContent(project);
  const body = renderProjectMarkdown(content);
  const canonical = `${site.url}/project/${project.slug}`;
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${canonical}>; rel="canonical"`,
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
    },
  });
}
