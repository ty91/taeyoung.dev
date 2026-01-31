import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import siteConfig from "../../site.config";

export async function GET() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "taeyoung.dev",
    description: "taeyoung.dev",
    site: siteConfig.siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/posts/${post.data.slug}`,
    })),
  });
}
