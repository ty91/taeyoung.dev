import { getPosts } from "~/utils/post";

export const loader = async () => {
  const posts = await getPosts();
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>taeyoung.dev</title>
      <description>taeyoung.dev</description>
      <link>https://taeyoung.dev</link>
      ${posts
        .map(
          (post) =>
            `<item>
          <title>${post.title}</title>
          <link>https://taeyoung.dev/posts/${post.slug}</link>
          <guid isPermaLink="true">https://taeyoung.dev/posts/${
            post.slug
          }</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>`
        )
        .join("")}
    </channel>
  </rss>
`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
};
