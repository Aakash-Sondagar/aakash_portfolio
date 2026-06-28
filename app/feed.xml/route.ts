import { getPublicPosts, parsePublishDate } from "@/lib/posts";
import { site } from "@/site.config";

export async function GET() {
  const posts = getPublicPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${site.url}/writing/${post.slug}</link>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${parsePublishDate(post.publishDate).toUTCString()}</pubDate>
      <guid isPermaLink="true">${site.url}/writing/${post.slug}</guid>
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name} — Writing</title>
    <link>${site.url}/writing</link>
    <description>${site.writing.description}</description>
    <language>en</language>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
