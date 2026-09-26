import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ key: string }> },
) {
  const { key } = await ctx.params;
  const expected = process.env.INDEXNOW_KEY;
  if (!expected || !key.endsWith(".txt")) {
    return new NextResponse("Not found", { status: 404 });
  }
  const bare = key.slice(0, -4);
  if (bare !== expected) {
    return new NextResponse("Not found", { status: 404 });
  }
  return new NextResponse(expected, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
