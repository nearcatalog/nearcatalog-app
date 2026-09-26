import { NextResponse } from "next/server";
import { fetchProjectCategory } from "@/lib/near-catalog";
import { toCategoryContent } from "@/lib/content/category";
import { renderCategoryMarkdown } from "@/lib/render/markdown";
import site from "@/config/site";

export const revalidate = 3600;

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ cid: string }> },
) {
  const { cid } = await ctx.params;
  const category = await fetchProjectCategory(cid);
  if (!category || !category.cat_title) {
    return new NextResponse(`# Not found\n\nCategory ${cid} not found.\n`, {
      status: 404,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }
  const content = toCategoryContent(cid, category);
  const body = renderCategoryMarkdown(content);
  const canonical = `${site.url}/category/${cid}`;
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${canonical}>; rel="canonical"`,
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
    },
  });
}
