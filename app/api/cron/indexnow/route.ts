import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import site from "@/config/site";

export const dynamic = "force-dynamic";

const BATCH = 10000;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization") || "";
    if (auth !== `Bearer ${secret}`) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json(
      { ok: false, reason: "INDEXNOW_KEY not configured" },
      { status: 500 },
    );
  }

  const host = new URL(site.url).host;
  const entries = await sitemap();
  const urls = entries.map((e) => (typeof e.url === "string" ? e.url : ""));

  const results: { batch: number; status: number; count: number }[] = [];
  for (let i = 0; i < urls.length; i += BATCH) {
    const urlList = urls.slice(i, i + BATCH);
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `${site.url}/${key}.txt`,
        urlList,
      }),
    });
    results.push({ batch: i / BATCH, status: res.status, count: urlList.length });
  }

  return NextResponse.json({ ok: true, host, total: urls.length, results });
}
