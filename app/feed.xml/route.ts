// app/feed.xml/route.ts
import { getAllPosts } from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/utils/constants";

export async function GET() {
  const posts = getAllPosts();

  const escapeXml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_CONFIG.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escapeXml(SITE_CONFIG.email)} (${escapeXml(post.author)})</author>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Shaveen Udayanga — Blog</title>
    <link>${SITE_CONFIG.url}/blog</link>
    <description>Articles on AI, machine learning, IoT, systems engineering, and software development by Shaveen Udayanga.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>${SITE_CONFIG.email} (Shaveen Udayanga)</managingEditor>
    <webMaster>${SITE_CONFIG.email} (Shaveen Udayanga)</webMaster>
    <image>
      <url>${SITE_CONFIG.url}/images/shaveen_portfolio_favicon.png</url>
      <title>Shaveen Udayanga — Blog</title>
      <link>${SITE_CONFIG.url}/blog</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
