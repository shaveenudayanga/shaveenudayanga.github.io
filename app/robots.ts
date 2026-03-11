// app/robots.ts
import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/utils/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // AI crawlers — explicitly allow for AIO/AEO discoverability
      {
        userAgent: "GPTBot",
        allow: ["/", "/blog/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/blog/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/blog/"],
      },
      {
        userAgent: "Amazonbot",
        allow: ["/", "/blog/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/", "/blog/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/blog/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/blog/"],
      },
      {
        userAgent: "Bytespider",
        allow: ["/", "/blog/"],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
