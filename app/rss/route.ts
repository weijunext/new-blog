import { siteConfig } from "@/config/site";
import { getPosts } from "@/lib/post";

export async function GET() {
  const { posts } = await getPosts();
  const latestPosts = posts.slice(0, 20);

  const rssString = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>J实验室</title>
        <link>${siteConfig.url}</link>
        <description>${siteConfig.description}</description>
        ${latestPosts.map(post => {
    return `
              <item>
                <title>${post.title}</title>
                <link>${siteConfig.url}/article/${post.slug}</link>
                <guid isPermaLink="true">${siteConfig.url}/article/${post.slug}</guid>
                <description>${post.metadata.description}</description>
                <pubDate>${new Date(post.date).toUTCString()}</pubDate>
              </item>
            `;
  })
      .join('')}
      </channel>
    </rss>
  `;

  return new Response(rssString, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}