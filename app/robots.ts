import { MetadataRoute } from "next";
import site from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/private/"] },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User"], allow: "/" },
      { userAgent: ["ClaudeBot", "claude-web", "anthropic-ai"], allow: "/" },
      { userAgent: ["PerplexityBot", "Perplexity-User"], allow: "/" },
      { userAgent: ["Google-Extended", "Applebot-Extended"], allow: "/" },
      { userAgent: ["Amazonbot", "Meta-ExternalAgent"], allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
